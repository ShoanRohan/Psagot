import React, { useEffect } from 'react';
import { Paper, TableContainer, Typography, CircularProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMeetings } from '../features/meeting/meetingActions';
import CustomTable from './CustomTable';

const MeetingTable = () => {
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector((state) => state.meeting);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    }
  }, [status, dispatch]);

  const columns = [
    'שם קורס', 'נושא', 'שם מפגש', 'מספר מפגש', 'יום', 'שעת התחלה', 'שעת סיום', 
    'תאריך', 'תיאור', 'חדר', 'האם השיבוץ תקין?', 'חלק מהמערכת?', 'עריכה', 'מחיקה'
  ];

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <Box m={4}>
      <Typography variant="h5" align="center" gutterBottom>
        טבלת מפגשים
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 600, direction: 'rtl' }}>
        <CustomTable columns={columns} data={meetings} />
      </TableContainer>
    </Box>
  );
};

export default MeetingTable;