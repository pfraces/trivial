import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/firebase/auth';

export default function ProtectedRoute({
  isAllowed,
  redirectTo = '',
  children
}) {
  const { user } = useAuth();

  if (!isAllowed(user)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
}
