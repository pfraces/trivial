import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './App.css';
import { SnackbarProvider } from './AppLayout/snackbar/snackbar';

const router = createBrowserRouter(routes);

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </div>
  );
}

export default App;
