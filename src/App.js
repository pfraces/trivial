import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import AppLayout from './AppLayout/AppLayout';
import './App.css';

const router = createBrowserRouter(routes);

function App() {
  return (
    <div className="App">
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
    </div>
  );
}

export default App;
