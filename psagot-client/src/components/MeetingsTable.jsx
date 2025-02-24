// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAllMeetings } from "../features/meeting/meetingActions";
// import { flexRender, useReactTable, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
// import { Button, Chip, IconButton, Snackbar, Alert, CircularProgress, Paper } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// const mockMeetings = [
//   {
//     id: 1,
//     course: "React Basics",
//     subject: "Introduction",
//     meetingNumber: 1,
//     lecturer: "John Doe",
//     day: "Sunday",
//     date: "2025-03-01",
//     startTime: "10:00",
//     endTime: "12:00",
//     room: "Room 101",
//     valid: true,
//     inSystem: true,
//   },
//   {
//     id: 2,
//     course: "Node.js Advanced",
//     subject: "API Development",
//     meetingNumber: 2,
//     lecturer: "Jane Smith",
//     day: "Monday",
//     date: "2025-03-02",
//     startTime: "14:00",
//     endTime: "16:00",
//     room: "Room 202",
//     valid: false,
//     inSystem: true,
//   },
// ];

// export default function MeetingsTable() {
//   const dispatch = useDispatch();
//   const { meetings, loading, error } = useSelector((state) => state.meeting);
//   const [view, setView] = useState("table");
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   useEffect(() => {
//     dispatch(fetchAllMeetings());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     setSnackbar({ open: true, message: "מחיקת מפגש נכשלה", severity: "error" });
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   const displayedMeetings = meetings.length > 0 ? meetings : mockMeetings;

//   const columns = [
//     { accessorKey: "course", header: "שם קורס" },
//     { accessorKey: "subject", header: "נושא" },
//     { accessorKey: "meetingNumber", header: "מספר מפגש" },
//     { accessorKey: "lecturer", header: "מרצה" },
//     { accessorKey: "day", header: "יום" },
//     { accessorKey: "date", header: "תאריך" },
//     { accessorKey: "startTime", header: "שעת התחלה" },
//     { accessorKey: "endTime", header: "שעת סיום" },
//     { accessorKey: "room", header: "תיאור חדר" },
//     {
//       accessorKey: "valid",
//       header: "שיבוץ תקין?",
//       cell: ({ getValue }) => <Chip label={getValue() ? "כן" : "לא"} color={getValue() ? "success" : "default"} />,
//     },
//     {
//       accessorKey: "inSystem",
//       header: "חלק מהמערכת?",
//       cell: ({ getValue }) => <Chip label={getValue() ? "כן" : "לא"} color={getValue() ? "success" : "default"} />,
//     },
//     {
//       accessorKey: "actions",
//       header: "פעולות",
//       cell: ({ row }) => (
//         <>
//           <IconButton color="primary"><Edit /></IconButton>
//           <IconButton color="secondary" onClick={() => handleDelete(row.original.id)}><Delete /></IconButton>
//         </>
//       ),
//     },
//   ];

//   const table = useReactTable({
//     columns,
//     data: displayedMeetings,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//   });

//   return (
//     <div>
//       <Button variant="contained" onClick={() => setView(view === "table" ? "calendar" : "table")} sx={{ mb: 2 }}>
//         {view === "table" ? "הצג לוח שנה" : "הצג טבלה"}
//       </Button>
//       {view === "table" ? (
//         <Paper>
//           <table>
//             <thead>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody>
//               {table.getRowModel().rows.map((row) => (
//                 <tr key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Paper>
//       ) : (
//         <FullCalendar
//           plugins={[dayGridPlugin]}
//           initialView="dayGridMonth"
//           events={displayedMeetings.map((m) => ({ title: `${m.course} - ${m.lecturer}`, start: m.date }))}
//           locale="he"
//         />
//       )}
//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
//       </Snackbar>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMeetings } from "../features/meeting/meetingActions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  TablePagination,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const mockMeetings = [
  {
    id: 1,
    course: "React Basics",
    subject: "Introduction",
    meetingNumber: 1,
    lecturer: "John Doe",
    day: "Sunday",
    date: "2025-03-01",
    startTime: "10:00",
    endTime: "12:00",
    room: "Room 101",
    valid: true,
    inSystem: true,
  },
  {
    id: 2,
    course: "Node.js Advanced",
    subject: "API Development",
    meetingNumber: 2,
    lecturer: "Jane Smith",
    day: "Monday",
    date: "2025-03-02",
    startTime: "14:00",
    endTime: "16:00",
    room: "Room 202",
    valid: false,
    inSystem: true,
  },
];

export default function MeetingsTable() {
  const dispatch = useDispatch();
  const { meetings, loading, error } = useSelector((state) => state.meeting);
  const [view, setView] = useState("table");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchAllMeetings());
  }, [dispatch]);

  const handleDelete = (id) => {
    setSnackbar({ open: true, message: "מחיקת מפגש נכשלה", severity: "error" });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const displayedMeetings = meetings.length > 0 ? meetings : mockMeetings;

  return (
    <div>
      <Button variant="contained" onClick={() => setView(view === "table" ? "calendar" : "table")} sx={{ mb: 2 }}>
        {view === "table" ? "הצג לוח שנה" : "הצג טבלה"}
      </Button>
      {view === "table" ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>שם קורס</TableCell>
                <TableCell>נושא</TableCell>
                <TableCell>מספר מפגש</TableCell>
                <TableCell>מרצה</TableCell>
                <TableCell>יום</TableCell>
                <TableCell>תאריך</TableCell>
                <TableCell>שעת התחלה</TableCell>
                <TableCell>שעת סיום</TableCell>
                <TableCell>תיאור חדר</TableCell>
                <TableCell>שיבוץ תקין?</TableCell>
                <TableCell>חלק מהמערכת?</TableCell>
                <TableCell>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedMeetings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.course}</TableCell>
                  <TableCell>{meeting.subject}</TableCell>
                  <TableCell>{meeting.meetingNumber}</TableCell>
                  <TableCell>{meeting.lecturer}</TableCell>
                  <TableCell>{meeting.day}</TableCell>
                  <TableCell>{meeting.date}</TableCell>
                  <TableCell>{meeting.startTime}</TableCell>
                  <TableCell>{meeting.endTime}</TableCell>
                  <TableCell>{meeting.room}</TableCell>
                  <TableCell><Chip label={meeting.valid ? "כן" : "לא"} color={meeting.valid ? "success" : "default"} /></TableCell>
                  <TableCell><Chip label={meeting.inSystem ? "כן" : "לא"} color={meeting.inSystem ? "success" : "default"} /></TableCell>
                  <TableCell>
                    <IconButton color="primary"><Edit /></IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(meeting.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={displayedMeetings.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            rowsPerPageOptions={[10, 20, 50]}
          />
        </TableContainer>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={displayedMeetings.map((m) => ({ title: `${m.course} - ${m.lecturer}`, start: m.date }))}
          locale="he"
        />
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
}



















// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAllMeetings } from "../features/meeting/meetingActions";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   IconButton,
//   Button,
//   TablePagination,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// export default function MeetingsTable() {
//   const dispatch = useDispatch();
//   const { meetings, loading, error } = useSelector((state) => state.meeting);
//   const [view, setView] = useState("table");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   useEffect(() => {
//     dispatch(fetchAllMeetings());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     fetch(`/api/meetings/${id}`, { method: "DELETE" })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("מחיקת מפגש נכשלה");
//         }
//         dispatch(fetchAllMeetings());
//         setSnackbar({
//           open: true,
//           message: "מפגש נמחק בהצלחה",
//           severity: "success",
//         });
//       })
//       .catch(() => {
//         setSnackbar({
//           open: true,
//           message: "מחיקת מפגש נכשלה",
//           severity: "error",
//         });
//       });
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <div>
//       <Button
//         variant="contained"
//         onClick={() => setView(view === "table" ? "calendar" : "table")}
//         sx={{ mb: 2 }}
//       >
//         {view === "table" ? "הצג לוח שנה" : "הצג טבלה"}
//       </Button>
//       {view === "table" ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>שם קורס</TableCell>
//                 <TableCell>נושא</TableCell>
//                 <TableCell>מספר מפגש</TableCell>
//                 <TableCell>מרצה</TableCell>
//                 <TableCell>יום</TableCell>
//                 <TableCell>תאריך</TableCell>
//                 <TableCell>שעת התחלה</TableCell>
//                 <TableCell>שעת סיום</TableCell>
//                 <TableCell>תיאור חדר</TableCell>
//                 <TableCell>שיבוץ תקין?</TableCell>
//                 <TableCell>חלק מהמערכת?</TableCell>
//                 <TableCell>פעולות</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {meetings
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((meeting) => (
//                   <TableRow key={meeting.id}>
//                     <TableCell>{meeting.course}</TableCell>
//                     <TableCell>{meeting.subject}</TableCell>
//                     <TableCell>{meeting.meetingNumber}</TableCell>
//                     <TableCell>{meeting.lecturer}</TableCell>
//                     <TableCell>{meeting.day}</TableCell>
//                     <TableCell>{meeting.date}</TableCell>
//                     <TableCell>{meeting.startTime}</TableCell>
//                     <TableCell>{meeting.endTime}</TableCell>
//                     <TableCell>{meeting.room}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={meeting.valid ? "כן" : "לא"}
//                         color={meeting.valid ? "success" : "default"}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={meeting.inSystem ? "כן" : "לא"}
//                         color={meeting.inSystem ? "success" : "default"}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <IconButton color="primary">
//                         <Edit />
//                       </IconButton>
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleDelete(meeting.id)}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             component="div"
//             count={meetings.length}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={(e) =>
//               setRowsPerPage(parseInt(e.target.value, 10))
//             }
//             rowsPerPageOptions={[10, 20, 50]}
//           />
//         </TableContainer>
//       ) : (
//         <FullCalendar
//           plugins={[dayGridPlugin]}
//           initialView="dayGridMonth"
//           events={meetings.map((m) => ({
//             title: `${m.course} - ${m.lecturer}`,
//             start: m.date,
//           }))}
//           locale="he"
//         />
//       )}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
//       </Snackbar>
//     </div>
//   );
// }
