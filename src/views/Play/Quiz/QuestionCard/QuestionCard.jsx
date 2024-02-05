import { useState } from 'react';
import clsx from 'clsx';
import Option from './Option/Option.jsx';
import { scope } from './QuestionCard.module.css';

const statusMap = {
  pending: 0,
  feedback: 1
};

export default function QuestionCard({
  index,
  label,
  options,
  isLast,
  onRight,
  onNext,
  onDone
}) {
  const [answer, setAnswer] = useState();
  const [status, setStatus] = useState(statusMap.pending);

  return (
    <div className={`${scope} card`}>
      <div className="card-header">
        <div className="title">
          <div className="index">#{index + 1}</div>
          <div className="label">{label}</div>
        </div>
      </div>

      <div className="card-body">
        <div
          className={clsx('options', {
            feedback: status === statusMap.feedback
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
              className="button large blue"
              disabled={answer == null}
              onClick={() => {
                setStatus(statusMap.feedback);

                if (answer === options.findIndex((option) => option.right)) {
                  onRight();
                }
              }}
            >
              Select
            </button>
          )}

          {status === statusMap.feedback && !isLast && (
            <button className="button large blue" onClick={onNext}>
              Next
            </button>
          )}

          {status === statusMap.feedback && isLast && (
            <button className="button large blue" onClick={onDone}>
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
