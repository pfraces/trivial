import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from 'src/firebase/firebase';
import map from 'lodash/map';
import shuffle from 'lodash/shuffle';
import QuestionCard from './QuestionCard/QuestionCard';
import './Game.css';

function Game() {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    onValue(ref(db, 'questions'), (data) => {
      const snapshot = data.val();

      if (snapshot == null) {
        return;
      }

      setQuestions(
        shuffle(
          map(snapshot, (question) => ({
            ...question,
            options: shuffle(question.options),
          }))
        )
      );
    });
  }, []);

  const onRight = () => {
    setScore((prev) => prev + 1);
  };

  const onNext = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const onDone = () => {
    setIsDone(true);
  };

  if (!questions.length) {
    return null;
  }

  if (isDone) {
    return null;
  }

  const { id, label, options } = questions[questionIndex];

  return (
    <div className="Game">
      <div className="banner">
        <div className="page-container">
          <div className="score">Puntuación: {score}</div>
        </div>
      </div>

      <article className="page-container">
        <QuestionCard
          key={id}
          index={questionIndex}
          label={label}
          options={options}
          isLast={questionIndex === questions.length - 1}
          onRight={onRight}
          onNext={onNext}
          onDone={onDone}
        />
      </article>
    </div>
  );
}

export default Game;
