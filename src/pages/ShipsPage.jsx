import React, { useState } from 'react';
import ShipList from '../components/Ships/ShipList';
import ShipForm from '../components/Ships/ShipForm';
import { useAuth } from '../contexts/AuthContext';
import { Container, Typography } from '@mui/material';

const ShipsPage = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Ships</Typography>
      {user.role === 'Admin' && (
        <ShipForm current={editing} onReset={() => setEditing(null)} />
      )}
      <ShipList onEdit={(ship) => setEditing(ship)} />
    </Container>
  );
};

export default ShipsPage;