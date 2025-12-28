import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { gray, orange, primaryTextColor } from '../../../../../shared/common/colors';

import ConditionalTooltip from './conditionalTooltip';

interface MenuItem {
  text: string;
  icon: React.ReactElement;
  path: string;
}

interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onNavigate: (path: string) => void;
  open: boolean;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  isActive,
  onNavigate,
  open,
}) => {
  const menuButton = (
    <ListItemButton
      onClick={() => onNavigate(item.path)}
      sx={[
        {
          minHeight: 48,
          px: 2.5,
          backgroundColor: isActive ? gray[200] : 'transparent',
          borderRadius: 2,
          // mx: 1,
          mb: 0.5,
          position: 'relative',
          overflow: 'hidden',

          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

          '&:hover': {
            backgroundColor: isActive ? gray[100] : gray[50],
            transform: open ? 'translateX(4px)' : 'translateX(2px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',

            '& .MuiListItemIcon-root': {
              transform: 'scale(1.1) rotate(5deg)',
              color: isActive ? orange[600] : orange[400],
            },

            '& .MuiListItemText-primary': {
              transform: open ? 'translateX(2px)' : 'none',
              fontWeight: 500,
            },

            '&::before': {
              transform: 'scaleY(1)',
            },
          },

          '& .MuiListItemIcon-root': {
            color: isActive ? orange[600] : orange[400],
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            minWidth: 50,
          },

          '& .MuiListItemText-primary': {
            color: isActive ? primaryTextColor : gray[600],
            fontWeight: isActive ? 600 : 400,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
        open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
      ]}
    >
      <ListItemIcon
        sx={[
          {
            minWidth: 0,
            justifyContent: 'center',
            color: isActive ? orange[700] : orange[500],
          },
          open ? { mr: 3 } : { mr: 'auto' },
        ]}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        sx={[
          {
            color: isActive ? primaryTextColor : orange[700],
            fontWeight: isActive ? 600 : 400,
          },
          open ? { opacity: 1 } : { opacity: 0 },
        ]}
      />
    </ListItemButton>
  );

  return (
    <ListItem disablePadding>
      <ConditionalTooltip show={!open} title={item.text} placement="right" arrow>
        {menuButton}
      </ConditionalTooltip>
    </ListItem>
  );
};
