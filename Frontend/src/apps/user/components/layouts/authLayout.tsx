/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

import backgroundImage from '../../../../shared/assets/lounge-2930070_1920.jpg';
import ToastMessage from '../../../../shared/components/toastMessage';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import type { SignInFormValues, SignUpFormValues } from '../../types';

const AuthLayout: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSignIn = async (_values: SignInFormValues) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      ToastMessage('success', 'Đăng nhập thành công!');
    } catch (error) {
      ToastMessage('error', 'Đăng nhập thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (_values: SignUpFormValues) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      ToastMessage('success', 'Đăng ký thành công!');
      setTimeout(() => setIsSignIn(true), 1000);
    } catch (error) {
      ToastMessage('error', 'Đăng ký thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: 'google' | 'facebook') => {
    console.log(`Social auth with ${provider}`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          zIndex: 2,
          top: 0,
          left: 0,
          width: { xs: '100%', md: '50%' },
          height: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.7s cubic-bezier(0.6, -0.28, 0.735, 0.045)',
          transform: isMobile ? 'none' : isSignIn ? 'translateX(100%)' : 'translateX(0%)',
        }}
      >
        <Box sx={{ width: '100%', position: 'relative' }}>
          <Box
            sx={{
              opacity: isSignIn ? 1 : 0,
              visibility: isSignIn ? 'visible' : 'hidden',
              transition: 'all 0.4s ease',
              transitionDelay: isSignIn ? '0.3s' : '0s',
              position: isSignIn ? 'relative' : 'absolute',
              top: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SignIn
              onSubmit={handleSignIn}
              onSwitchToSignUp={() => setIsSignIn(false)}
              onSocialLogin={handleSocialAuth}
              isLoading={isLoading}
            />
          </Box>

          <Box
            sx={{
              opacity: !isSignIn ? 1 : 0,
              visibility: !isSignIn ? 'visible' : 'hidden',
              transition: 'all 0.4s ease',
              transitionDelay: !isSignIn ? '0.3s' : '0s',
              position: !isSignIn ? 'relative' : 'absolute',
              top: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SignUp
              onSubmit={handleSignUp}
              onSwitchToSignIn={() => setIsSignIn(true)}
              onSocialSignUp={handleSocialAuth}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
