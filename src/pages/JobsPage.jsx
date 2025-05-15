import React, { useState } from 'react';
import JobForm from '../components/Jobs/JobForm';
import JobList from '../components/Jobs/JobList';
import JobCalendar from '../components/Jobs/JobCalendar';
import { useAuth } from '../contexts/AuthContext';
import { Container, Typography } from '@mui/material';

const JobsPage = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Maintenance Jobs</Typography>
      {user.role === 'Engineer' && (
        <JobForm current={editing} onReset={() => setEditing(null)} />
      )}
      <JobList onEdit={(job) => setEditing(job)} />
      <JobCalendar />
    </Container>
  );
};

export default JobsPage;