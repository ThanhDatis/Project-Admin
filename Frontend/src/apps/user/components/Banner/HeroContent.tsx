import { Box, Typography } from '@mui/material';
import React from 'react';

interface HeroContentProps {
  title?: string;
  subtitle?: string;
}

const HeroContent: React.FC<HeroContentProps> = ({
  title = 'Find inspiration for\nyour next trip',
  subtitle = 'Discover, share, and book at the best destinations with the TravelSocial community.',
}) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: { xs: 3, md: 4 },
        px: 2,
      }}
    >
      {/* Main Title */}
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.25rem' },
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.2,
          letterSpacing: '-0.5px',
          mb: 1.5,
          textShadow: '0px 2px 12px rgba(0,0,0,0.3)',
          whiteSpace: 'pre-line',
        }}
      >
        {title}
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          fontSize: { xs: '0.875rem', sm: '1rem', md: '1.05rem' },
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.92)',
          lineHeight: 1.6,
          maxWidth: 560,
          mx: 'auto',
          textShadow: '0px 1px 6px rgba(0,0,0,0.25)',
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default HeroContent;
