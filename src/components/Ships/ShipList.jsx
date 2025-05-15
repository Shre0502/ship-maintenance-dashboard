import React from 'react';
import { useShips } from '../../contexts/ShipsContext';
import { useAuth } from '../../contexts/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const ShipList = ({ onEdit }) => {
  const { ships, deleteShip } = useShips();
  const { user } = useAuth();

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Ship List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>IMO</TableCell>
            <TableCell>Flag</TableCell>
            <TableCell>Status</TableCell>
            {user.role === 'Admin' && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {ships.map((ship) => (
            <TableRow key={ship.id}>
              <TableCell>
                <Link to={`/ships/${ship.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                  {ship.name}
                </Link>
              </TableCell>
              <TableCell>{ship.imo}</TableCell>
              <TableCell>{ship.flag}</TableCell>
              <TableCell>{ship.status}</TableCell>
              {user.role === 'Admin' && (
                <TableCell>
                  <Button size="small" onClick={() => onEdit(ship)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => deleteShip(ship.id)}>Delete</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ShipList;