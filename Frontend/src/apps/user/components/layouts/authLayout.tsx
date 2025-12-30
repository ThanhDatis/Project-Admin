import { Box, Slide } from '@mui/material';
import React, { useState } from 'react';

import backgroundImage from '../../../../shared/assets/lounge-2930070_1920.jpg';
import ToastMessage from '../../../../shared/components/toastMessage';
import type { SignInFormValues, SignUpFormValues } from '../../../../shared/types';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

const AuthLayout: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Sign In
  const handleSignIn = async (values: SignInFormValues) => {
    try {
      setIsLoading(true);
      console.log('Sign In values:', values);

      // TODO: Call API here
      // await authService.signIn(values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      ToastMessage('success', 'Đăng nhập thành công!');
    } catch (error) {
      ToastMessage('error', 'Đăng nhập thất bại. Vui lòng thử lại!');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Up
  const handleSignUp = async (values: SignUpFormValues) => {
    try {
      setIsLoading(true);
      console.log('Sign Up values:', values);

      // TODO: Call API here
      // await authService.signUp(values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      ToastMessage('success', 'Đăng ký thành công! Vui lòng đăng nhập.');

      // Switch to Sign In after successful sign up
      setTimeout(() => setIsSignIn(true), 1000);
    } catch (error) {
      ToastMessage('error', 'Đăng ký thất bại. Vui lòng thử lại!');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Social Auth
  const handleSocialAuth = (provider: 'google' | 'facebook') => {
    console.log(`Social auth with ${provider}`);
    ToastMessage('info', `Đang kết nối với ${provider}...`);

    // TODO: Implement social authentication
  };

  // Switch between forms
  const switchToSignUp = () => setIsSignIn(false);
  const switchToSignIn = () => setIsSignIn(true);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Left Side - Background Image */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out',
          minHeight: '100vh',
          display: { xs: 'none', md: 'block' },
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      </Box>

      {/* Right Side - Auth Forms */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          padding: { xs: '20px', sm: '40px' },
        }}
      >
        {/* Sign In Form with Slide Animation */}
        <Slide direction="right" in={isSignIn} mountOnEnter unmountOnExit timeout={500}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <SignIn
              onSubmit={handleSignIn}
              onSwitchToSignUp={switchToSignUp}
              onSocialLogin={handleSocialAuth}
              isLoading={isLoading}
            />
          </Box>
        </Slide>

        {/* Sign Up Form with Slide Animation */}
        <Slide direction="left" in={!isSignIn} mountOnEnter unmountOnExit timeout={500}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <SignUp
              onSubmit={handleSignUp}
              onSwitchToSignIn={switchToSignIn}
              onSocialSignUp={handleSocialAuth}
              isLoading={isLoading}
            />
          </Box>
        </Slide>
      </Box>
    </Box>
  );
};

export default AuthLayout;
