import { Link } from 'react-router-dom';
import './ListItemLink.css';

export default function ListItemLink({ to, label }) {
  return (
    <div className="ListItemLink">
      <Link to={to}>{label}</Link>
    </div>
  );
}
