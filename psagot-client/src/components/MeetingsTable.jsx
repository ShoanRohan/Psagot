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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
    Snackbar,
    Alert,
    CircularProgress,
    Box,
    Typography,
    Select,
    MenuItem,
    Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../styles/meetingsTable.css"; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${TableCell.head}`]: {
        textAlign: "center",
        padding: theme.spacing(1, 2),
    },
    [`&.${TableCell.body}`]: {
        textAlign: "center"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#f9fbff",
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const mockMeetings = [
    {
        id: 1,
        meetingNumber: 1,
        course: "React Basics",
        subject: "Introduction to React",
        lecturer: "John Doe",
        day: "Monday",
        date: "2025-02-20",
        startTime: "10:00",
        endTime: "12:00",
        room: "Room 101",
        valid: true,
        inSystem: true,
    },
    {
        id: 2,
        meetingNumber: 2,
        course: "Advanced JavaScript",
        subject: "Async/Await",
        lecturer: "Jane Smith",
        day: "Wednesday",
        date: "2025-02-22",
        startTime: "14:00",
        endTime: "16:00",
        room: "Room 202",
        valid: false,
        inSystem: false,
    },
    {
        id: 3,
        meetingNumber: 3,
        course: "React Basics",
        subject: "React Components",
        lecturer: "John Doe",
        day: "Friday",
        date: "2025-02-24",
        startTime: "09:00",
        endTime: "11:00",
        room: "Room 101",
        valid: true,
        inSystem: true,
    },
    {
        id: 4,
        meetingNumber: 4,
        course: "Node.js",
        subject: "Express.js Basics",
        lecturer: "Michael Green",
        day: "Tuesday",
        date: "2025-02-27",
        startTime: "13:00",
        endTime: "15:00",
        room: "Room 303",
        valid: true,
        inSystem: false,
    },
    {
        id: 5,
        meetingNumber: 5,
        course: "Database Management",
        subject: "SQL Queries",
        lecturer: "Emma Brown",
        day: "Thursday",
        date: "2025-02-29",
        startTime: "15:00",
        endTime: "17:00",
        room: "Room 404",
        valid: false,
        inSystem: true,
    },
    {
        id: 6,
        meetingNumber: 6,
        course: "React Basics",
        subject: "State & Props",
        lecturer: "John Doe",
        day: "Monday",
        date: "2025-03-04",
        startTime: "10:00",
        endTime: "12:00",
        room: "Room 101",
        valid: true,
        inSystem: true,
    },
    {
        id: 7,
        meetingNumber: 7,
        course: "Advanced JavaScript",
        subject: "Closures",
        lecturer: "Jane Smith",
        day: "Wednesday",
        date: "2025-03-06",
        startTime: "14:00",
        endTime: "16:00",
        room: "Room 202",
        valid: true,
        inSystem: false,
    },
    {
        id: 8,
        meetingNumber: 8,
        course: "Node.js",
        subject: "Middleware in Express",
        lecturer: "Michael Green",
        day: "Friday",
        date: "2025-03-08",
        startTime: "09:00",
        endTime: "11:00",
        room: "Room 303",
        valid: false,
        inSystem: true,
    },
    {
        id: 9,
        meetingNumber: 9,
        course: "Database Management",
        subject: "NoSQL Databases",
        lecturer: "Emma Brown",
        day: "Tuesday",
        date: "2025-03-11",
        startTime: "13:00",
        endTime: "15:00",
        room: "Room 404",
        valid: true,
        inSystem: true,
    },
    {
        id: 10,
        meetingNumber: 10,
        course: "React Basics",
        subject: "Hooks in React",
        lecturer: "John Doe",
        day: "Thursday",
        date: "2025-03-13",
        startTime: "15:00",
        endTime: "17:00",
        room: "Room 101",
        valid: false,
        inSystem: false,
    },
    {
        id: 11,
        meetingNumber: 11,
        course: "Advanced JavaScript",
        subject: "ES6 Features",
        lecturer: "Jane Smith",
        day: "Monday",
        date: "2025-03-17",
        startTime: "10:00",
        endTime: "12:00",
        room: "Room 202",
        valid: true,
        inSystem: true,
    },
    {
        id: 12,
        meetingNumber: 12,
        course: "Node.js",
        subject: "REST API Design",
        lecturer: "Michael Green",
        day: "Wednesday",
        date: "2025-03-19",
        startTime: "14:00",
        endTime: "16:00",
        room: "Room 303",
        valid: false,
        inSystem: false,
    },
    {
        id: 13,
        meetingNumber: 13,
        course: "Database Management",
        subject: "Indexing & Optimization",
        lecturer: "Emma Brown",
        day: "Friday",
        date: "2025-03-21",
        startTime: "09:00",
        endTime: "11:00",
        room: "Room 404",
        valid: true,
        inSystem: true,
    },
    {
        id: 14,
        meetingNumber: 14,
        course: "React Basics",
        subject: "React Router",
        lecturer: "John Doe",
        day: "Tuesday",
        date: "2025-03-25",
        startTime: "13:00",
        endTime: "15:00",
        room: "Room 101",
        valid: true,
        inSystem: false,
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

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    const displayedMeetings = (meetings.length > 0 ? meetings : mockMeetings).slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );
    const pageCount = Math.ceil((meetings.length > 0 ? meetings : mockMeetings).length / rowsPerPage);

    return (
        <div>
            <Button variant="contained" onClick={() => setView(view === "table" ? "calendar" : "table")} sx={{ mb: 2 }}>
                {view === "table" ? "הצג לוח שנה" : "הצג טבלה"}
            </Button>
            {view === "table" ? (
                <TableContainer component={Paper} className="table-container">
                    <Table className="meetings-table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell className="table-header">מספר מפגש</StyledTableCell>
                                <StyledTableCell className="table-header">שם קורס</StyledTableCell>
                                <StyledTableCell className="table-header">שם נושא</StyledTableCell>
                                <StyledTableCell className="table-header">שם מרצה</StyledTableCell>
                                <StyledTableCell className="table-header">תאריך</StyledTableCell>
                                <StyledTableCell className="table-header">יום</StyledTableCell>
                                <StyledTableCell className="table-header">שעת התחלה</StyledTableCell>
                                <StyledTableCell className="table-header">שעת סיום</StyledTableCell>
                                <StyledTableCell className="table-header">מספר חדר</StyledTableCell>
                                <StyledTableCell className="table-header">שיבוץ</StyledTableCell>
                                <StyledTableCell className="table-header">סטטוס</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedMeetings.map((meeting) => (
                                <StyledTableRow key={meeting.id}>
                                    <StyledTableCell>{meeting.meetingNumber}</StyledTableCell>
                                    <StyledTableCell>{meeting.course}</StyledTableCell>
                                    <StyledTableCell>{meeting.subject}</StyledTableCell>
                                    <StyledTableCell>{meeting.lecturer}</StyledTableCell>
                                    <StyledTableCell>{meeting.date}</StyledTableCell>
                                    <StyledTableCell>{meeting.day}</StyledTableCell>
                                    <StyledTableCell>{meeting.startTime}</StyledTableCell>
                                    <StyledTableCell>{meeting.endTime}</StyledTableCell>
                                    <StyledTableCell>{meeting.room}</StyledTableCell>
                                    <StyledTableCell>{meeting.valid ? "V" : "X"}</StyledTableCell>
                                    <StyledTableCell>
                                        <Chip
                                            label={meeting.inSystem ? "פעיל" : "הסתיים"}
                                            className={meeting.inSystem ? "status-chip active" : "status-chip inactive"}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Box className="icon-buttons">
                                            <IconButton className="delete-button" onClick={() => handleDelete(meeting.id)}>
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                            <IconButton className="edit-button">
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={displayedMeetings.map((m) => ({ title: `${m.course} - ${m.lecturer}`, start: m.date }))}
                    locale="he"
                />
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="highlighted-box">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ ml: 1}}>מספר שורות:</Typography>
                    <Select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        size="small"
                        sx={{
                            height: 28,
                            minWidth: 50,
                            fontSize: "0.75rem",
                            padding: "2px 8px",
                            "& .MuiSelect-icon": { display: "none" },
                            position: "relative",
                        }}
                        IconComponent={() => (
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <KeyboardArrowUpIcon sx={{ fontSize: 14 }} />
                                <KeyboardArrowDownIcon sx={{ fontSize: 14, marginTop: "-4px" }} />
                            </Box>
                        )}
                    >
                        {[10, 25, 50].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    sx={{
                        direction: "ltr",
                        "& .MuiPaginationItem-root": {
                            borderRadius: "4px",
                        },
                    }}
                />
            </Box>
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
