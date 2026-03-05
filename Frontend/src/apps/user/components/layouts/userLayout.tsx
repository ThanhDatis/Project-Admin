import { Box } from '@mui/material';
import React from 'react';

import { useAuthStore } from '../../store';
import type { MainLayoutProps } from '../../types';
import { getUserInfoFromToken } from '../../utils';

import { Footer } from './Footer';
import { Header } from './Header';

const UserLayout: React.FC<MainLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  containerMaxWidth = 'xl',
}) => {
  const { tokens, user: storeUser } = useAuthStore();

  // Get user info from token if available
  const userInfo = React.useMemo(() => {
    if (!tokens?.accessToken) return null;

    try {
      const tokenInfo = getUserInfoFromToken(tokens.accessToken);
      if (!tokenInfo || !storeUser) return null;

      return {
        id: tokenInfo.userId,
        name: storeUser.fullName,
        email: tokenInfo.email,
        avatar: storeUser.avatarUrl || undefined,
        role: tokenInfo.role as 'Customer' | 'HotelOwner' | 'Staff' | 'Admin',
      };
    } catch (error) {
      console.error('Error parsing user info from token:', error);
      return null;
    }
  }, [tokens, storeUser]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      {showHeader && <Header sticky user={userInfo} />}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      {showFooter && <Footer />}
    </Box>
  );
};

export default UserLayout;