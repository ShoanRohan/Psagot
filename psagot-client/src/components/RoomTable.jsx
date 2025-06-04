import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../styles/RoomTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from '../features/room/roomActions';
import { fetchMeetingsByRange } from '../features/meeting/meetingActions';
import { lightenColor } from '../styles/MeetingsTableStyle';

const generateTimes = (startHour, endHour) => {
  const times = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const from = `${String(hour).padStart(2, '0')}:00`;
    const to = `${String(hour + 1).padStart(2, '0')}:00`;
    times.push(`${from}-${to}`);
  }
  return times;
};
const times = generateTimes(8, 23);

export default function RoomTable({ date }) {
  const dispatch = useDispatch();
  const { rooms, status: roomsStatus, error: roomsError } = useSelector(state => state.room);
  const { status: rangeStatus, error: meetingsError } = useSelector(state => state.meeting);
  const meetings = useSelector(state => state.meeting.rangedMeetings);
  const isLoading = roomsStatus === 'loading' || rangeStatus === 'loading';


 useEffect(() => {
  const selectedDate = date || new Date().toISOString().slice(0, 10); 

  const loadData = async () => {
    try {
      await dispatch(fetchAllRooms());
      await dispatch(fetchMeetingsByRange({ startDate: selectedDate, endDate: selectedDate }));
    } catch (err) {
      console.error('Error loading data:', err);
    } 
  };

  loadData();
}, [dispatch, date]); 

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (roomsStatus === 'failed') return <Box>שגיאה בטעינת חדרים: {roomsError}</Box>;
  if (rangeStatus === 'failed') return <Box>שגיאה בטעינת מפגשים: {meetingsError}</Box>;

  const occupiedCells = {};

  const getRowSpan = (start, end) => {
    const startHour = parseInt(start.slice(11, 13), 10);
    const endHour = parseInt(end.slice(11, 13), 10);
    const diff = endHour - startHour;
    return diff > 0 ? diff : 1;
  };
 
  const isNoMeetings = meetings.length === 0;

  return (
    <>
      {isNoMeetings && (
        <Box className="no-meetings-alert" role="alert"> אין מפגשים ביום זה</Box>
      )}

    <Paper className="room-table-paper">
      <TableContainer className="room-table-container">
        <Table size="small" stickyHeader className="room-table">
          <TableHead>
            <TableRow>
              <TableCell className="time-cell" />
              {rooms.map((room) => (
                <TableCell key={room.roomId} align="center" className="room-header">
                  {room.name ?? room}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            
            {times.map((time, rowIndex) => (
              <TableRow key={rowIndex} hover className={time === '15:00-16:00' ? 'highlight-row' : ''} >
               <TableCell className={`time-cell ${time.startsWith('15') ? 'time-cell-highlight' : ''}`}>
                  {time}
                </TableCell>

                {rooms.map((room, colIndex) => {
                  const cellKey = `${rowIndex}-${colIndex}`;
                  if (occupiedCells[cellKey]) return null;

                  const meeting = meetings.find((m) => {
                    if (m.extendedProps?.location !== room.name) return false;
                    const meetingStartHour = parseInt(m.start.slice(11, 13), 10);
                    const timeStartHour = parseInt(time.split('-')[0].slice(0, 2), 10);
                    return meetingStartHour === timeStartHour;
                  });

                  if (meeting) {
                    const rowSpan = getRowSpan(meeting.start, meeting.end);

                    for (let i = 1; i < rowSpan; i++) {
                      occupiedCells[`${rowIndex + i}-${colIndex}`] = true;
                    } 

                    const baseColor = meeting.extendedProps.color || '#2196F3';
                    const meetingEndTime = new Date(meeting.end);
                    const now = new Date();
                    const isPastMeeting = meetingEndTime < now;
                    const bgColor = isPastMeeting? lightenColor(baseColor,0.95) : lightenColor(baseColor,0.8);
                    const bgColorLine = isPastMeeting ? lightenColor(baseColor,0.8) : lightenColor(baseColor,0);

                    return (
                      <TableCell key={cellKey} rowSpan={rowSpan} className="room-cell meeting-cell">
                       <Box
                         className="meeting-box"
                         sx={{'--meeting-color': bgColorLine,'--meeting-bg-color': bgColor, }} >
                         <Box className="meeting-title">{meeting.title?.split(' - ')[0]}</Box>
                         <Box className="meeting-subtitle">{meeting.title?.split(' - ')[1] || ''}</Box>
                       </Box>
                      </TableCell>
                    );
                  } else {
                    return (
                     <TableCell key={cellKey} 
                     className={`room-cell ${time.startsWith('15') ? 'room-cell-highlight' : 'room-cell-normal'} ${colIndex === 0 ? 'no-right-border' : ''}`}
                     />
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
     </>
  
  );
}
