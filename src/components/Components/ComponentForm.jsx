import React, { useEffect, useState } from 'react';
import { useComponents } from '../../contexts/ComponentsContext';
import { TextField, Button, Paper, Typography } from '@mui/material';

const ComponentForm = ({ shipId, current, onReset }) => {
  const { addComponent, updateComponent } = useComponents();
  const [component, setComponent] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: '',
    shipId
  });

  useEffect(() => {
    if (current) setComponent(current);
  }, [current]);

  const handleChange = (e) => {
    setComponent({ ...component, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (component.id) updateComponent(component);
    else addComponent({ ...component, id: Date.now().toString(), shipId });
    setComponent({ name: '', serialNumber: '', installDate: '', lastMaintenanceDate: '', shipId });
    onReset();
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{component.id ? 'Edit Component' : 'Add Component'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Component Name" value={component.name} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="serialNumber" label="Serial Number" value={component.serialNumber} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="installDate" label="Install Date" type="date" value={component.installDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField name="lastMaintenanceDate" label="Last Maintenance Date" type="date" value={component.lastMaintenanceDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <Button type="submit" variant="contained">{component.id ? 'Update' : 'Add'}</Button>
        {component.id && <Button onClick={onReset} sx={{ ml: 2 }}>Cancel</Button>}
      </form>
    </Paper>
  );
};

export default ComponentForm;
