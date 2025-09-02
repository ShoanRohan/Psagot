import React, { useState } from 'react';
import { Box, Button, IconButton, MenuItem, Select, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';
import 'dayjs/locale/he';

const MonthFilter = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const updateMonth = (newDate) => {
    setSelectedDate(newDate);
    const from = newDate.startOf('month');
    const to = newDate.endOf('month');
    onChange({ from: from.toDate(), to: to.toDate() });
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Button variant="outlined" onClick={() => updateMonth(dayjs())}>החודש הנוכחי</Button>
      <IconButton onClick={() => updateMonth(selectedDate.subtract(1, 'month'))}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography>{`${selectedDate.locale('he').format('MMMM')} ${selectedDate.year()}`}</Typography>
      <IconButton onClick={() => updateMonth(selectedDate.add(1, 'month'))}>
        <ArrowForwardIosIcon />
      </IconButton>
      <Select
        size="small"
        value={selectedDate.month()}
        onChange={(e) => updateMonth(selectedDate.month(e.target.value))}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <MenuItem key={i} value={i}>{dayjs().month(i).locale('he').format('MMMM')}</MenuItem>
        ))}
      </Select>
      <Select
        size="small"
        value={selectedDate.year()}
        onChange={(e) => updateMonth(selectedDate.year(e.target.value))}
      >
        {Array.from({ length: 11 }).map((_, i) => {
          const year = dayjs().year() - 5 + i;
          return <MenuItem key={year} value={year}>{year}</MenuItem>;
        })}
      </Select>
    </Box>
  );
};

export default MonthFilter;
