import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from '@mui/material';

const times = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

const rooms = [
  'חדר סימולציה', 'חדר פגישות', 'חדר עבודה', 'אולם כנסים', 'חדר חדשות',
  'מרכז מדיה', 'חדר סימולציה', 'פינת ישיבות', 'חדר סימולציה', 'אולם כניסה'
];

export default function RoomTable() {
  return (
    <Box
      sx={{
        width: '80vw',
        minHeight: '70vh',
        padding: 4,
        boxSizing: 'border-box',
        backgroundColor: '#f4f6f8', //צבע רקע אפור בהיר
        direction: 'rtl',
        fontFamily: 'Assistant, sans-serif',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'right' }}>
        חדרים
      </Typography>
      <Box
           component={Paper} //גבול
           sx={{
           width: '75vw',
           minHeight: '67vh',
           padding: 4,
           boxSizing: 'border-box', //חובה
           backgroundColor: '#fff', //רקע לבן
           direction: 'rtl',
           fontFamily: 'Assistant, sans-serif',
           borderRadius: 3,
        }}
      >
      <TableContainer >
        <Table sx={{ minWidth: 70 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  
                  fontWeight: 'bold',
                  width: 70,
                  textAlign: 'center',
                  color: '#333',
                }}
              ></TableCell>
              {rooms.map((room, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    borderBottom: '1px solid black', // קווים אורכיים
                    borderRight: '1px solid #ccc',  //שורה לרוחב קטגוריות
                    backgroundColor: '#e9eef3', //שורה לרוחב קטגוריות
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    minWidth: 10,
                  }}
                >
                  {room}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
  {times.map((time, rowIndex) => (
    <TableRow
      key={rowIndex}
      hover
    >
      <TableCell
        sx={{
          borderBottom: '1px solid black',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#555',
          backgroundColor: time === '15:00' ? '#ecf2f9' : '#fff'
        }}
      >
        {time}
      </TableCell>
      {rooms.map((_, colIndex) => (
        <TableCell
          key={`${rowIndex}-${colIndex}`}
          sx={{
            backgroundColor: time === '15:00' ? '#ecf2f9' : '#fff',
            borderRight: '1px solid #eee',
            borderBottom: '1px solid #eee',
            minWidth: 80,
            height: 10,
          }}
        />
      ))}
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
      </Box>
    </Box>
  );
}
