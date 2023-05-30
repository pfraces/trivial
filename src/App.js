import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './firebase/auth';
import { SnackbarProvider } from './AppLayout/snackbar/snackbar';
import { routes } from './routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SnackbarProvider>
          <RouterProvider router={createBrowserRouter(routes)} />
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
