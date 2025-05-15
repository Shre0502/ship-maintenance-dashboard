import React, { useState } from 'react';
import { useJobs } from '../../contexts/JobsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Paper, Typography, Button, Stack } from '@mui/material';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const JobCalendar = () => {
  const { jobs } = useJobs();
  const { components } = useComponents();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Helper to get component name from ID
  const getComponentName = (id) => {
    return components.find((c) => c.id === id)?.name || 'Unknown Component';
  };

  const events = jobs.map(job => ({
    id: job.id,
    title: `${job.type} - ${getComponentName(job.componentId)}`,
    start: new Date(job.scheduledDate),
    end: new Date(job.scheduledDate),
    allDay: true
  }));

  const goToPreviousMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  return (
    <Paper sx={{ mt: 4, p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Scheduled Jobs Calendar</Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Button variant="contained" onClick={goToPreviousMonth}>Previous Month</Button>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {format(currentDate, 'MMMM yyyy')}
        </Typography>
        <Button variant="contained" onClick={goToNextMonth}>Next Month</Button>
      </Stack>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          views={['month']}
          date={currentDate}
          onNavigate={setCurrentDate}
          toolbar={false}
          style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }}
        />
      </div>
    </Paper>
  );
};

export default JobCalendar;
