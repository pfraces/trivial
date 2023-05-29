import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="Header">
      <div className="title">
        <h1>Trivial Puessi</h1>
      </div>

      <div className="nav">
        <Link to="/">Quiz</Link>
        <Link to="admin">Admin</Link>
      </div>
    </div>
  );
}

export default Header;
