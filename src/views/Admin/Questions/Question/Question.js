import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, set, onValue } from 'firebase/database';
import { db } from '../../../../db';
import './Question.css';

function Question() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const questionRef = ref(db, `questions/${id}`);

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
    }));
  };

  const onOptionLabelChangeHandler = (optionId) => (event) => {
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

  useEffect(() => {
    onValue(questionRef, (data) => {
      setQuestion(data.val());
    });
  }, []);

  if (!question) {
    return;
  }

  return (
    <div className="Question">
      <article className="page-container">
        <div className="card">
          <h1>Edit question</h1>

          <form>
            <input
              type="text"
              className="label"
              value={question.label}
              onChange={onQuestionLabelChange}
            />

            <div className="options">
              {question.options.map((option, index) => (
                <label key={index} className="option">
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
                    value={option.label}
                    onChange={onOptionLabelChangeHandler(index)}
                  />
                </label>
              ))}
            </div>

            <div className="actions">
              <button
                className="large blue"
                onClick={(event) => {
                  event.preventDefault();
                  set(questionRef, question);
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </article>
    </div>
  );
}

export default Question;
