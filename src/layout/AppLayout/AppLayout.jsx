import { Outlet } from 'react-router-dom';
import Header from '@/layout/Header/Header.jsx';
import { SnackbarContainer } from '@/layout/snackbar/snackbar.jsx';
import { DialogContainer } from '@/layout/dialog/DialogContainer/DialogContainer.jsx';
import { PromptContainer } from '@/layout/dialog/PromptContainer/PromptContainer.jsx';
import NavigationDrawer from '@/layout/navigation/NavigationDrawer/NavigationDrawer.jsx';
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
