// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box
// } from '@mui/material';
// import '../styles/roomTable.css'

// const times = [
//   '08:00', '09:00', '10:00', '11:00', '12:00',
//   '13:00', '14:00', '15:00', '16:00', '17:00',
//   '18:00', '19:00', '20:00', '21:00', '22:00'
// ];

// const rooms = [
//   'חדר סימולציה', 'חדר פגישות', 'חדר עבודה', 'אולם כנסים', 'חדר חדשות',
//   'מרכז מדיה', 'חדר סימולציה', 'פינת ישיבות', 'חדר סימולציה', 'אולם כניסה'
// ];

// export default function RoomTable() {
//   return (
//     <Box className="room-table-wrapper">
//       <Box component={Paper} className="room-table-paper">
//         <TableContainer className="room-table-container">
//           <Table size="small" stickyHeader className="room-table">
//             <TableHead>
//               <TableRow>
//                 <TableCell className="time-cell" />
//                 {rooms.map((room, index) => (
//                   <TableCell key={index} align="center" className="room-header">
//                     {room}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {times.map((time, rowIndex) => (
//                 <TableRow key={rowIndex} hover>
//                   <TableCell
//                     className={`time-cell ${
//                       time === '15:00' ? 'time-cell-highlight' : ''
//                     }`}
//                   >
//                     {time}
//                   </TableCell>
//                   {rooms.map((_, colIndex) => (
//                     <TableCell
//                       key={`${rowIndex}-${colIndex}`}
//                       className={`room-cell ${
//                         time === '15:00' ? 'room-cell-highlight' : 'room-cell-normal'
//                       }`}
//                     />
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import '../styles/roomTable.css';

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
  const [coursesByHourAndRoom, setCoursesByHourAndRoom] = useState({});

  // פונקציית סידור קורסים לפי שעה ולפי חדרים
  const getCoursesByDate = (courses) => {
    const organized = {};

    times.forEach(time => {
      organized[time] = rooms.map(() => null); // כל שעה עם מערך באורך החדרים
    });

    courses.forEach(course => {
      const startHour = course.StartTime?.substring(0, 5); // לדוג' '14:00'
      const roomIndex = rooms.findIndex(r => r === course.RoomName);

      if (startHour && roomIndex !== -1 && organized[startHour]) {
        organized[startHour][roomIndex] = course;
      }
    });

    return organized;
  };

  // סימולציה של קריאת קורסים מהשרת (אפשר להחליף ב-fetch אמיתי)
  useEffect(() => {
    // דוגמה לנתונים:
   

    const result = getCoursesByDate();
    setCoursesByHourAndRoom(result);
  }, []);

  return (
    <Box className="room-table-wrapper">
      <Box component={Paper} className="room-table-paper">
        <TableContainer className="room-table-container">
          <Table size="small" stickyHeader className="room-table">
            <TableHead>
              <TableRow>
                <TableCell className="time-cell" />
                {rooms.map((room, index) => (
                  <TableCell key={index} align="center" className="room-header">
                    {room}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {times.map((time, rowIndex) => (
                <TableRow key={rowIndex} hover>
                  <TableCell
                    className={`time-cell ${time === '15:00' ? 'time-cell-highlight' : ''}`}
                  >
                    {time}
                  </TableCell>
                  {rooms.map((_, colIndex) => {
                    const course = coursesByHourAndRoom[time]?.[colIndex];
                    return (
                      <TableCell
                        key={`${rowIndex}-${colIndex}`}
                        className={`room-cell ${time === '15:00' ? 'room-cell-highlight' : 'room-cell-normal'}`}
                      >
                        {course ? course.CourseName : ''}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
