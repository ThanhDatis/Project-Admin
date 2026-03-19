// Frontend/src/apps/user/components/SignIn/OAuthCallback.tsx
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { useOAuthCallback } from '../../pages/site/hooks/useSignIn';

const OAuthCallback: React.FC = () => {
  const { processOAuthCallback } = useOAuthCallback();
  // useRef để đảm bảo chỉ gọi 1 lần dù StrictMode render 2 lần
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;
    processOAuthCallback();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
        bgcolor: '#ffffff',
      }}
    >
      <CircularProgress size={44} sx={{ color: '#00ceb5' }} />
      <Typography variant="h6" color="text.secondary" fontWeight={500}>
        Đang xử lý đăng nhập Google...
      </Typography>
    </Box>
  );
};

export default OAuthCallback;
