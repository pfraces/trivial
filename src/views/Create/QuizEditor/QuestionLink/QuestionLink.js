import { Link } from 'react-router-dom';
import './QuestionLink.css';

export default function QuestionLink({ id, label }) {
  return (
    <div className="QuestionLink">
      <Link to={`questions/${id}`}>{label}</Link>
    </div>
  );
}
