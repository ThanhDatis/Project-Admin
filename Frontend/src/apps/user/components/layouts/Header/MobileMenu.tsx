import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { cyan } from '../../../../../shared/common/colors';
import { NAV_ITEMS } from '../../../../../shared/config/constant';
import type { UserMenuInfo } from '../../../types';

import Logo from './Logo';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user?: UserMenuInfo | null;
  onPostClick?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, user, onPostClick }) => {
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
    onClose();
  };

  const handlePostClick = () => {
    if (onPostClick) {
      onPostClick();
    }
    onClose();
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '80%', sm: 320 },
          maxWidth: 400,
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Logo size="small" />
          <Button
            onClick={onClose}
            sx={{
              minWidth: 'auto',
              p: 1,
              color: 'text.secondary',
            }}
          >
            <CloseIcon />
          </Button>
        </Box>

        {/* User Info (if logged in) */}
        {user && (
          <>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'grey.50',
              }}
            >
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: cyan[500],
                }}
              >
                {!user.avatar && getInitials(user.name)}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Divider />
          </>
        )}

        {/* Navigation Items */}
        <List sx={{ flex: 1, pt: 1 }}>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(item.path)}
                selected={isActive(item.path)}
                sx={{
                  py: 1.5,
                  px: 2,
                  '&.Mui-selected': {
                    bgcolor: 'transparent',
                    borderRight: '3px solid',
                    borderColor: cyan[500],
                    '& .MuiListItemText-primary': {
                      color: cyan[600],
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '1rem',
                    fontWeight: isActive(item.path) ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Bottom Actions */}
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', gap: 1.5 }}>
          {/* Post Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handlePostClick}
            sx={{
              backgroundColor: cyan[500],
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              py: 1.5,
              mb: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: cyan[600],
              },
            }}
          >
            Create Post
          </Button>

          {/* Auth Buttons */}
          {!user && (
            <>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleNavClick('/auth/signin')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                Sign In
              </Button>
              <Button
                variant="text"
                fullWidth
                onClick={() => handleNavClick('/auth/signup')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
              >
                Create Account
              </Button>
            </>
          )}

          {user && (
            <>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleNavClick('/profile')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                My Profile
              </Button>
              <Button
                variant="text"
                fullWidth
                onClick={() => handleNavClick('/auth/signin')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  color: 'error.main',
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
