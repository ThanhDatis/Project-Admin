import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  type SvgIconTypeMap,
} from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import React from 'react';

export type ProfileTab = 'personal' | 'wallet';

interface SidebarUser {
  name: string;
  avatar?: string;
}

interface ProfileSidebarProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  user: SidebarUser | null;
  onLogout: () => void;
}

type MuiIcon = OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string };

interface MenuItem {
  id: ProfileTab;
  label: string;
  icon: MuiIcon;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'personal',
    label: 'Personal Information',
    icon: PersonOutlinedIcon as MuiIcon,
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: AccountBalanceWalletOutlinedIcon as MuiIcon,
  },
];

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  onTabChange,
  user,
  onLogout,
}) => {
  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        borderRadius: 3,
        border: '1px solid #e8eaea',
        overflow: 'hidden',
        p: 2.5,
      }}
    >
      {/* User Info Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Avatar
          src={user?.avatar}
          sx={{
            width: 48,
            height: 48,
            bgcolor: '#e0e0e0',
            color: '#616161',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          {!user?.avatar && (user ? getInitials(user.name) : 'ND')}
        </Avatar>
        <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#1a1a1a', lineHeight: 1.3 }}>
          {user?.name || 'Guest'}
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <List disablePadding>
        {MENU_ITEMS.map(({ id, label, icon: Icon }) => {
          const isSelected = activeTab === id;
          return (
            <ListItem key={id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => onTabChange(id)}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  px: 1.5,
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 206, 181, 0.08)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 206, 181, 0.13)',
                    },
                    // Right indicator bar
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 4,
                      height: '55%',
                      bgcolor: '#00ceb5',
                      borderRadius: '4px 0 0 4px',
                    },
                  },
                  '&:not(.Mui-selected):hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isSelected ? '#00ceb5' : '#757575',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? '#00ceb5' : '#424242',
                    // transition: 'all 0.2s ease',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}

        {/* Logout Item */}
        <ListItem disablePadding sx={{ mt: 0.5 }}>
          <ListItemButton
            onClick={onLogout}
            sx={{
              borderRadius: 2,
              py: 1.2,
              px: 1.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'rgba(211, 47, 47, 0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: '#d32f2f' }}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: 400,
                color: '#d32f2f',
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default ProfileSidebar;
