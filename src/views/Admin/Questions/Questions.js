import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from 'src/firebase/firebase';
import map from 'lodash/map';
import Breadcrumbs from 'src/AppLayout/Breadcrumbs/Breadcrumbs';
import QuestionLink from './QuestionLink/QuestionLink';
import './Questions.css';

function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'questions'), (data) => {
      const snapshot = data.val();

      if (snapshot == null) {
        return;
      }

      setQuestions(map(snapshot));
    });
  }, []);

  return (
    <div className="Questions">
      <article className="page-container">
        <div className="card">
          <div className="card-breadcrumbs">
            <Breadcrumbs />
          </div>

          <div className="card-header">
            <h1>Questions</h1>

            <Link to="new">
              <button className="button large blue">Add</button>
            </Link>
          </div>

          {questions.map((question) => {
            return (
              <QuestionLink
                key={question.id}
                id={question.id}
                label={question.label}
              />
            );
          })}
        </div>
      </article>
    </div>
  );
}

export default Questions;
