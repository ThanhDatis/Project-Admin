import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../../../apps/user/store';
import type { UserRole } from '../../config/constant';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: string;
}

/**
 * RoleGuard - Kiểm tra role trước khi render route
 *
 * Dùng kết hợp với AuthGuard:
 * <AuthGuard>
 *   <RoleGuard allowedRoles={['SysAdmin']}>
 *     <UsersPage />
 *   </RoleGuard>
 * </AuthGuard>
 */
const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  fallback = '/dashboard',
}) => {
  const { user } = useAuthStore();

  if (!user?.role || !allowedRoles.includes(user.role as UserRole)) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;