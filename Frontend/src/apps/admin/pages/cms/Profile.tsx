import { Box, Typography } from '@mui/material';

function Profile() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body2" color="text.secondary">
        System configuration and preferences
      </Typography>
    </Box>
  );
}

export default Profile;
