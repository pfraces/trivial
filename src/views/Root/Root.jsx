import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/firebase/auth.jsx';
import Landing from './Landing/Landing.jsx';
import Home from './Home/Home.jsx';

export default function Root() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (state?.redirectTo && user) {
      navigate(state.redirectTo);
    }
  }, [navigate, state?.redirectTo, user]);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Landing />;
  }

  return <Home />;
}
