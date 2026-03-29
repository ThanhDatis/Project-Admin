import CleaningServicesRoundedIcon from '@mui/icons-material/CleaningServicesRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import { Box, Card, Skeleton, Typography } from '@mui/material';

import type { RoleStats } from '../../../../types';

// import type { RoleStats } from '../../../types';

interface StatCard {
  role: keyof RoleStats;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const STAT_CARDS: StatCard[] = [
  {
    role: 'Customer',
    label: 'Total Customers',
    icon: <GroupRoundedIcon sx={{ fontSize: 28 }} />,
    iconBg: '#e0f7fa',
    iconColor: '#00acc1',
  },
  {
    role: 'HotelOwner',
    label: 'Hotel Owners',
    icon: <HotelRoundedIcon sx={{ fontSize: 28 }} />,
    iconBg: '#e8f5e9',
    iconColor: '#43a047',
  },
  {
    role: 'Receptionist',
    label: 'Receptionists',
    icon: <HeadsetMicRoundedIcon sx={{ fontSize: 28 }} />,
    iconBg: '#fff3e0',
    iconColor: '#fb8c00',
  },
  {
    role: 'Housekeeping',
    label: 'Housekeeping',
    icon: <CleaningServicesRoundedIcon sx={{ fontSize: 28 }} />,
    iconBg: '#fce4ec',
    iconColor: '#e91e63',
  },
];

interface UserStatsCardsProps {
  stats: RoleStats;
  isLoading: boolean;
}

const UserStatsCards: React.FC<UserStatsCardsProps> = ({ stats, isLoading }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 2,
        mb: 3,
      }}
    >
      {STAT_CARDS.map(({ role, label, icon, iconBg, iconColor }) => (
        <Card
          key={role}
          sx={{
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            borderRadius: 3,
            border: '1px solid #f0f0f0',
            boxShadow: 'none',
            transition: 'box-shadow 0.2s',
            '&:hover': { boxShadow: '0 2px 12px rgba(0,0,0,0.08)' },
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2.5,
              bgcolor: iconBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>

          {/* Text */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: '#999',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: '0.65rem',
              }}
            >
              {label}
            </Typography>

            {isLoading ? (
              <Skeleton width={56} height={32} />
            ) : (
              <Typography variant="h5" fontWeight={700} sx={{ color: '#1a1a1a', lineHeight: 1.2 }}>
                {stats[role].toLocaleString()}
              </Typography>
            )}
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default UserStatsCards;
