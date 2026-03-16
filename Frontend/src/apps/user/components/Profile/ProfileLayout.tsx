import { Box, Container } from '@mui/material';
import React from 'react';

interface ProfileLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ sidebar, content }) => {
  return (
    <Box
      sx={{
        bgcolor: '#f0f4f4',
        minHeight: 'calc(100vh - 70px)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '290px 1fr' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          {sidebar}
          {content}
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileLayout;
