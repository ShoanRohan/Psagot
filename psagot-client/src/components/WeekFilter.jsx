import React, { useState } from 'react';
import { Box, Button, IconButton, Typography, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';
import 'dayjs/locale/he';

const WeekFilter = ({ onChange }) => {
  const getStartOfWeek = (d) => d.startOf('week').add(1, 'day'); // Sunday
  const getEndOfWeek = (d) => d.startOf('week').add(6, 'day');   // Friday

  const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(dayjs()));

  const updateRange = (start) => {
    const end = getEndOfWeek(start);
    setStartOfWeek(start);
    onChange({ from: start.toDate(), to: end.toDate() });
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Button variant="outlined" onClick={() => updateRange(getStartOfWeek(dayjs()))}>שבוע נוכחי</Button>
      <IconButton onClick={() => updateRange(startOfWeek.subtract(1, 'week'))}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography>
        {`שבוע של ${startOfWeek.locale('he').format('DD [ב]MMMM')}`}
      </Typography>
      <IconButton onClick={() => updateRange(startOfWeek.add(1, 'week'))}>
        <ArrowForwardIosIcon />
      </IconButton>
      <TextField
        type="date"
        value={startOfWeek.format('YYYY-MM-DD')}
        onChange={(e) => updateRange(getStartOfWeek(dayjs(e.target.value)))}
        size="small"
      />
    </Box>
  );
};

export default WeekFilter;
