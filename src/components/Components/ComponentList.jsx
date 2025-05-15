import React from 'react';
import { useComponents } from '../../contexts/ComponentsContext';
import { useAuth } from '../../contexts/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Paper } from '@mui/material';

const ComponentList = ({ shipId, onEdit }) => {
  const { getComponentsByShip, deleteComponent } = useComponents();
  const { user } = useAuth();
  const components = getComponentsByShip(shipId);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Ship Components</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>Install Date</TableCell>
            <TableCell>Last Maintained</TableCell>
            {user.role === 'Engineer' && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {components.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.serialNumber}</TableCell>
              <TableCell>{c.installDate}</TableCell>
              <TableCell>{c.lastMaintenanceDate}</TableCell>
              {user.role === 'Engineer' && (
                <TableCell>
                  <Button size="small" onClick={() => onEdit(c)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => deleteComponent(c.id)}>Delete</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ComponentList;