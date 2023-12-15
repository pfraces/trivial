import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './firebase/auth';
import { SnackbarProvider } from './layout/snackbar/snackbar';
import { DialogProvider } from './layout/dialog/dialog';
import { PromptProvider } from './layout/dialog/prompt';
import { router } from './router/router';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SnackbarProvider>
          <DialogProvider>
            <PromptProvider>
              <RouterProvider router={router} />
            </PromptProvider>
          </DialogProvider>
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
}
