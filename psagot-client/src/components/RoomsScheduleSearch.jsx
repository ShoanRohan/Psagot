import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { setDisplayDate } from '../features/room/roomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomScheduleByDate } from '../features/room/roomActions';
import dayjs from 'dayjs';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const RoomsScheduleSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const currentDisplayDate = useSelector((state) => state.room.displayDate);
  const { roomSchedule, status, error } = useSelector((state) => state.room);

  React.useEffect(() => {
    dispatch(setDisplayDate(dayjs().format('YYYY-MM-DD'))); // אתחול התאריך להיום
  }, [dispatch]);

  const handleDateChange = (action, newDate = null) => {
    let updatedDate;

    if (newDate) {
      updatedDate = dayjs(newDate).format('YYYY-MM-DD'); // שינוי ידני ע"י המשתמש
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


  return (
    <Box
      sx={{
        mt: 3,
        mb: 1,
        // mr:1,
        // ml:7,
        width: '50%',
        maxWidth:300,
        
      }}
    >
      <AppBar
        position="static"
        color="white"
        sx={{
          boxShadow: 2,
          borderRadius: 2,
          height: '6vh' ,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
          <Toolbar
           sx={{
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingX: 1,
            minHeight: '100%',
          }}
        >
           <Button
            onClick={() => handleDateChange('today')}
            sx={{color: 'black', fontSize: '0.8rem', minWidth: 60 }}
          >
            היום
          </Button>
          <IconButton onClick={() => handleDateChange('prev')} color="black" sx={{ padding: '4px' }}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(currentDisplayDate)}
              onChange={(newValue) => handleDateChange(null, newValue)}
              format="DD/MM/YYYY"
              sx={{
                '& .MuiInputBase-root': { padding: '2px', fontSize: '0.8rem', minWidth: '120px' },
                '& input': { padding: 0 },
              }}
            />
          </LocalizationProvider>

          <IconButton onClick={() => handleDateChange('next')} color="black" sx={{ padding: '4px' }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default RoomsScheduleSearch;