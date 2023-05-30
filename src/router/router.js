import { createBrowserRouter } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../AppLayout/AppLayout';
import Landing from '../views/Landing/Landing';
import Signup from '../views/Signup/Signup';
import Login from '../views/Login/Login';
import Home from '../views/Home/Home';
import Profile from '../views/Profile/Profile';
import Quiz from '../views/Quiz/Quiz';
import Admin from '../views/Admin/Admin';
import Questions from '../views/Admin/Questions/Questions';
import Question from '../views/Admin/Questions/Question/Question';

const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute isAllowed={(user) => !user} />,
        children: [
          {
            index: true,
            element: <Landing />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
        ],
      },
      {
        element: <ProtectedRoute isAllowed={(user) => user} />,
        children: [
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
      {
        element: <ProtectedRoute isAllowed={() => true} />,
        children: [
          {
            path: 'quiz',
            element: <Quiz />,
          },
        ],
      },
      {
        // TODO: Only allow users with admin role
        element: (
          <ProtectedRoute isAllowed={(user) => user?.role === 'admin'} />
        ),
        children: [
          {
            path: 'admin',
            breadcrumb: 'Admin',
            element: <Admin />,
          },
          {
            path: 'admin/questions',
            breadcrumb: 'Questions',
            element: <Questions />,
          },
          {
            path: 'admin/questions/:id',
            breadcrumb: 'Edit question',
            element: <Question />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export const useBreadcrumbs = () => {
  return useReactRouterBreadcrumbs(routes, { disableDefaults: true });
};
