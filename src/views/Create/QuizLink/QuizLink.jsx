import { Link } from 'react-router-dom';
import './QuizLink.css';

export default function QuizLink({ id, label }) {
  return (
    <div className="QuizLink">
      <Link to={id}>{label}</Link>
    </div>
  );
}
