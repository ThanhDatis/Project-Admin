import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '../../../apps/user/store';
import { ROUTES } from '../../config/constant';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Chặn user chưa đăng nhập
 * Lưu lại `from` để sau khi login có thể redirect về trang cũ
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.SIGNIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
