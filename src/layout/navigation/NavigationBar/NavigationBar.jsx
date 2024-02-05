import { Link } from 'react-router-dom';
import { useAuth } from '@/firebase/auth.jsx';
import { scope } from './NavigationBar.module.css';

export default function NavigationBar() {
  const { user } = useAuth();

  return (
    <nav className={scope}>
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
