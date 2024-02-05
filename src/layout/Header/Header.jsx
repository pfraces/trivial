import { Link } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import NavigationDrawerButton from '@/layout/navigation/NavigationDrawerButton/NavigationDrawerButton';
import NavigationBar from '@/layout/navigation/NavigationBar/NavigationBar';
import SessionWidget from '@/layout/SessionWidget/SessionWidget';
import './Header.css';

export default function Header() {
  return (
    <div className="Header">
      <div className="navigation-drawer-button">
        <NavigationDrawerButton />
      </div>

      <div className="title">
        <Link to="/">
          <h1>
            <QuizIcon className="logo" />
            quiz.io
          </h1>
        </Link>
      </div>

      <div className="navigation-bar">
        <NavigationBar />
      </div>

      <div className="widgets">
        <SessionWidget />
      </div>
    </div>
  );
}
