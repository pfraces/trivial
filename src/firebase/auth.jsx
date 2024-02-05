import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  updatePassword as fbUpdatePassword
} from 'firebase/auth';
import { ref, onValue, off, set } from 'firebase/database';
import { db, auth } from './firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = ({ email, password }) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = ({ username, email, password }) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => {
        return updateProfile(user, { displayName: username })
          .then(() => sendEmailVerification(user))
          .then(() => {
            return set(ref(db, `/users/${user.uid}`), {
              username,
              email
            });
          });
      }
    );
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const sendPasswordResetEmail = (email) => {
    return fbSendPasswordResetEmail(auth, email);
  };

  const updatePassword = (newPassword) => {
    return fbUpdatePassword(auth.currentUser, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (!userAuth || !userAuth.emailVerified) {
        setCurrentUser((user) => {
          if (user) {
            off(ref(db, `/users/${user.uid}`));
          }

          return null;
        });

        setLoading(false);
        return;
      }

      onValue(ref(db, `/users/${userAuth.uid}`), (snapshot) => {
        const user = { ...userAuth, ...snapshot.val() };
        setCurrentUser(user);
        setLoading(false);
      });
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        loading,
        login,
        signup,
        logout,
        sendPasswordResetEmail,
        resendEmailVerification: sendEmailVerification,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
