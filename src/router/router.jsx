import { useState, useEffect } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { get, onValue, ref } from 'firebase/database';
import { db } from '@/firebase/firebase';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '@/layout/AppLayout/AppLayout';
import Root from '@/views/Root/Root.jsx';
import Signup from '@/views/Signup/Signup';
import Login from '@/views/Login/Login';
import Profile from '@/views/Profile/Profile';
import Play from '@/views/Play/Play';
import Quiz from '@/views/Play/Quiz/Quiz';
import Create from '@/views/Create/Create';
import QuizEditor from '@/views/Create/QuizEditor/QuizEditor';
import Question from '@/views/Create/QuizEditor/Question/Question';
import ResetPassword from '@/views/ResetPassword/ResetPassword';

const QuizLabelBreadcrumb = ({ label, quizId }) => {
  const [quizLabel, setQuizLabel] = useState(label);

  useEffect(() => {
    const unsubscribe = onValue(ref(db, `quizzes/${quizId}`), (snapshot) => {
      const data = snapshot.val();

      if (data == null) {
        return;
      }

      setQuizLabel(data.label);
    });

    return unsubscribe;
  }, [quizId]);

  return quizLabel;
};

const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Root />
      },
      {
        path: 'play',
        children: [
          {
            index: true,
            element: <Play />
          },
          {
            path: ':quizId',
            element: <Quiz />
          }
        ]
      },
      {
        element: <ProtectedRoute isAllowed={(user) => !user} />,
        children: [
          {
            path: 'signup',
            element: <Signup />
          },
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          }
        ]
      },
      {
        element: <ProtectedRoute isAllowed={(user) => user} />,
        children: [
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'create',
            handle: { breadcrumb: 'Create' },
            children: [
              {
                index: true,
                element: <Create />
              },
              {
                path: ':quizId',
                loader: ({ params }) => {
                  return get(ref(db, `quizzes/${params.quizId}`)).then(
                    (snapshot) => snapshot.val()
                  );
                },
                handle: {
                  breadcrumb: ({ data, params }) => (
                    <QuizLabelBreadcrumb
                      label={data.label}
                      quizId={params.quizId}
                    />
                  )
                },
                children: [
                  {
                    index: true,
                    element: <QuizEditor />
                  },
                  {
                    path: 'questions/:questionId',
                    element: <Question />,
                    handle: { breadcrumb: 'Edit question' }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
