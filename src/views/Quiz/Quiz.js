import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { map, shuffle, take } from 'lodash';
import { db } from 'src/firebase/firebase';
import { useDialog } from 'src/AppLayout/dialog/dialog';
import QuestionCard from './QuestionCard/QuestionCard';
import './Quiz.css';

function Quiz() {
  const navigate = useNavigate();
  const dialog = useDialog();
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  // TODO: Configurable quiz length
  const QUIZ_LENGTH = 10;

  const init = () => {
    setScore(0);
    setQuestions([]);
    setQuestionIndex(0);

    get(ref(db, 'questions')).then((snapshot) => {
      const data = snapshot.val();

      if (data == null) {
        return;
      }

      const questionsShuffled = shuffle(data);
      const questionsSubset = take(questionsShuffled, QUIZ_LENGTH);

      const questionsWithOptionsShuffled = map(questionsSubset, (question) => ({
        ...question,
        options: shuffle(question.options),
      }));

      setQuestions(questionsWithOptionsShuffled);
    });
  };

  useEffect(init, []);

  const onRight = () => {
    setScore((prev) => prev + 1);
  };

  const onNext = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const onDone = () => {
    dialog({
      severity: 'success',
      title: '¡Enhorabuena!',
      message: `Has obtenido ${score} puntos`,
      actions: [
        { type: 'cancel', label: 'Salir' },
        { type: 'confirm', label: 'Volver a jugar' },
      ],
    })
      .then(() => {
        init();
      })
      .catch(() => {
        navigate('/');
      });
  };

  if (!questions.length) {
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
