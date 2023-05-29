import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import './AppLayout.css';

function AppLayout() {
  return (
    <div className="AppLayout">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
