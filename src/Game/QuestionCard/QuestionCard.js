import { useState } from 'react';
import { clsx } from 'clsx';
import Option from './Option/Option';
import './QuestionCard.css';

const statusMap = {
  pending: 0,
  feedback: 1,
};

function QuestionCard({ label, options, isLast, onNext, onDone }) {
  const [answer, setAnswer] = useState();
  const [status, setStatus] = useState(statusMap.pending);

  return (
    <div className="QuestionCard">
      <div className="question">
        <p>{label}</p>
      </div>

      <div
        className={clsx('options', { feedback: status === statusMap.feedback })}
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
            disabled={answer == null}
            onClick={() => {
              setStatus(statusMap.feedback);
            }}
          >
            Send
          </button>
        )}

        {status === statusMap.feedback && !isLast && (
          <button onClick={onNext}>Next</button>
        )}

        {status === statusMap.feedback && isLast && (
          <button onClick={onDone}>Done</button>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
