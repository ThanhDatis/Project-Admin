import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../../../../apps/user/services';
import { useAuthStore } from '../../../../../apps/user/store';
import type { ProfileFormValues } from '../../../../../apps/user/types';
import { handleAPIError } from '../../../../../apps/user/utils';
import ToastMessage from '../../../../../shared/components/toastMessage';
import { ROUTES } from '../../../../../shared/config/constant';
import { useProfileActions } from '../../../../../shared/hooks/useProfileActions';

/**
 * useAdminProfile
 *
 * Admin-specific layer on top of useProfileActions:
 *   - Build initialValues từ store
 *   - Xử lý change password dialog state
 *   - Logout với redirect về signin
 */
export const useAdminProfile = () => {
  const actions = useProfileActions();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const openPasswordDialog = () => setIsPasswordDialogOpen(true);
  const closePasswordDialog = () => setIsPasswordDialogOpen(false);

  /**
   * Đổi mật khẩu: dùng forgot-password flow
   * Backend hiện chưa có endpoint change-password trực tiếp,
   * nên gửi email reset password đến email của user.
   */
  const handleChangePassword = async () => {
    if (!user?.email) return;
    try {
      setIsChangingPassword(true);
      const clientUrl = `${window.location.origin}/auth/reset-password`;
      const response = await authService.forgotPassword(user.email, clientUrl);

      if (!response.success) {
        throw new Error(response.message || 'Failed to send reset email');
      }

      ToastMessage('success', `Password reset email has been sent to ${user.email}`);
      closePasswordDialog();
    } catch (error) {
      ToastMessage('error', handleAPIError(error));
    } finally {
      setIsChangingPassword(false);
    }
  };

  // ─── Logout ─────────────────────────────────────────────────────────────
  const handleLogout = () => {
    logout();
    ToastMessage('success', 'Logout successful!');
    navigate(ROUTES.AUTH.SIGNIN);
  };

  // ─── Initial values cho form ─────────────────────────────────────────────
  const initialValues: ProfileFormValues = {
    fullName: user?.fullName ?? '',
    email: user?.email ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    dateOfBirth: '',
    gender: user?.gender ?? null,
    address: user?.address ?? '',
  };

  return {
    ...actions,
    initialValues,
    // Password dialog
    isPasswordDialogOpen,
    isChangingPassword,
    openPasswordDialog,
    closePasswordDialog,
    handleChangePassword,
    // Logout
    handleLogout,
  };
};
