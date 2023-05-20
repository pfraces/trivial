import Game from './views/Game/Game';
import Admin from './views/Admin/Admin';
import Questions from './views/Admin/Questions/Questions';
import Question from './views/Admin/Questions/Question/Question';

export const routes = [
  {
    path: '/',
    element: <Game />,
    breadcrumb: null,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/admin/questions',
    element: <Questions />,
  },
  {
    path: '/admin/questions/:id',
    element: <Question />,
    breadcrumb: 'Edit question',
  },
];
