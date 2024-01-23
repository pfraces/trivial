import { Outlet } from 'react-router-dom';
import Header from 'src/layout/Header/Header';
import { SnackbarContainer } from 'src/layout/snackbar/snackbar';
import { DialogContainer } from 'src/layout/dialog/DialogContainer/DialogContainer';
import { PromptContainer } from 'src/layout/dialog/PromptContainer/PromptContainer';
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
