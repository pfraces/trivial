import { Link } from 'react-router-dom';
import { scope } from './ListItemLink.module.css';

export default function ListItemLink({ to, label }) {
  return (
    <div className={scope}>
      <Link to={to}>{label}</Link>
    </div>
  );
}
