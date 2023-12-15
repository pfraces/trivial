import { Link } from 'react-router-dom';
import NavigationDrawerButton from 'src/layout/navigation/NavigationDrawerButton/NavigationDrawerButton';
import NavigationBar from 'src/layout/navigation/NavigationBar/NavigationBar';
import SessionWidget from 'src/layout/SessionWidget/SessionWidget';
import './Header.css';

export default function Header() {
  return (
    <div className="Header">
      <div className="navigation-drawer-button">
        <NavigationDrawerButton />
      </div>

      <div className="title">
        <Link to="home">
          <h1>quiz.io</h1>
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
