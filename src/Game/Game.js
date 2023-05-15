import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../db';
import QuestionCard from './QuestionCard/QuestionCard';

function Game({ onRight }) {
  const [questions, setQuestions] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    onValue(ref(db, 'questions'), (data) => {
      const snapshot = data.val();
      setQuestions(snapshot);
    });
  }, []);

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
    </div>
  );
}

export default Game;
