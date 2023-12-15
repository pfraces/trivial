import { Outlet } from 'react-router-dom';
import { SnackbarContainer } from '../snackbar/snackbar';
import { DialogContainer } from 'src/layout/dialog/dialog';
import { PromptContainer } from 'src/layout/dialog/prompt';
import Header from 'src/layout/Header/Header';
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
