import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../db';
import QuestionLink from './QuestionLink/QuestionLink';
import './Questions.css';

function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'questions'), (data) => {
      setQuestions(data.val());
    });
  }, []);

  if (!questions.length) {
    return;
  }

  return (
    <div className="Questions">
      <article className="page-container">
        <div className="card">
          <h1>Questions</h1>

          {questions.map((question, index) => {
            const id = `${index}`;
            return <QuestionLink key={id} id={id} label={question.label} />;
          })}
        </div>
      </article>
    </div>
  );
}

export default Questions;
