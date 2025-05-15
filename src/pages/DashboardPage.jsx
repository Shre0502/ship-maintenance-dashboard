import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Container, Typography } from '@mui/material';
import KPICards from '../components/Dashboard/KPICards';

const DashboardPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Welcome to the Ship Maintenance Dashboard</Typography>
      <KPICards />
      <Stack spacing={2} direction="column" sx={{ mt: 4 }}>
        <Button variant="contained" component={Link} to="/ships">Go to Ship Management</Button>
        <Button variant="contained" component={Link} to="/jobs">Go to Job Management</Button>
      </Stack>
    </Container>
  );
};

export default DashboardPage;