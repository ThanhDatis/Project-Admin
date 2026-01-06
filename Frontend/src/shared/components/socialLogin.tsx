import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';

import { borderLight, borderLine, gray, primaryTextColor } from '../common/colors';

interface SocialLoginProps {
  onSocialLogin: (provider: 'google' | 'facebook') => void;
  dividerText?: string;
}

const SocialLogin: React.FC<SocialLoginProps> = ({
  onSocialLogin,
  dividerText = 'Or sign in with',
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <Divider sx={{ flex: 1 }} />
        <Typography
          sx={{
            padding: '0 16px',
            color: gray[500],
            fontSize: '14px',
          }}
        >
          {dividerText}
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => onSocialLogin('google')}
          sx={{
            borderColor: borderLight,
            color: primaryTextColor,
            padding: '10px',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              borderColor: borderLine,
              backgroundColor: gray[100],
            },
          }}
        >
          Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={() => onSocialLogin('facebook')}
          sx={{
            borderColor: borderLight,
            color: primaryTextColor,
            padding: '10px',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              borderColor: borderLine,
              backgroundColor: gray[100],
            },
          }}
        >
          Facebook
        </Button>
      </Box>
    </>
  );
};

export default SocialLogin;
