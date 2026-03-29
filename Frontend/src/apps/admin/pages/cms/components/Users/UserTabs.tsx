import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import { Box, Tab, Tabs } from '@mui/material';

import type { UserTab } from '../../../../types';

interface TabConfig {
  value: UserTab;
  label: string;
  icon: React.ReactElement;
}

const TAB_CONFIG: TabConfig[] = [
  { value: 'Customer', label: 'Customers', icon: <GroupRoundedIcon fontSize="small" /> },
  { value: 'HotelOwner', label: 'Hotel Owners', icon: <HotelRoundedIcon fontSize="small" /> },
  {
    value: 'Receptionist',
    label: 'Receptionists',
    icon: <HeadsetMicRoundedIcon fontSize="small" />,
  },
  {
    value: 'Housekeeping',
    label: 'Housekeeping',
    icon: <CleaningServicesRoundedIcon fontSize="small" />,
  },
];

interface UserTabsProps {
  activeTab: UserTab;
  onChange: (event: React.SyntheticEvent, value: UserTab) => void;
}

const UserTabs: React.FC<UserTabsProps> = ({ activeTab, onChange }) => {
  return (
    <Box sx={{ borderBottom: '1px solid #f0f0f0', mb: 2.5 }}>
      <Tabs
        value={activeTab}
        onChange={onChange}
        textColor="primary"
        TabIndicatorProps={{
          style: { backgroundColor: '#00ceb5', height: 3, borderRadius: '3px 3px 0 0' },
        }}
        sx={{
          minHeight: 44,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.9rem',
            minHeight: 44,
            color: '#888',
            gap: 0.5,
            '&.Mui-selected': { color: '#00ceb5', fontWeight: 700 },
          },
        }}
      >
        {TAB_CONFIG.map(({ value, label, icon }) => (
          <Tab key={value} value={value} label={label} icon={icon} iconPosition="start" />
        ))}
      </Tabs>
    </Box>
  );
};

export default UserTabs;
