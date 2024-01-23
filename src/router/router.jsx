import { useState, useEffect } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { get, onValue, ref } from 'firebase/database';
import { db } from 'src/firebase/firebase';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from 'src/layout/AppLayout/AppLayout';
import Landing from 'src/views/Landing/Landing';
import Signup from 'src/views/Signup/Signup';
import Login from 'src/views/Login/Login';
import Home from 'src/views/Home/Home';
import Profile from 'src/views/Profile/Profile';
import Play from 'src/views/Play/Play';
import Quiz from 'src/views/Play/Quiz/Quiz';
import Create from 'src/views/Create/Create';
import QuizEditor from 'src/views/Create/QuizEditor/QuizEditor';
import Question from 'src/views/Create/QuizEditor/Question/Question';
import ResetPassword from 'src/views/ResetPassword/ResetPassword';

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
            index: true,
            element: <Landing />
          },
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
            path: 'home',
            element: <Home />
          },
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
