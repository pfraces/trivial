import { clsx } from 'clsx';
import './Option.css';

function Option({ label, right, selected, onClick }) {
  return (
    <div className="Option">
      <button
        className={clsx({ right: right, selected: selected })}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default Option;
