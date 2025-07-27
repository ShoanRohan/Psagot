import React, { useEffect } from 'react';
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
  const { status: rangeStatus, error: meetingsError, meetingsByRange: meetings } = useSelector(state => state.meeting);
  const isLoading = roomsStatus === 'loading' || rangeStatus === 'loading';

  useEffect(() => {
    const selectedDate = date || new Date().toISOString().slice(0, 10);
    if (roomsStatus === 'idle') {
      dispatch(fetchAllRooms());
    }
    dispatch(fetchMeetingsByRange({ startDate: selectedDate, endDate: selectedDate }));
  }, [dispatch, date, roomsStatus]);

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

  const isNoMeetings = !meetings || meetings.length === 0;

  return (
    <>
      {isNoMeetings && (
        <Box className="no-meetings-alert" role="alert">אין מפגשים ביום זה</Box>
      )}

      <Paper className="room-table-paper">
        <TableContainer className="room-table-container">
          <Table size="small" stickyHeader className="room-table">
            <TableHead>
              <TableRow>
                <TableCell className="time-cell" />
                {rooms && rooms.map((room) => (
                  <TableCell key={room.roomId} align="center" className="room-header">
                    {room.name ?? room}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {times.map((time, rowIndex) => (
                <TableRow key={rowIndex} hover className={time === '15:00-16:00' ? 'highlight-row' : ''}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    sx={{
                      borderRight: '2px solid #E2E8F0',
                      color: '#8A8A8A',
                      fontWeight: 400,
                      fontSize: '12px',
                    }}
                  >
                    {time}
                  </TableCell>
                  {rooms.map((room) => {
                    const cellKey = `${room.roomId}-${rowIndex}`;
                    if (occupiedCells[cellKey]) return null;

                    if (isNoMeetings) {
                      return <TableCell key={cellKey} />;
                    }

                    const meeting = meetings.find(m => 
                      m.roomId === room.roomId &&
                      rowIndex >= (parseInt(m.startTime.slice(11, 13), 10) - 8) &&
                      rowIndex < (parseInt(m.endTime.slice(11, 13), 10) - 8)
                    );

                    if (meeting) {
                      const rowspan = getRowSpan(meeting.startTime, meeting.endTime);
                      for (let i = rowIndex; i < rowIndex + rowspan; i++) {
                        occupiedCells[`${room.roomId}-${i}`] = true;
                      }
                      occupiedCells[cellKey] = false; // allow current cell

                      return (
                        <TableCell
                          key={cellKey}
                          align="center"
                          rowSpan={rowspan}
                          sx={{
                            backgroundColor: lightenColor(meeting.color || '#2196f3', 0.5),
                            fontWeight: 'bold',
                            fontSize: '12px',
                            cursor: 'pointer',
                            color: '#000',
                            maxWidth: 140,
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                          }}
                          title={`${meeting.subject}\n${meeting.startTime.slice(11, 16)}-${meeting.endTime.slice(11, 16)}`}
                        >
                          {meeting.subject}
                        </TableCell>
                      );
                    } else {
                      return <TableCell key={cellKey} />;
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
