import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { map, shuffle, take } from 'lodash';
import { db } from '@/firebase/firebase.js';
import { useDialog } from '@/layout/dialog/dialog.jsx';
import QuestionCard from './QuestionCard/QuestionCard.jsx';
import './Quiz.css';

export default function Quiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dialog = useDialog();
  const [score, setScore] = useState(0);
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const QUIZ_LENGTH = 10;

  const init = () => {
    setScore(0);
    setQuestions([]);
    setQuestionIndex(0);

    get(ref(db, `quizzes/${quizId}`)).then((snapshot) => {
      const data = snapshot.val();

      if (data == null) {
        return;
      }

      const questionsShuffled = shuffle(data.questions);
      const questionsSubset = take(questionsShuffled, QUIZ_LENGTH);

      const questionsWithOptionsShuffled = map(questionsSubset, (question) => ({
        ...question,
        options: shuffle(question.options)
      }));

      setQuizName(data.label);
      setQuestions(questionsWithOptionsShuffled);
    });
  };

  useEffect(init, [quizId]);

  const onRight = () => {
    setScore((prev) => prev + 1);
  };

  const onNext = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const onDone = () => {
    dialog({
      title: 'Congratulations!',
      description: `You've earned ${score} score points`,
      actions: [
        { type: 'cancel', label: 'Exit' },
        { type: 'confirm', label: 'Play again' }
      ]
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

  const question = questions[questionIndex];

  return (
    <div className="Quiz">
      <div className="banner">
        <div className="page-container">
          <div className="label">{quizName}</div>
          <div className="score">Score: {score}</div>
        </div>
      </div>

      <article className="page-container">
        <QuestionCard
          key={question.id}
          index={questionIndex}
          label={question.label}
          options={question.options}
          isLast={questionIndex === questions.length - 1}
          onRight={onRight}
          onNext={onNext}
          onDone={onDone}
        />
      </article>
    </div>
  );
}
