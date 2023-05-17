import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../db';
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
      setQuestions(snapshot);
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
    return;
  }

  if (isDone) {
    return null;
  }

  const { label, options } = questions[questionIndex];

  return (
    <div className="Game">
      <div className="banner">
        <div className="page-container">
          <div className="score">Puntuación: {score}</div>
        </div>
      </div>

      <article className="page-container">
        <QuestionCard
          key={questionIndex}
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
