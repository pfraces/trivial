import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, push, set, remove, onValue } from 'firebase/database';
import { db } from 'src/firebase/firebase';
import { clsx } from 'clsx';
import { useForm } from 'src/form/form';
import { required } from 'src/form/rules';
import { useSnackbar } from 'src/AppLayout/snackbar/snackbar';
import { useDialog } from 'src/AppLayout/dialog/dialog';
import Breadcrumbs from 'src/AppLayout/Breadcrumbs/Breadcrumbs';
import './Question.css';

const initQuestion = () => ({
  label: '',
  options: [
    { label: '', right: false },
    { label: '', right: false },
    { label: '', right: false },
    { label: '', right: false },
  ],
  rightAnswer: '',
});

function Question() {
  const { id } = useParams();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const dialog = useDialog();

  const { form, validate } = useForm({
    label: required(),
    options: { label: required() },
    rightAnswer: required(),
  });

  const questionRef = useMemo(
    () => (id === 'new' ? null : ref(db, `questions/${id}`)),
    [id]
  );

  const [question, setQuestion] = useState(
    id === 'new' ? initQuestion() : null
  );

  const navigateBack = () => {
    navigate(-1);
  };

  const onQuestionLabelChange = (event) => {
    setQuestion((question) => ({
      ...question,
      label: event.target.value,
    }));
  };

  const onRightAnswerChange = (event) => {
    setQuestion((question) => ({
      ...question,
      options: question.options.map((option, index) => ({
        ...option,
        right: event.target.value === `${index}`,
      })),
      rightAnswer: event.target.value,
    }));
  };

  const optionLabelChangeHandler = (optionId) => (event) => {
    setQuestion((question) => ({
      ...question,
      options: question.options.map((option, index) => {
        if (optionId !== index) {
          return option;
        }

        return {
          ...option,
          label: event.target.value,
        };
      }),
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { isValid } = validate(question);

    if (!isValid) {
      snackbar({ severity: 'error', message: 'Form validation failed' });
      return;
    }

    let req;

    if (!questionRef) {
      const newQuestionRef = push(ref(db, 'questions'));
      req = set(newQuestionRef, { ...question, id: newQuestionRef.key });
    } else {
      req = set(questionRef, question);
    }

    req
      .then(() => {
        snackbar({ message: 'Question saved' });
        navigateBack();
      })
      .catch((err) => {
        snackbar({ severity: 'error', message: err.message });
      });
  };

  const onCancel = () => {
    navigateBack();
  };

  const onDelete = () => {
    dialog({
      severity: 'error',
      title: 'Delete question?',
      message: 'Data will be lost',
    })
      .then(() => remove(questionRef))
      .then(() => {
        snackbar({ message: 'Question deleted' });
        navigateBack();
      })
      .catch((err) => {
        snackbar({ severity: 'error', message: err.message });
      });
  };

  useEffect(() => {
    if (!questionRef) {
      return;
    }

    onValue(questionRef, (data) => {
      setQuestion(data.val());
    });
  }, [questionRef]);

  if (!question) {
    // TODO: Show loader
    return null;
  }

  return (
    <div className="Question">
      <article className="page-container">
        <div className="card">
          <div className="card-breadcrumbs">
            <Breadcrumbs />
          </div>

          <form
            noValidate
            className={clsx('form', { error: form && !form.isValid })}
            onSubmit={onSubmit}
          >
            <div className="field">
              <input
                type="text"
                className="label"
                placeholder="Title"
                value={question.label}
                onChange={onQuestionLabelChange}
              />

              {form?.errors.label.required && (
                <p role="alert">Question title is required</p>
              )}
            </div>

            <div className="options field">
              {question.options.map((option, index) => (
                <div key={index} className="field">
                  <div className="option">
                    <input
                      type="radio"
                      name="right-answer"
                      value={index}
                      checked={option.right}
                      onChange={onRightAnswerChange}
                    />

                    <input
                      type="text"
                      className="option-label"
                      placeholder={`Option ${index + 1}`}
                      value={option.label}
                      onChange={optionLabelChangeHandler(index)}
                    />
                  </div>

                  {form?.errors.options[index].label.required && (
                    <p role="alert">Option label is required</p>
                  )}
                </div>
              ))}

              {form?.errors.rightAnswer.required && (
                <p role="alert">Right answer is required</p>
              )}
            </div>

            <div className="actions">
              <button type="submit" className="button large blue">
                Save
              </button>

              <button type="button" className="button large" onClick={onCancel}>
                Cancel
              </button>

              {questionRef && (
                <button
                  type="button"
                  className="button large red"
                  onClick={onDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </article>
    </div>
  );
}

export default Question;
