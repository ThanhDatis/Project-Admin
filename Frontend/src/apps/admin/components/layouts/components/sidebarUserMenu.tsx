import { Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { Avatar, Box, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { brand } from '../../../../../shared/common/colors';
import { ToastMessage } from '../../../../../shared/components/toastMessage';
import { ROUTES } from '../../../../../shared/config/constant';

import { useAuthStore } from '../../../../user/store';

import ConditionalTooltip from './conditionalTooltip';

interface SidebarUserMenuProps {
  open: boolean;
}

const ROLE_LABELS: Record<string, string> = {
  SysAdmin: 'System Admin',
  HotelOwner: 'Hotel Owner',
  Customer: 'Customer',
  Receptionist: 'Receptionist',
  Housekeeping: 'Housekeeping',
};

export const SidebarUserMenu: React.FC<SidebarUserMenuProps> = ({ open }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [anchorEL, setAnchorEl] = useState<null | HTMLElement>(null);

  const displayName = user?.fullName || user?.userName || 'User';
  const displayEmail = user?.email || '';
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const roleLabel = user?.role ? (ROLE_LABELS[user.role] ?? user.role) : '';

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate(ROUTES.PROFILE);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    ToastMessage('success', 'Logout successfully!');
    navigate(ROUTES.AUTH.SIGNIN);
  };

  const userMenuContent = (
    <Box
      onClick={handleOpen}
      sx={[
        {
          p: 2,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 0.3s',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        },
        open
          ? {
              justifyContent: 'flex-start',
              gap: 2,
            }
          : {
              justifyContent: 'center',
            },
      ]}
    >
      <Avatar
        src={user?.avatarUrl ?? undefined}
        sx={{
          width: 32,
          height: 32,
          bgcolor: brand[500],
        }}
      >
        {!user?.avatarUrl && avatarLetter}
      </Avatar>
      {open && (
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="body2"
            // noWrap
            sx={{
              fontWeight: 600,
              color: '#333',
              opacity: open ? 1 : 0,
            }}
          >
            {displayName}
          </Typography>
          <Typography
            variant="caption"
            // noWrap
            sx={{
              color: '#666',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              opacity: open ? 1 : 0,
            }}
          >
            {displayEmail}
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <ConditionalTooltip
        show={!open}
        title={`${displayName} (${roleLabel})`}
        placement="right"
        arrow
      >
        {userMenuContent}
      </ConditionalTooltip>

      <Menu
        anchorEl={anchorEL}
        open={Boolean(anchorEL)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        slotProps={{
          paper: {
            sx: {
              width: 220,
              mt: -1,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
          <Typography variant="body2" noWrap sx={{ fontWeight: 600, color: '#1a1a1a' }}>
            {displayName}
          </Typography>
          <Typography variant="caption" noWrap sx={{ color: '#888', display: 'block' }}>
            {displayEmail}
          </Typography>
        </Box>
        <MenuItem onClick={handleProfile} sx={{ mt: 1 }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
