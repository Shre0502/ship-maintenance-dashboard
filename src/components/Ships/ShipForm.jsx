import React, { useState, useEffect } from 'react';
import { useShips } from '../../contexts/ShipsContext';
import { TextField, Button, Paper, Typography, MenuItem } from '@mui/material';

const ShipForm = ({ current, onReset }) => {
  const { addShip, updateShip } = useShips();
  const [ship, setShip] = useState({ name: '', imo: '', flag: '', status: 'Active' });

  useEffect(() => {
    if (current) setShip(current);
  }, [current]);

  const handleChange = (e) => {
    setShip({ ...ship, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ship.id) updateShip(ship);
    else addShip({ ...ship, id: 's' + Date.now() });
    setShip({ name: '', imo: '', flag: '', status: 'Active' });
    onReset();
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{ship.id ? 'Edit Ship' : 'Add Ship'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Ship Name" value={ship.name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="imo" label="IMO Number" value={ship.imo} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="flag" label="Flag" value={ship.flag} onChange={handleChange} fullWidth margin="normal" required />
        <TextField select name="status" label="Status" value={ship.status} onChange={handleChange} fullWidth margin="normal">
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
        </TextField>
        <Button type="submit" variant="contained">{ship.id ? 'Update' : 'Add'}</Button>
        {ship.id && <Button onClick={onReset} sx={{ ml: 2 }}>Cancel</Button>}
      </form>
    </Paper>
  );
};

export default ShipForm;