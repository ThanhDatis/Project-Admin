import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { SignInFormValues, LoginRequest, AuthUser } from '../../../../../apps/user/types';
import ToastMessage from '../../../../../shared/components/toastMessage';
import { authService } from '../../../services';
import { useAuthStore } from '../../../store';
import { handleAPIError, getUserInfoFromToken } from '../../../utils';

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
        throw new Error(response.message || 'Đăng nhập thất bại');
      }

      const { token, refreshToken } = response.data;

      setTokens({
        accessToken: token,
        refreshToken: refreshToken,
      });

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
        role: userInfo.role as AuthUser['role'],
      };

      setUser(authUser);

      ToastMessage('success', 'Đăng nhập thành công!');

      setTimeout(() => {
        navigate('/');
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
        const googleLoginUrl = authService.getGoogleLoginUrl();
        window.location.href = googleLoginUrl;
      } else {
        ToastMessage('info', 'Facebook login đang được phát triển');
      }
    } catch (error) {
      console.error('Social login error:', error);
      ToastMessage('error', `Đăng nhập ${provider} thất bại!`);
    }
  };

  return {
    isLoading,
    handleSignIn,
    handleSocialLogin,
  };
};
