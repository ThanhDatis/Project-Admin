import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

import backgroundImage from '../../../../shared/assets/lounge-2930070_1920.jpg';
import SignInForm from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { useSignIn } from '../../pages/site/hooks/useSignIn';
import { useSignUp } from '../../pages/site/hooks/useSignUp';

const AuthLayout: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Hooks xử lý logic
  const { isLoading: isSignInLoading, handleSignIn, handleSocialLogin } = useSignIn();
  const { isLoading: isSignUpLoading, handleSignUp, handleSocialSignUp } = useSignUp();

  // Handler chuyển đổi giữa SignIn và SignUp
  const switchToSignUp = () => setIsSignIn(false);
  const switchToSignIn = () => setIsSignIn(true);

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
      {/* Background overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        }}
      />

      {/* Form container with slide animation */}
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
          {/* SignIn Form */}
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
            <SignInForm
              onSubmit={handleSignIn}
              onSwitchToSignUp={switchToSignUp}
              onSocialLogin={handleSocialLogin}
              isLoading={isSignInLoading}
            />
          </Box>

          {/* SignUp Form */}
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
              onSubmit={(values) => handleSignUp(values, switchToSignIn)}
              onSwitchToSignIn={switchToSignIn}
              onSocialSignUp={handleSocialSignUp}
              isLoading={isSignUpLoading}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
