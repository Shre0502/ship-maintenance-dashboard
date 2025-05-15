import React from 'react';
import { useJobs } from '../../contexts/JobsContext';
import { useAuth } from '../../contexts/AuthContext';
import { useShips } from '../../contexts/ShipsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Paper } from '@mui/material';

const JobList = ({ onEdit }) => {
  const { jobs, deleteJob } = useJobs();
  const { user } = useAuth();
  const { ships } = useShips();
  const { components } = useComponents();

  const getShipName = (shipId) => ships.find(s => s.id === shipId)?.name || 'Unknown';
  const getComponentName = (componentId) => components.find(c => c.id === componentId)?.name || 'Unknown';

  return (
    <Paper sx={{ p: 2, bgcolor: 'background.paper', mt: 4 }}>
      <Typography variant="h6" gutterBottom>Maintenance Jobs</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Ship</TableCell>
            <TableCell>Component</TableCell>
            <TableCell>Engineer ID</TableCell>
            {user.role === 'Engineer' && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.type}</TableCell>
              <TableCell>{job.priority}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{job.scheduledDate}</TableCell>
              <TableCell>{getShipName(job.shipId)}</TableCell>
              <TableCell>{getComponentName(job.componentId)}</TableCell>
              <TableCell>{job.assignedEngineerId}</TableCell>
              {user.role === 'Engineer' && (
                <TableCell>
                  <Button size="small" onClick={() => onEdit(job)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => deleteJob(job.id)}>Delete</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default JobList;