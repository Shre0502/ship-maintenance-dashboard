import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShips } from '../contexts/ShipsContext';
import { useAuth } from '../contexts/AuthContext';
import ComponentForm from '../components/Components/ComponentForm';
import ComponentList from '../components/Components/ComponentList';
import { Container, Typography } from '@mui/material';

const ShipDetailPage = () => {
  const { id } = useParams();
  const { ships } = useShips();
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);

  const ship = ships.find((s) => s.id === id);

  if (!ship) return <Typography>Ship not found</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{ship.name} - Details</Typography>

      {user.role === 'Engineer' && (
        <ComponentForm shipId={ship.id} current={editing} onReset={() => setEditing(null)} />
      )}
      
      <ComponentList shipId={ship.id} onEdit={(c) => setEditing(c)} />
    </Container>
  );
};

export default ShipDetailPage;
