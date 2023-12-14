import { Outlet } from 'react-router-dom';
import { SnackbarContainer } from './snackbar/snackbar';
import { DialogContainer } from './dialog/dialog';
import { PromptContainer } from './dialog/prompt';
import Header from './Header/Header';
import './AppLayout.css';

export default function AppLayout() {
  return (
    <div className="AppLayout">
      <Header />
      <Outlet />
      <SnackbarContainer />
      <DialogContainer />
      <PromptContainer />
    </div>
  );
}
