import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { ref, onValue, off, set } from 'firebase/database';
import { db, auth } from './firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = ({ username, email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => {
        return sendEmailVerification(user)
          .then(() => updateProfile(user, { displayName: username }))
          .then(() => {
            return set(ref(db, `/users/${user.uid}`), {
              username,
              email,
              role: 'user',
            });
          });
      }
    );
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (!userAuth) {
        setUser((user) => {
          if (user) {
            off(ref(db, `/users/${user.uid}`));
          }

          return null;
        });

        return;
      }

      onValue(ref(db, `/users/${userAuth.uid}`), (snapshot) => {
        setUser({ ...userAuth, ...snapshot.val() });
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
