import { Box } from '@mui/material';
import React from 'react';

import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import SearchBar from './SearchBar';

interface HeroSectionProps {
  backgroundImageUrl?: string;
  title?: string;
  subtitle?: string;
  onSearch?: (values: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImageUrl,
  title,
  subtitle,
  onSearch,
}) => {
  return (
    <Box
      component="section"
      aria-label="Hero Section"
      sx={{
        width: '100%',
        minHeight: { xs: 380, sm: 420, md: 460 },
        position: 'relative',
      }}
    >
      <HeroBackground imageUrl={backgroundImageUrl} overlayOpacity={0.3}>
        {/* Centered content container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: { xs: 380, sm: 420, md: 460 },
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 5, md: 6 },
          }}
        >
          {/* Title + Subtitle */}
          <HeroContent title={title} subtitle={subtitle} />

          {/* Search Bar */}
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 780 },
              px: { xs: 0, sm: 2, md: 0 },
            }}
          >
            <SearchBar onSearch={onSearch} />
          </Box>
        </Box>
      </HeroBackground>
    </Box>
  );
};

export default HeroSection;
