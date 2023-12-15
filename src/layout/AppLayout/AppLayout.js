import { Outlet } from 'react-router-dom';
import Header from 'src/layout/Header/Header';
import { SnackbarContainer } from '../snackbar/snackbar';
import { DialogContainer } from 'src/layout/dialog/dialog';
import { PromptContainer } from 'src/layout/dialog/prompt';
import NavigationDrawer from 'src/layout/navigation/NavigationDrawer/NavigationDrawer';
import './AppLayout.css';

export default function AppLayout() {
  return (
    <div className="AppLayout">
      <Header />
      <Outlet />
      <SnackbarContainer />
      <DialogContainer />
      <PromptContainer />
      <NavigationDrawer />
    </div>
  );
}
