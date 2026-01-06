import { useState } from 'react';

import ToastMessage from '../../../../../shared/components/toastMessage';
import type { SignUpFormValues } from '../../../types';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (values: SignUpFormValues, onSuccess?: () => void) => {
    try {
      setIsLoading(true);
      // TODO: Call API sign up
      console.log('Sign up with:', values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      ToastMessage('success', 'Đăng ký thành công!');

      // Chuyển sang form đăng nhập sau khi đăng ký thành công
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } catch (error) {
      console.error('Sign up error:', error);
      ToastMessage('error', 'Đăng ký thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: 'google' | 'facebook') => {
    try {
      // TODO: Implement social sign up API
      console.log(`Social sign up with ${provider}`);
      // Example: window.location.href = `/api/auth/${provider}`;
    } catch (error) {
      console.error('Social sign up error:', error);
      ToastMessage('error', `Đăng ký ${provider} thất bại!`);
    }
  };

  return {
    isLoading,
    handleSignUp,
    handleSocialSignUp,
  };
};
