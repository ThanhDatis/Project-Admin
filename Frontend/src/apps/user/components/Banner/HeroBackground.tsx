import { Box } from '@mui/material';
import React from 'react';

interface HeroBackgroundProps {
  imageUrl?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

const DEFAULT_BG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80';

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageUrl = DEFAULT_BG,
  overlayOpacity = 0.25,
  children,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 'inherit',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay for text readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          zIndex: 1,
        }}
      />

      {/* Content sits above overlay */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default HeroBackground;
