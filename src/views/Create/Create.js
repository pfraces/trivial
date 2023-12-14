import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, push, set } from 'firebase/database';
import { map } from 'lodash';
import { db } from 'src/firebase/firebase';
import { useAuth } from 'src/firebase/auth';
import { useSnackbar } from 'src/AppLayout/snackbar/snackbar';
import { usePrompt } from 'src/AppLayout/dialog/prompt';
import QuizLink from './QuizLink/QuizLink';
import './Create.css';

export default function Create() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const snackbar = useSnackbar();
  const prompt = usePrompt();

  const [quizzes, setQuizzes] = useState([]);

  const onNewQuiz = () => {
    prompt({
      title: 'Create quiz',
      inputLabel: 'Quiz name',
    })
      .then((quizLabel) => {
        const quizRef = push(ref(db, 'quizzes'));
        const quiz = { id: quizRef.key, label: quizLabel };

        Promise.all([
          set(ref(db, `users/${user.uid}/quizzes/${quiz.id}`), quiz),
          set(quizRef, quiz),
        ]).then(() => {
          snackbar({ message: 'Quiz created' });
          navigate(quiz.id);
        });
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
            <QuizLink key={quiz.id} id={quiz.id} label={quiz.label} />
          ))}
        </div>
      </article>
    </div>
  );
}
