import { TravelExploreRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import { primaryTextColor, teal } from '../../../../../shared/common/colors';

interface LogoProps {
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ onClick, size = 'medium' }) => {
  const sizes = {
    small: { icon: 24, text: 20 },
    medium: { icon: 32, text: 24 },
    large: { icon: 48, text: 32 },
  };

  const currentSize = sizes[size];

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        transition: 'transform 0.3s ease',
        '&:hover': onClick
          ? {
              opacity: 0.8,
            }
          : undefined,
      }}
    >
      <TravelExploreRounded
        sx={{
          fontSize: currentSize.icon,
          color: teal[500],
        }}
      />

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: currentSize.text,
          color: primaryTextColor,
          letterSpacing: '-0,5px',
        }}
      >
        TravelSocial
      </Typography>
    </Box>
  );
};

export default Logo;
