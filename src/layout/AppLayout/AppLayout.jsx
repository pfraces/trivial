import { Outlet } from 'react-router-dom';
import Header from '@/layout/Header/Header';
import { SnackbarContainer } from '@/layout/snackbar/snackbar';
import { DialogContainer } from '@/layout/dialog/DialogContainer/DialogContainer';
import { PromptContainer } from '@/layout/dialog/PromptContainer/PromptContainer';
import NavigationDrawer from '@/layout/navigation/NavigationDrawer/NavigationDrawer';
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
