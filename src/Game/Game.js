import { useState } from 'react';
import QuestionCard from './QuestionCard/QuestionCard';

const questions = [
  {
    label: '¿De qué color era el caballo blanco de santiago?',
    options: [
      { label: 'Blanco', right: true },
      { label: 'Negro' },
      { label: 'Azul' },
      { label: '42' },
    ],
  },
  {
    label: '¿Quien era el cantante de Queen?',
    options: [
      { label: 'Brayan May' },
      { label: 'John Deacon' },
      { label: 'Freddie Mercury', right: true },
      { label: 'Roger Taylor' },
    ],
  },
];

function Game({ onRight }) {
  const [isDone, setIsDone] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const { label, options } = questions[questionIndex];

  const onNext = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const onDone = () => {
    setIsDone(true);
  };

  return (
    <div className="Game">
      {!isDone && (
        <QuestionCard
          key={questionIndex}
          label={label}
          options={options}
          isLast={questionIndex === questions.length - 1}
          onRight={onRight}
          onNext={onNext}
          onDone={onDone}
        />
      )}
    </div>
  );
}

export default Game;
