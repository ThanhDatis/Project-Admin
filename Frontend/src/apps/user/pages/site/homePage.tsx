import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import UserLayout from '../../components/layouts/userLayout';

// import UserLayout from '../../components/layouts/UserLayout';

const HomePage: React.FC = () => {
  return (
    <UserLayout>
      {/* Temporary placeholder - will be replaced with actual sections */}
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.50',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h3" gutterBottom fontWeight={700}>
              Welcome to TravelSocial
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Find inspiration for your next trip
            </Typography>
            <Typography variant="body1" color="text.secondary">
              🚧 Home page sections (Hero, Featured Destinations, Reviews, etc.) will be implemented
              next
            </Typography>
          </Box>
        </Container>
      </Box>
    </UserLayout>
  );
};

export default HomePage;
