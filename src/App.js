import { BrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout/AppLayout';
import AppRouter from './AppRouter/AppRouter';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
