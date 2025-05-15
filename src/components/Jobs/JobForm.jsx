import React, { useState, useEffect } from 'react';
import { useJobs } from '../../contexts/JobsContext';
import { useShips } from '../../contexts/ShipsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { TextField, Button, Paper, Typography, MenuItem } from '@mui/material';
import { useNotification } from '../../contexts/NotificationContext';

const JobForm = ({ current, onReset }) => {
  const { addJob, updateJob } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();

  const [job, setJob] = useState({
    type: '',
    priority: '',
    status: '',
    scheduledDate: '',
    shipId: '',
    componentId: '',
    assignedEngineerId: ''
  });

  // Set form when editing an existing job
  useEffect(() => {
    if (current) setJob(current);
  }, [current]);

  // Clear componentId if shipId changes
  useEffect(() => {
    setJob(prev => ({ ...prev, componentId: '' }));
  }, [job.shipId]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const { addNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job.id) {
      updateJob(job);
      addNotification(`Job ${job.id} updated.`);
    } else {
      const newJob = { ...job, id: 'j' + Date.now() };
      addJob(newJob);
      addNotification('New job created.');
    }
    if (job.status === 'Completed') {
      addNotification(`Job ${job.id || 'new'} marked as completed.`);
    }
    setJob({
      type: '', priority: '', status: '', scheduledDate: '', shipId: '', componentId: '', assignedEngineerId: ''
    });
    onReset();
  };


  // Filter components based on selected ship
  const filteredComponents = components.filter(c => c.shipId === job.shipId);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{job.id ? 'Edit Job' : 'Add Job'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="type"
          label="Type"
          value={job.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="priority"
          label="Priority"
          value={job.priority}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="status"
          label="Status"
          value={job.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="scheduledDate"
          label="Scheduled Date"
          type="date"
          value={job.scheduledDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          select
          name="shipId"
          label="Select Ship"
          value={job.shipId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {ships.map(ship => (
            <MenuItem key={ship.id} value={ship.id}>
              {ship.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          name="componentId"
          label="Select Component"
          value={job.componentId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          disabled={!job.shipId}
        >
          {filteredComponents.map(c => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="assignedEngineerId"
          label="Engineer ID"
          value={job.assignedEngineerId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained">
          {job.id ? 'Update' : 'Add'}
        </Button>
        {job.id && (
          <Button onClick={onReset} sx={{ ml: 2 }}>
            Cancel
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default JobForm;
