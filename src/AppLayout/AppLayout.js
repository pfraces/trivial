import { Outlet } from 'react-router-dom';
import { SnackbarContainer } from './snackbar/snackbar';
import { DialogContainer } from './dialog/dialog';
import Header from './Header/Header';
import './AppLayout.css';

function AppLayout() {
  return (
    <div className="AppLayout">
      <Header />
      <Outlet />
      <SnackbarContainer />
      <DialogContainer />
    </div>
  );
}

export default AppLayout;
