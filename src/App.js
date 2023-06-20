import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './firebase/auth';
import { SnackbarProvider } from './AppLayout/snackbar/snackbar';
import { DialogProvider } from './AppLayout/dialog/dialog';
import { router } from './router/router';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SnackbarProvider>
          <DialogProvider>
            <RouterProvider router={router} />
          </DialogProvider>
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
