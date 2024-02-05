import { useState, useEffect } from 'react';
import { ref, onValue, push, update } from 'firebase/database';
import { map } from 'lodash';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/firebase/auth';
import { useSnackbar } from '@/layout/snackbar/snackbar';
import { usePrompt } from '@/layout/dialog/prompt';
import ListItemLink from '@/components/ListItemLink/ListItemLink.jsx';

export default function Create() {
  const { user } = useAuth();
  const snackbar = useSnackbar();
  const prompt = usePrompt();

  const [quizzes, setQuizzes] = useState([]);

  const onNewQuiz = () => {
    prompt({
      title: 'Create quiz',
      inputLabel: 'Quiz name'
    })
      .then((quizLabel) => {
        const quizRef = push(ref(db, 'quizzes'));
        const quiz = { id: quizRef.key, label: quizLabel, owner: user.uid };

        return update(ref(db), {
          [`quizzes/${quiz.id}`]: quiz,
          [`users/${user.uid}/quizzes/${quiz.id}`]: quiz
        });
      })
      .then(() => {
        snackbar({ message: 'Quiz created' });
      })
      .catch((err) => {
        snackbar({ severity: 'error', message: err.message });
      });
  };

  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, `users/${user.uid}/quizzes`),
      (snapshot) => {
        const data = snapshot.val();

        if (data == null) {
          return;
        }

        setQuizzes(map(data));
      }
    );

    return unsubscribe;
  }, [user.uid]);

  return (
    <div className="Create">
      <article className="page-container">
        <div className="card">
          <div className="card-header">
            <h1>Create</h1>
          </div>

          <div className="card-header">
            <h2>Quizzes</h2>

            <button className="button large blue" onClick={onNewQuiz}>
              New Quiz
            </button>
          </div>

          {!quizzes.length && <em>No quizzes found</em>}

          {map(quizzes, (quiz) => (
            <ListItemLink key={quiz.id} to={quiz.id} label={quiz.label} />
          ))}
        </div>
      </article>
    </div>
  );
}
