import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useShips } from '../../contexts/ShipsContext';
import { useJobs } from '../../contexts/JobsContext';
import { useComponents } from '../../contexts/ComponentsContext';

const KPICards = () => {
  const { ships } = useShips();
  const { jobs } = useJobs();
  const { components } = useComponents();

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
          <CardContent>
            <Typography variant="h6">Total Ships</Typography>
            <Typography variant="h4">{ships.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#388e3c', color: '#fff' }}>
          <CardContent>
            <Typography variant="h6">Total Components</Typography>
            <Typography variant="h4">{components.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundColor: '#f57c00', color: '#fff' }}>
          <CardContent>
            <Typography variant="h6">Scheduled Jobs</Typography>
            <Typography variant="h4">{jobs.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default KPICards;
