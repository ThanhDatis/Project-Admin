import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { UserMenuInfo } from '../../../types';

interface UserMenuProps {
  user?: UserMenuInfo | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    handleClose();
    navigate(path);
  };

  // If no user, show login button
  if (!user) {
    return (
      <IconButton
        onClick={() => navigate('/auth/signin')}
        sx={{
          border: '2px solid #e0e0e0',
          padding: '6px',
        }}
      >
        <PersonIcon />
      </IconButton>
    );
  }

  // Get user initials for avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          padding: 0,
        }}
      >
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#00ceb5',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {!user.avatar && getInitials(user.name)}
        </Avatar>
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.5,
              gap: 1.5,
            },
          },
        }}
      >
        {/* User Info Header */}
        <Box sx={{ px: 2, py: 1.5, pb: 1 }}>
          <Typography variant="subtitle2" fontWeight={600} noWrap>
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider />

        {/* Menu Items */}
        <MenuItem onClick={() => handleMenuItemClick('/profile')}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2">Profile</Typography>
        </MenuItem>

        {user.role === 'Admin' && (
          <MenuItem onClick={() => handleMenuItemClick('/dashboard')}>
            <DashboardIcon fontSize="small" />
            <Typography variant="body2">Dashboard</Typography>
          </MenuItem>
        )}

        <MenuItem onClick={() => handleMenuItemClick('/settings')}>
          <SettingsIcon fontSize="small" />
          <Typography variant="body2">Settings</Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => handleMenuItemClick('/auth/signin')} sx={{ color: 'error.main' }}>
          <LogoutIcon fontSize="small" />
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
