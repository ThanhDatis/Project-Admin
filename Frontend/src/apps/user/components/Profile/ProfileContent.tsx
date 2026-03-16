import { Box } from '@mui/material';
import React from 'react';

interface ProfileContentProps {
  children: React.ReactNode;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        borderRadius: 3,
        border: '1px solid #e8eaea',
        p: { xs: 2.5, md: 3.5 },
      }}
    >
      {children}
    </Box>
  );
};

export default ProfileContent;
