import { useState } from 'react';

import ToastMessage from '../../../../../shared/components/toastMessage';
import type { SignInFormValues } from '../../../types';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (values: SignInFormValues) => {
    try {
      setIsLoading(true);
      // TODO: Call API sign in
      console.log('Sign in with:', values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      ToastMessage('success', 'Đăng nhập thành công!');
      // TODO: Navigate to home page or redirect
      // Example: navigate('/home');
    } catch (error) {
      console.error('Sign in error:', error);
      ToastMessage('error', 'Đăng nhập thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    try {
      // TODO: Implement social login API
      console.log(`Social login with ${provider}`);
      // Example: window.location.href = `/api/auth/${provider}`;
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
