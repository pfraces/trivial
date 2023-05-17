import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, set, onValue } from 'firebase/database';
import { db } from '../../../../db';
import './Question.css';

function Question() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const questionRef = ref(db, `questions/${id}`);

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
              className="label"
              value={question.label}
              onChange={(event) => {
                setQuestion((question) => ({
                  ...question,
                  label: event.target.value,
                }));
              }}
            />

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
