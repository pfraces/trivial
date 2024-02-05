import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/firebase/auth.jsx';

export default function ProtectedRoute({ isAllowed, children }) {
  const location = useLocation();
  const { user } = useAuth();

  if (!isAllowed(user)) {
    return (
      <Navigate to="/" replace state={{ redirectTo: location.pathname }} />
    );
  }

  return children ? children : <Outlet />;
}
