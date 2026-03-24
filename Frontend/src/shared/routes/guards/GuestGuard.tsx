import { Navigate } from 'react-router-dom';

import { isAdminRole } from '../../../apps/user/pages/site/hooks/useSignIn';
import { useAuthStore } from '../../../apps/user/store';
import type { UserRole } from '../../config/constant';

interface GuestGuardProps {
  children: React.ReactNode;
}

/**
 * GuestGuard - Chặn user đã đăng nhập truy cập trang signin/signup
 * Redirect về đúng trang chủ theo role
 */
const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    const role = user.role as UserRole;
    const redirectTo = isAdminRole(role) ? '/dashboard' : '/';
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;
