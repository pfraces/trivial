import { Link } from 'react-router-dom';
import './QuestionLink.css';

function QuestionLink({ id, label }) {
  return (
    <Link className="QuestionLink" to={id}>
      {label}
    </Link>
  );
}

export default QuestionLink;
