import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { SignInFormValues, LoginRequest, AuthUser } from '../../../../../apps/user/types';
import ToastMessage from '../../../../../shared/components/toastMessage';
import type { UserRole } from '../../../../../shared/config/constant';
import { authService } from '../../../services';
import { useAuthStore } from '../../../store';
import { handleAPIError, getUserInfoFromToken, tokenService } from '../../../utils';

/**
 * Phân loại role thành 2 nhóm:
 * - ADMIN_ROLES : dùng layout Admin (Sidebar + Dashboard)
 * - USER_ROLES  : dùng layout User (Header + Footer)
 */
const ADMIN_ROLES: UserRole[] = ['SysAdmin', 'HotelOwner', 'Receptionist', 'Housekeeping'];

export function isAdminRole(role: UserRole): boolean {
  return ADMIN_ROLES.includes(role);
}

function getDefaultRouteByRole(role: UserRole): string {
  switch (role) {
    case 'SysAdmin':
    case 'HotelOwner':
    case 'Receptionist':
    case 'Housekeeping':
      return '/dashboard';
    case 'Customer':
    default:
      return '/';
  }
}

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setTokens } = useAuthStore();

  const handleSignIn = async (values: SignInFormValues) => {
    try {
      setIsLoading(true);

      const payload: LoginRequest = {
        email: values.email,
        password: values.password,
      };

      const response = await authService.login(payload);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Login failed');
      }

      const { token, refreshToken } = response.data;

      setTokens({ accessToken: token, refreshToken });

      const userInfo = getUserInfoFromToken(token);
      if (!userInfo) {
        throw new Error('Invalid token received from server');
      }

      const profileResponse = await authService.getCurrentUser();
      if (!profileResponse.success || !profileResponse.data) {
        throw new Error('Failed to fetch user profile');
      }

      const authUser: AuthUser = {
        ...profileResponse.data,
        userId: userInfo.userId,
        role: userInfo.role as UserRole,
      };

      setUser(authUser);

      ToastMessage('success', 'Login successful!');

      setTimeout(() => {
        navigate(getDefaultRouteByRole(authUser.role));
      }, 500);
    } catch (error) {
      const errorMessage = handleAPIError(error);
      ToastMessage('error', errorMessage);
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    try {
      if (provider === 'google') {
        window.location.href = authService.getGoogleLoginUrl();
      } else {
        ToastMessage('info', 'Facebook login is not implemented yet!');
      }
    } catch (error) {
      console.error('Social login error:', error);
      ToastMessage('error', `Login with ${provider} failed!`);
    }
  };

  return { isLoading, handleSignIn, handleSocialLogin };
};

export const useOAuthCallback = () => {
  const navigate = useNavigate();
  const { setUser, setTokens } = useAuthStore();

  const processOAuthCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (!token || !refreshToken) {
      ToastMessage('error', 'Authentication failed: Missing tokens');
      navigate('/auth/signin', { replace: true });
      return;
    }

    window.history.replaceState({}, document.title, window.location.pathname);

    try {
      setTokens({ accessToken: token, refreshToken });
      tokenService.saveTokens({ accessToken: token, refreshToken });

      const userInfo = getUserInfoFromToken(token);
      if (!userInfo) throw new Error('Invalid token received from server');

      const profileResponse = await authService.getCurrentUser();
      if (!profileResponse.success || !profileResponse.data) {
        throw new Error('Failed to fetch user profile');
      }

      const authUser: AuthUser = {
        ...profileResponse.data,
        userId: userInfo.userId,
        role: userInfo.role as UserRole,
      };

      setUser(authUser);
      ToastMessage('success', 'Login Google successful!');
      navigate(getDefaultRouteByRole(authUser.role), { replace: true });
    } catch (error) {
      tokenService.clearTokens();
      setTokens(null);
      ToastMessage('error', 'Login failed!');
      console.error('OAuth callback processing error:', error);
      navigate('/auth/signin', { replace: true });
    }
  };

  return { processOAuthCallback };
};
