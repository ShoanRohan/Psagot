import React, { useEffect } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Chip,
  CircularProgress,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMeetings } from '../features/meeting/meetingActions';

const MeetingTable = () => {
  const dispatch = useDispatch();
  const {meetings, status, error } = useSelector((state) => state.meeting);

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchAllMeetings());

        }
    }, [status, dispatch]);

  const columns = [
    'שם קורס',
    'שם נושא',
    'מספר מפגש',
    'מרצה',
    'יום',
    'שעת התחלה',
    'שעת סיום',
    'תאריך',
    'תיאור',
    'חדר',
    'שיבוץ תקין?',
    'חלק מהמערכת?',
    'עריכה',
    'מחיקה'
  ];



  if (status=='loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error!=null) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box m={4}>
      <Typography variant="h5" align="center" gutterBottom>
        טבלת מפגשים
      </Typography>

     
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} align="center">
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">{row.course_name}</TableCell>
                <TableCell align="center">{row.topic_name}</TableCell>
                <TableCell align="center">{row.meeting_number}</TableCell>
                <TableCell align="center">{row.lecturer}</TableCell>
                <TableCell align="center">{row.day}</TableCell>
                <TableCell align="center">{row.startTime}</TableCell>
                <TableCell align="center">{row.endTime}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.room}</TableCell>

                {/* עמודת שיבוץ תקין */}
                <TableCell align="center">
                  <Chip
                    label={row.valid_schedule ? 'פעיל' : 'שגוי'}
                    color={row.valid_schedule ? 'success' : 'error'}
                    variant="outlined"
                  />
                </TableCell>

                {/* עמודת חלק מהמערכת */}
                <TableCell align="center">
                  <Chip
                    label={row.in_system ? 'כן' : 'לא'}
                    color={row.in_system ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>

                {/* כפתור עריכה */}
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => console.log('Edit', row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>

                {/* כפתור מחיקה */}
                <TableCell align="center">
                  <IconButton color="error" onClick={() => console.log('Delete', row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MeetingTable;
