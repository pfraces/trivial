import { Link } from 'react-router-dom';
import { useAuth } from 'src/firebase/auth';
import './NavigationBar.css';

export default function NavigationBar() {
  const { user } = useAuth();

  return (
    <nav className="NavigationBar">
      <Link to="play" className="link">
        Play
      </Link>

      {user && (
        <Link to="create" className="link">
          Create
        </Link>
      )}
    </nav>
  );
}
