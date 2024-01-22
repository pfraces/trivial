import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/firebase/auth';

export default function ProtectedRoute({ isAllowed, redirectTo, children }) {
  const { user } = useAuth();

  const defaultRedirectPath = user ? 'home' : '';
  const redirectPath = redirectTo || defaultRedirectPath;

  if (!isAllowed(user)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
