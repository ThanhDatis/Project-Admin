import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { cyan } from '../../../../../shared/common/colors';
import { HEADER_HEIGHT } from '../../../../../shared/config/constant';
import type { HeaderProps } from '../../../types';

import Logo from './Logo';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import UserMenu from './UserMenu';

const Header: React.FC<HeaderProps> = ({
  transparent = false,
  sticky = true,
  user = null,
  onPostClick,
  onLogoClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      navigate('/');
    }
  };

  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick();
    } else {
      // Default behavior - navigate to post page
      navigate('/post/create');
    }
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <AppBar
        position={sticky ? 'sticky' : 'static'}
        elevation={transparent ? 0 : 1}
        sx={{
          backgroundColor: transparent ? 'transparent' : '#ffffff',
          color: '#000000',
          transition: 'all 0.3s ease',
          height: HEADER_HEIGHT,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              height: HEADER_HEIGHT,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo */}
            <Logo onClick={handleLogoClick} />

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <Navigation />
              </Box>
            )}

            {/* Right Section: Post Button + User Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Post Button */}
              <Button
                variant="contained"
                onClick={handlePostClick}
                sx={{
                  backgroundColor: cyan[500],
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: cyan[600],
                    boxShadow: 'none',
                  },
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                Post
              </Button>

              {/* User Menu */}
              <UserMenu user={user} />

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuToggle}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      {isMobile && (
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          user={user}
          onPostClick={handlePostClick}
        />
      )}
    </>
  );
};

export default Header;
