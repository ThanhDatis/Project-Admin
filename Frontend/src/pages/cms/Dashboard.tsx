import { Box, Typography } from '@mui/material';

function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        System configuration and preferences
      </Typography>
    </Box>
  );
}

export default Dashboard;
