import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { SignInFormValues, LoginRequest, AuthUser } from '../../../../../apps/user/types';
import ToastMessage from '../../../../../shared/components/toastMessage';
import { authService } from '../../../services';
import { useAuthStore } from '../../../store';
import { handleAPIError, getUserInfoFromToken, tokenService } from '../../../utils';

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

      ToastMessage('success', 'Login successful!');

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
        ToastMessage('info', 'Facebook login is not implemented yet!');
      }
    } catch (error) {
      console.error('Social login error:', error);
      ToastMessage('error', `Login with ${provider} failed!`);
    }
  };

  return {
    isLoading,
    handleSignIn,
    handleSocialLogin,
  };
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
      setTokens({
        accessToken: token,
        refreshToken: refreshToken,
      });

      tokenService.saveTokens({
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

      ToastMessage('success', 'Login Google successful!');
      navigate('/', { replace: true });
    } catch (error) {
      tokenService.clearTokens();
      setTokens(null);
      // logout();
      ToastMessage('error', 'Login failed!');
      console.error('OAuth callback processing error:', error);
      navigate('/auth/signin', { replace: true });
    }
  };

  return {
    processOAuthCallback,
  };
};
