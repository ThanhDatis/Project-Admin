import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserLayout from '../../components/layouts/userLayout';
import {
  PersonalInfor,
  ProfileContent,
  ProfileLayout,
  ProfileSidebar,
  type ProfileTab,
} from '../../components/Profile';
import { useAuthStore } from '../../store';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/auth/signin');
  };

  const sidebarUser = user
    ? {
        name: user.fullName,
        avatar: user.avatarUrl ?? undefined,
      }
    : null;

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfor />;

      case 'wallet':
        return (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              Wallet
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
              Coming soon
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <UserLayout>
      <ProfileLayout
        sidebar={
          <ProfileSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            user={sidebarUser}
            onLogout={handleLogout}
          />
        }
        content={<ProfileContent>{renderContent()}</ProfileContent>}
      />
    </UserLayout>
  );
};

export default ProfilePage;
