import { Box, Button } from '@mui/material';
import type React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { NAV_ITEMS } from '../../../../../shared/config/constant';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {NAV_ITEMS.map((item) => (
        <Button
          key={item.label}
          onClick={() => handleNavClick(item.path)}
          sx={{
            color: isActive(item.path) ? '#000000' : '#757575',
            fontWeight: isActive(item.path) ? 600 : 500,
            fontSize: '1rem',
            textTransform: 'none',
            px: 2,
            py: 1,
            position: 'relative',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#000000',
            },
            '&::after': isActive(item.path)
              ? {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '2px',
                  backgroundColor: '#00ceb5',
                  borderRadius: '2px',
                }
              : undefined,
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
};

export default Navigation;
