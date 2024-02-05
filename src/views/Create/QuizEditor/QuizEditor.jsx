import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { map } from 'lodash';
import clsx from 'clsx';
import { onValue, ref, update } from 'firebase/database';
import { db } from '@/firebase/firebase.js';
import { useAuth } from '@/firebase/auth.jsx';
import { useForm } from '@/form/form.js';
import { required } from '@/form/rules.js';
import { useSnackbar } from '@/layout/snackbar/snackbar.jsx';
import { useDialog } from '@/layout/dialog/dialog.jsx';
import Breadcrumbs from '@/layout/Breadcrumbs/Breadcrumbs.jsx';
import ListItemLink from '@/components/ListItemLink/ListItemLink.jsx';
import './QuizEditor.css';

export default function QuizEditor() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const snackbar = useSnackbar();
  const dialog = useDialog();

  const { form: labelForm, validate: validateLabel } = useForm(required());
  const [quizLabel, setQuizLabel] = useState('');
  const [quiz, setQuiz] = useState(null);

  const navigateToParent = () => {
    navigate('..');
  };

  const updateQuizLabel = (label) =>
    update(ref(db), {
      [`/quizzes/${quiz.id}/label`]: label,
      [`users/${user.uid}/quizzes/${quiz.id}/label`]: label
    });

  const deleteQuiz = () =>
    update(ref(db), {
      [`/quizzes/${quiz.id}`]: null,
      [`/users/${user.uid}/quizzes/${quiz.id}`]: null
    });

  const onQuizLabelChange = (event) => {
    setQuizLabel(event.target.value);
  };

  const onRename = (event) => {
    event.preventDefault();

    if (quizLabel === quiz.label) {
      return;
    }

    const { isValid } = validateLabel(quizLabel);

    if (!isValid) {
      snackbar({ severity: 'error', message: 'Form validation failed' });
      return;
    }

    updateQuizLabel(quizLabel)
      .then(() => {
        snackbar({ message: 'Quiz name updated' });
      })
      .catch((err) => {
        snackbar({ severity: 'error', message: err.message });
      });
  };

  const onDelete = () => {
    dialog({
      severity: 'error',
      title: 'Delete quiz?',
      description: 'Data will be lost'
    })
      .then(() => deleteQuiz())
      .then(() => {
        snackbar({ message: 'Quiz deleted' });
        navigateToParent();
      })
      .catch((err) => {
        snackbar({ severity: 'error', message: err.message });
      });
  };

  useEffect(() => {
    const unsubscribe = onValue(ref(db, `quizzes/${quizId}`), (snapshot) => {
      const data = snapshot.val();

      if (data == null) {
        return;
      }

      setQuiz(data);
      setQuizLabel(data.label);
    });

    return unsubscribe;
  }, [quizId]);

  if (!quiz) {
    return null;
  }

  return (
    <div className="QuizEditor">
      <article className="page-container">
        <div className="card">
          <div className="card-breadcrumbs">
            <Breadcrumbs />
          </div>

          <div className="card-header">
            <h1>{quiz.label}</h1>

            <button
              type="button"
              className="button large red"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>

          <form noValidate className="form" onSubmit={onRename}>
            <div
              className={clsx('field', { error: labelForm?.errors.required })}
            >
              <p className="label">Quiz name</p>

              <div className="row">
                <input
                  type="text"
                  className="quiz-label"
                  placeholder="Quiz name"
                  value={quizLabel}
                  onChange={onQuizLabelChange}
                />

                <button type="submit" className="button rename">
                  Rename
                </button>
              </div>

              {labelForm?.errors.required && (
                <p role="alert" className="helper">
                  Question title is required
                </p>
              )}
            </div>
          </form>

          <div className="card-header">
            <h2>Questions</h2>

            <Link to="questions/new">
              <button type="button" className="button large blue">
                Add
              </button>
            </Link>
          </div>

          {!quiz.questions && <em>No questions found</em>}

          {map(quiz.questions, (question) => {
            return (
              <ListItemLink
                key={question.id}
                to={`questions/${question.id}`}
                label={question.label}
              />
            );
          })}
        </div>
      </article>
    </div>
  );
}
