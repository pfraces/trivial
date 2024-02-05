import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { map } from 'lodash';
import { db } from '@/firebase/firebase';
import ListItemLink from '@/components/ListItemLink/ListItemLink.jsx';

export default function Play() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, 'quizzes'), (snapshot) => {
      const data = snapshot.val();

      if (data == null) {
        return;
      }

      setQuizzes(map(data));
    });

    return unsubscribe;
  }, []);

  return (
    <div className="Play">
      <article className="page-container">
        <div className="card">
          <div className="card-header">
            <h1>Play</h1>
          </div>

          {!quizzes.length && <em>No quizzes found</em>}

          {map(quizzes, (quiz) => {
            return (
              <ListItemLink key={quiz.id} to={quiz.id} label={quiz.label} />
            );
          })}
        </div>
      </article>
    </div>
  );
}
