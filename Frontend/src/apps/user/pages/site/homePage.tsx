import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HeroSection } from '../../components/Banner';
import { DestinationSection } from '../../components/Destination';
import UserLayout from '../../components/layouts/userLayout';
import type { Destination } from '../../types';

// import UserLayout from '../../components/layouts/UserLayout';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  function handleSearch(values: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }): void {
    throw new Error('Function not implemented.');
  }

  const handleViewAllDestinations = () => {
    navigate('/explore');
  };

  const handleDestinationClick = (destination: Destination) => {
    navigate(`/explore?destination=${destination.slug}`);
  };

  return (
    <UserLayout>
      <HeroSection onSearch={handleSearch} />

      <DestinationSection
        onViewAll={handleViewAllDestinations}
        onCardClick={handleDestinationClick}
      />
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
