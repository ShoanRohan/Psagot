// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Typography
// } from '@mui/material';
// import '../styles/RoomTable.css'

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
//     <Box
//       sx={{
//         width: '84vw',
//         marginRight: '75px',
//         minHeight: '40px',
//         padding: 4,
//         boxSizing: 'border-box',
//         backgroundColor: '#f4f6f8', //צבע רקע אפור בהיר
//         direction: 'rtl',
//         fontFamily: 'Assistant, sans-serif',
//       }}
//     >
//       <Box
//            component={Paper} //גבול
//            sx={{
//            width: '80vw',
//            height: '73vh',
//            padding: 1,
//            boxSizing: 'border-box', //חובה
//            backgroundColor: '#fff', //רקע לבן
//            direction: 'rtl',
//            fontFamily: 'Assistant, sans-serif',
//            borderRadius: 3,
//         }}
//       >

//        <TableContainer sx={{  display: 'flex',  width: '70vw',mr: 1, height: '69vh', marginRight: '20px', marginTop: '9px',}}>
//   <Table size="small" stickyHeader sx={{
//       tableLayout: 'fixed',
//     }}>
//     <TableHead>
//       <TableRow>
//         <TableCell sx={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}></TableCell>
//         {rooms.map((room, index) => (
//           <TableCell
//             key={index}
//             align="center"
//             sx={{
//               borderBottom: '1px solid black',
//               borderRight: '1px solid #ccc',
//               backgroundColor: '#e9eef3',
//               fontWeight: 'bold',
//               color: '#333',
//               textAlign: 'center',
//               whiteSpace: 'nowrap',
//               padding: '4px',
//               fontSize: '0.75rem',
//               width: '70px',
//             }}
//           >
//             {room}
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {times.map((time, rowIndex) => (
//         <TableRow key={rowIndex} hover>
//           <TableCell
//             sx={{
//               borderBottom: '1px solid black',
//               fontWeight: 'bold',
//               textAlign: 'center',
//               color: '#555',
//               backgroundColor: time === '15:00' ? '#ecf2f9' : '#fff',
//               padding: '4px',
//               fontSize: '0.75rem',
//             }}
//           >
//             {time}
//           </TableCell>
//           {rooms.map((_, colIndex) => (
//             <TableCell
//               key={`${rowIndex}-${colIndex}`}
//               sx={{
//                 backgroundColor: time === '15:00' ? '#ecf2f9' : '#fff',
//                 borderRight: '1px solid #eee',
//                 borderBottom: '1px solid #eee',
//                 minWidth: 70,
//                 padding: '4px',
//                 height: '15px',
//               }}
//             />
//           ))}
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>
//       </Box>
//     </Box>
//   );
// }

import React from 'react';
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
import '../styles/RoomTable.css'

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
                    className={`time-cell ${
                      time === '15:00' ? 'time-cell-highlight' : ''
                    }`}
                  >
                    {time}
                  </TableCell>
                  {rooms.map((_, colIndex) => (
                    <TableCell
                      key={`${rowIndex}-${colIndex}`}
                      className={`room-cell ${
                        time === '15:00' ? 'room-cell-highlight' : 'room-cell-normal'
                      }`}
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













{/* <TableContainer  sx={{ overflowX: 'auto', width: '70vw' }}>
        <Table sx={{ minWidth: 70 }} stickyHeader>
          <TableHead>
            <TableRow sx={{ width: '1px'}}>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  width: '1px',
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
                    minWidth: 1,
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
      </TableContainer> */}
















{/* <TableContainer sx={{ overflowX: 'auto', width: 'fit-content', maxWidth: '90%' }}>
<Table stickyHeader>
  <TableHead>
    <TableRow>
      <TableCell
        sx={{
          fontWeight: 'bold',
          width: 40,
          textAlign: 'center',
          color: '#333',
        }}
      ></TableCell>
      {rooms.map((room, index) => (
        <TableCell
          key={index}
          align="center"
          sx={{
            borderBottom: '1px solid black',
            borderRight: '1px solid #ccc',
            backgroundColor: '#e9eef3',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '6px 8px',
            minWidth: 3, // צמצום הרוחב של כל עמודה
            minHeight: 3,
          }}
        >
          {room}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>

  <TableBody>
    {times.map((time, rowIndex) => (
      <TableRow key={rowIndex} hover>
        <TableCell
          sx={{
            borderBottom: '1px solid black',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#555',
            backgroundColor: time === '15:00' ? '#ecf2f9' : '#fff',
            height: 30,
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
              minWidth: 100,
              height: 30,
              padding: '4px 6px',
            }}
          />
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer> */}