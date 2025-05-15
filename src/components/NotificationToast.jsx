import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { Snackbar, Alert } from '@mui/material';

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <>
      {notifications.map(({ id, message }) => (
        <Snackbar
          key={id}
          open
          autoHideDuration={6000}
          onClose={() => removeNotification(id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="info" onClose={() => removeNotification(id)} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default NotificationToast;
