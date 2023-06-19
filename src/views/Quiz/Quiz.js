import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { map, shuffle } from 'lodash';
import { db } from 'src/firebase/firebase';
import QuestionCard from './QuestionCard/QuestionCard';
import './Quiz.css';

function Quiz() {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    get(ref(db, 'questions')).then((snapshot) => {
      const data = snapshot.val();

      if (data == null) {
        return;
      }

      setQuestions(
        shuffle(
          map(data, (question) => ({
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
    <div className="Quiz">
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

export default Quiz;
