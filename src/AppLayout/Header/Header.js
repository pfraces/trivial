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
        <Link to="/" className="link">
          Quiz
        </Link>

        <Link to="admin" className="link">
          Admin
        </Link>
      </div>

      <div className="session">
        {!user && (
          <Link to="login" className="link">
            Log in
          </Link>
        )}

        {user && (
          <button
            className="link"
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
