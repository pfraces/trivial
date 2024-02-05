import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/firebase/auth.jsx';

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
