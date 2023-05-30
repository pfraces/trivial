import { Link } from 'react-router-dom';
import { useAuth } from 'src/firebase/auth';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="Header">
      <div className="title">
        <h1>Trivial Puessi</h1>
      </div>

      <div className="nav">
        <Link to="/">Quiz</Link>
        <Link to="admin">Admin</Link>

        {!user && <Link to="login">Login</Link>}

        {user && (
          <button
            onClick={() => {
              logout();
            }}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
