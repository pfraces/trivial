import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './firebase/auth.jsx';
import { SnackbarProvider } from './layout/snackbar/snackbar.jsx';
import { DialogProvider } from './layout/dialog/dialog.jsx';
import { PromptProvider } from './layout/dialog/prompt.jsx';
import { NavigationProvider } from './layout/navigation/navigation.jsx';
import { router } from './router/router.jsx';
import { scope } from './App.module.css';

export default function App() {
  return (
    <div className={scope}>
      <AuthProvider>
        <SnackbarProvider>
          <DialogProvider>
            <PromptProvider>
              <NavigationProvider>
                <RouterProvider router={router} />
              </NavigationProvider>
            </PromptProvider>
          </DialogProvider>
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
}
