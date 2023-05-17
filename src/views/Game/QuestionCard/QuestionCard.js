import { useState } from 'react';
import { clsx } from 'clsx';
import Option from './Option/Option';
import './QuestionCard.css';

const statusMap = {
  pending: 0,
  feedback: 1,
};

function QuestionCard({
  index,
  label,
  options,
  isLast,
  onRight,
  onNext,
  onDone,
}) {
  const [answer, setAnswer] = useState();
  const [status, setStatus] = useState(statusMap.pending);

  return (
    <div className="QuestionCard card">
      <div className="title">
        <div className="index">#{index + 1}</div>
        <div className="label">{label}</div>
      </div>

      <div className="body">
        <div
          className={clsx('options', {
            feedback: status === statusMap.feedback,
          })}
        >
          {options.map((option, index) => (
            <Option
              key={index}
              label={option.label}
              right={option.right}
              selected={index === answer}
              onClick={() => {
                if (status !== statusMap.pending) {
                  return;
                }

                setAnswer(index);
              }}
            />
          ))}
        </div>

        <div className="actions">
          {status === statusMap.pending && (
            <button
              className="large blue"
              disabled={answer == null}
              onClick={() => {
                setStatus(statusMap.feedback);

                if (answer === options.findIndex((option) => option.right)) {
                  onRight();
                }
              }}
            >
              Seleccionar
            </button>
          )}

          {status === statusMap.feedback && !isLast && (
            <button className="large blue" onClick={onNext}>
              Siguiente
            </button>
          )}

          {status === statusMap.feedback && isLast && (
            <button className="large blue" onClick={onDone}>
              Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
