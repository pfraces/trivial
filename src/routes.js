import AppLayout from './AppLayout/AppLayout';
import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import Game from './views/Game/Game';
import Admin from './views/Admin/Admin';
import Questions from './views/Admin/Questions/Questions';
import Question from './views/Admin/Questions/Question/Question';

export const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Game />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/admin',
        element: <Admin />,
        breadcrumb: 'Admin',
      },
      {
        path: '/admin/questions',
        element: <Questions />,
        breadcrumb: 'Questions',
      },
      {
        path: '/admin/questions/:id',
        element: <Question />,
        breadcrumb: 'Edit question',
      },
    ],
  },
];
