import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="Header">
      <div className="title">
        <h1>Trivial Puessi</h1>
      </div>

      <div className="nav">
        <a href="/">Quiz</a>
        <a href="admin">Admin</a>
      </div>
    </div>
  );
}

export default Header;
