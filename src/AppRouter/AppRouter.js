import { Routes, Route } from 'react-router-dom';
import Game from '../views/Game/Game';
import Admin from '../views/Admin/Admin';
import Questions from '../views/Admin/Questions/Questions';
import Question from '../views/Admin/Questions/Question/Question';

export default function AppRouter() {
  return (
    <div className="AppRouter">
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/questions" element={<Questions />} />
        <Route path="/admin/questions/:id" element={<Question />} />
      </Routes>
    </div>
  );
}
