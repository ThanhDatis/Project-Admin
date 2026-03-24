import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import { Box, List } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES, type UserRole } from '../../../../../shared/config/constant';
import { useAuthStore } from '../../../../user/store';

import { SidebarMenuItem } from './sidebarMenuItem';

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
}

const MENU_BY_ROLE: Record<UserRole, MenuItem[]> = {
  SysAdmin: [
    { text: 'Dashboard', icon: <SpaceDashboardRoundedIcon />, path: ROUTES.DASHBOARD },
    { text: 'User', icon: <GroupRoundedIcon />, path: '/users' },
    { text: 'Hotel', icon: <HotelRoundedIcon />, path: '/hotels' },
    { text: 'Booking', icon: <BookOnlineRoundedIcon />, path: '/bookings' },
    { text: 'Employee', icon: <BadgeRoundedIcon />, path: '/employees' },
  ],
  HotelOwner: [
    { text: 'Dashboard', icon: <SpaceDashboardRoundedIcon />, path: ROUTES.DASHBOARD },
    { text: 'My Hotels', icon: <HotelRoundedIcon />, path: '/hotels' },
    { text: 'Room Management', icon: <BedroomParentRoundedIcon />, path: '/rooms' },
    { text: 'Booking Management', icon: <BookOnlineRoundedIcon />, path: '/bookings' },
    { text: 'Employee Management', icon: <BadgeRoundedIcon />, path: '/employees' },
  ],
  Receptionist: [
    { text: 'Dashboard', icon: <SpaceDashboardRoundedIcon />, path: ROUTES.DASHBOARD },
    { text: 'Booking Management', icon: <BookOnlineRoundedIcon />, path: '/bookings' },
    { text: 'Check-in / Out', icon: <HotelRoundedIcon />, path: '/checkin' },
  ],
  Housekeeping: [
    { text: 'Dashboard', icon: <SpaceDashboardRoundedIcon />, path: ROUTES.DASHBOARD },
    { text: 'Room Status', icon: <CleaningServicesRoundedIcon />, path: '/rooms/status' },
  ],
  // Customer không dùng AdminLayout — để trống cho an toàn
  Customer: [{ text: 'Dashboard', icon: <SpaceDashboardRoundedIcon />, path: ROUTES.DASHBOARD }],
};

const BOTTOM_MENU: MenuItem[] = [
  { text: 'Setting', icon: <SettingsRoundedIcon />, path: ROUTES.SETTING },
];

interface SidebarNavigationProps {
  open: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const role = (user?.role ?? 'SysAdmin') as UserRole;
  const menuItems = MENU_BY_ROLE[role] ?? MENU_BY_ROLE.SysAdmin;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <Box sx={{ flex: 1 }}>
        <List>
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.text}
              item={item}
              isActive={isActive(item.path)}
              onNavigate={handleNavigation}
              open={open}
            />
          ))}
        </List>
      </Box>
      <Box>
        <List>
          {BOTTOM_MENU.map((item) => (
            <SidebarMenuItem
              key={item.text}
              item={item}
              isActive={isActive(item.path)}
              onNavigate={handleNavigation}
              open={open}
            />
          ))}
        </List>
      </Box>
    </>
  );
};
