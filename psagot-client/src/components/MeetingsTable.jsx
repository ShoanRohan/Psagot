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
import "../styles/meetingsTable.css"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Rubik",
     textAlign: "center",
    padding: theme.spacing(1, 2),
  },
  [`&.${TableCell.body}`]: {
    textAlign: "center",
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
    //להוסיף פונקציה של מחיקה 
    //לבדוק על הרשאה
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

// const displayedMeetings = (meetings.length > 0 ? meetings : mockMeetings).slice((page - 1) * rowsPerPage, page * rowsPerPage);
// const pageCount = Math.ceil(meetings.length / rowsPerPage);
const displayedMeetings = (meetings.length > 0 || mockMeetings.length > 0 ? meetings.length > 0 ? meetings : mockMeetings : mockMeetings).slice(
  (page - 1) * rowsPerPage,
  page * rowsPerPage
);
const pageCount = Math.ceil((meetings.length > 0 ? meetings : mockMeetings).length / rowsPerPage);

  return (
    <div style={{maxWidth: "100%"}}>
      <Button variant="contained" onClick={() => setView(view === "table" ? "calendar" : "table")} sx={{ mb: 2 }}>
        {view === "table" ? "הצג לוח שנה" : "הצג טבלה"}
      </Button>
       {view === "table" ? (
       
        <TableContainer component={Paper} sx={{ Heigh: "600px", width: "1345px"}}>
         <Table sx={{ "& td, & th": { fontSize: "0.8rem" } }}>
           <TableHead>
              <TableRow>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>מספר מפגש</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>שם קורס</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>שם נושא</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>שם מרצה</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>תאריך</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>יום</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>שעת התחלה</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>שעת סיום</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>מספר חדר</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>שיבוץ</StyledTableCell>
                <StyledTableCell align="center" sx={{fontWeight: "bold"}}>סטטוס</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {displayedMeetings.map((meeting) => (
                <StyledTableRow key={meeting.id}>
                  <StyledTableCell align="center">{meeting.meetingNumber}</StyledTableCell>
                  <StyledTableCell align="center">{meeting.course}</StyledTableCell>
                  <StyledTableCell align="center">{meeting.subject}</StyledTableCell>
                  <StyledTableCell align="center">{meeting.lecturer}</StyledTableCell>
                  <StyledTableCell align="center">{meeting.date}</StyledTableCell>
                  <StyledTableCell align="center">{meeting.day}</StyledTableCell>
                  <StyledTableCell align="center">{meeting.startTime}</StyledTableCell>
                  <StyledTableCell align="center">{meeting.endTime}</StyledTableCell>
                  <StyledTableCell align="center">{meeting.room}</StyledTableCell>
                  <StyledTableCell align="center">{meeting.valid ? "V" : "X"}</StyledTableCell>
                  <StyledTableCell  align="center">
                    <Chip
                      label={meeting.inSystem ? "פעיל" : "הסתיים"}
                      color={meeting.inSystem ? "success" : "default"}
                      sx={{
                        backgroundColor: meeting.inSystem ? "#DAF8E6" : "#f0f0f0",
                        borderRadius: "68.31px",
                        paddingX: "20.49px",
                        paddingY: "4.10px",
                        color: meeting.inSystem ? "#1A8245" : "#333",
                        fontSize: "0.875rem",
                        fontFamily: "Rubik, sans-serif",
                        fontWeight: "400",
                        textTransform: "capitalize",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <IconButton sx={{ backgroundColor: "#f6f7f9", borderRadius: "5px" }} onClick={() => handleDelete(meeting.id)}>
                      <DeleteOutlineIcon sx={{ color: "#102b82"}} />
                      </IconButton>
                      <IconButton sx={{ backgroundColor: "#f6f7f9", borderRadius: "5px" }}>
                        <EditOutlinedIcon sx={{ color: "#102b82"}} />
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
   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
   <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ ml: 1 }}>מספר שורות:</Typography>
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