import * as React from 'react';
import { Box, Typography, Button, IconButton, Popover } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayDate } from '../features/room/roomSlice';
import { fetchRoomScheduleByDate } from '../features/room/roomActions';
import dayjs from 'dayjs';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useState } from 'react';
import 'dayjs/locale/he';

import RoomScheduleGrid from "../components/RoomsScheduleGrid"

const RoomsScheduleSearch = () => {
  const dispatch = useDispatch();
  const currentDisplayDate = useSelector((state) => state.room.displayDate);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(setDisplayDate(dayjs().format('YYYY-MM-DD')));
  }, [dispatch]);

  const handleDateChange = (action, newDate = null) => {
    let updatedDate;

    if (newDate) {
      updatedDate = dayjs(newDate).format('YYYY-MM-DD');
    } else {
      let date = dayjs(currentDisplayDate);
      if (action === 'next') {
        updatedDate = date.add(1, 'day').format('YYYY-MM-DD');
      } else if (action === 'prev') {
        updatedDate = date.subtract(1, 'day').format('YYYY-MM-DD');
      } else if (action === 'today') {
        updatedDate = dayjs().format('YYYY-MM-DD');
      }
    }

    dispatch(setDisplayDate(updatedDate));
    dispatch(fetchRoomScheduleByDate(updatedDate));
  };

  const open = Boolean(anchorEl);

  return (
    <>
    <Box
      sx={{
        mt: 3,
        mb: 1,
        mx: 'auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <IconButton
        onClick={() => handleDateChange('prev')}
        sx={{
          padding: '4px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          color: 'black',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: 'black',
          },
        }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      {/* הטקסט שמחליף את שדה התאריך עם אייקון לוח שנה */}
      <Typography
        variant="body2"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          fontSize: '0.9rem',
          cursor: 'pointer',
        
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <CalendarMonthIcon fontSize="small" />
        {`יום ${dayjs(currentDisplayDate).locale('he').format('dddd DD [ב]MMMM')}`}
      </Typography>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
          <DateCalendar
            value={dayjs(currentDisplayDate)}
            onChange={(newValue) => {
              handleDateChange(null, newValue);
              setAnchorEl(null);
            }}
          />
        </LocalizationProvider>
      </Popover>

      <IconButton
        onClick={() => handleDateChange('next')}
        sx={{
          padding: '4px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          color: 'black',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: 'black',
          },
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <Button
  onClick={() => handleDateChange('today')}
  sx={{
    minWidth: 'unset',
    width: 46,
    height: 30,
    padding: 0,
    border: '1px solid #ccc',
    borderRadius: '8px',
    color: 'black',
    fontSize: '0.75rem',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      borderColor: '#999',
    },
  }}
>
  היום
</Button>
    </Box>
     <RoomScheduleGrid/>
     </>

  );
};

export default RoomsScheduleSearch;
