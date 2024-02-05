import clsx from 'clsx';
import { scope } from './Option.module.css';

export default function Option({ label, right, selected, onClick }) {
  return (
    <div className={scope}>
      <button
        className={clsx('button', { right: right, selected: selected })}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}
