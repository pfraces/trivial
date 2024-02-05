import { useAuth } from 'src/firebase/auth.jsx';
import Landing from './Landing/Landing.jsx';
import Home from './Home/Home.jsx';

export default function Root() {
  const { loading, user } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Landing />;
  }

  return <Home />;
}
