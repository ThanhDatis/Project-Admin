import { Container, Typography } from '@mui/material';

function HomePage() {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to HotelSocial
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Connect with fellow travelers, share your experiences, and discover new destinations.
      </Typography>
    </Container>
  );
}

export default HomePage;