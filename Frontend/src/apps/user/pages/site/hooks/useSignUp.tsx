import { useState } from 'react';

import type { SignUpFormValues, RegisterCustomerRequest } from '../../../../../apps/user/types';
import ToastMessage from '../../../../../shared/components/toastMessage';
import { authService } from '../../../services';
import { handleAPIError } from '../../../utils';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (values: SignUpFormValues, onSuccess?: () => void) => {
    try {
      setIsLoading(true);

      const payload: RegisterCustomerRequest = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      };

      const response = await authService.register(payload);

      if (!response.success) {
        throw new Error(response.message || 'Đăng ký thất bại');
      }

      ToastMessage('success', 'Đăng ký thành công! Vui lòng đăng nhập.');

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      ToastMessage('error', errorMessage);

      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: 'google' | 'facebook') => {
    try {
      if (provider === 'google') {
        const googleLoginUrl = authService.getGoogleLoginUrl();
        window.location.href = googleLoginUrl;
      } else {
        ToastMessage('info', 'Facebook sign up đang được phát triển');
      }
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
