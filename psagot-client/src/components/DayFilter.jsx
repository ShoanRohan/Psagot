import React, { useState } from 'react';
import { Box, Button, IconButton, Typography, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';
import 'dayjs/locale/he';

const DayFilter = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const updateDate = (newDate) => {
    setSelectedDate(newDate);
    onChange({ from: newDate.toDate(), to: newDate.toDate() });
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Button variant="outlined" onClick={() => updateDate(dayjs())}>היום</Button>
      <IconButton onClick={() => updateDate(selectedDate.subtract(1, 'day'))}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography>
        {`יום ${selectedDate.locale('he').format('dddd DD [ב]MMMM')}`}
      </Typography>
      <IconButton onClick={() => updateDate(selectedDate.add(1, 'day'))}>
        <ArrowForwardIosIcon />
      </IconButton>
      <TextField
        type="date"
        value={selectedDate.format('YYYY-MM-DD')}
        onChange={(e) => updateDate(dayjs(e.target.value))}
        size="small"
      />
    </Box>
  );
};

export default DayFilter;
