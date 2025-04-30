import React, { useEffect, useState } from 'react';
import { getAllMeetings } from '../utils/meetingUtil';
import { ExportIconButton } from '../pages/ExcelButton'; 
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

const MeetingTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const meetingsData = await getAllMeetings();
        setData(meetingsData);
      } catch (err) {
        setError('אירעה שגיאה בטעינת הנתונים');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
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
      
       {/* כפתור ייצוא */}
       <Box textAlign="left" mb={2}>
        <ExportIconButton
          data={data}
          fileName="meetings"
          sheetName="Meetings"
        />
      </Box>
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
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">{row.course_name}</TableCell>
                <TableCell align="center">{row.topic_name}</TableCell>
                <TableCell align="center">{row.meeting_number}</TableCell>
                <TableCell align="center">{row.lecturer}</TableCell>
                <TableCell align="center">{row.day}</TableCell>
                <TableCell align="center">{row.start_time}</TableCell>
                <TableCell align="center">{row.end_time}</TableCell>
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
