import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMeetings,fetchMeetingsByPage } from "../features/meeting/meetingActions";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
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
    const { meetings, loading, error, totalCount } = useSelector((state) => state.meeting);
    const [page, setPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        if (!pageNumber || !rowsPerPage) return;
    
        dispatch(fetchMeetingsByPage({ page: pageNumber, pageSize: rowsPerPage }));
    }, [dispatch, pageNumber, rowsPerPage]);

    const handleDelete = (id) => {
        setSnackbar({ open: true, message: "מחיקת מפגש נכשלה", severity: "error" });
    };
   const handlePageChange = (event, value) => {
    setPage(value); // מעדכן את ה-state של עמוד נבחר
    setPageNumber(value); // ומעדכן גם את ה־pageNumber כדי לשלוף את המידע המתאים
};
    
    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage); // נעדכן רק את השורות
        setPageNumber(1); // חוזרים לעמוד ראשון
    };
    
    


    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

   // הנח שהשרת מחזיר רק את המפגשים של העמוד הנוכחי
   const displayedMeetings = Array.isArray(meetings) ? meetings : [];

// ה-totalMeetings צריך להגיע מה-Redux (ראה הסבר למטה)
const pageCount = Math.ceil(totalCount / rowsPerPage);

    return (
        <div >
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

                <Box className="highlighted-box">
   <Box className="flex-center">
      <Typography className="ml-1">מספר שורות:</Typography>
      <Select
         value={rowsPerPage}
         onChange={handleRowsPerPageChange}
         size="small"
         className="custom-select"
         IconComponent={() => (
            <Box className="icon-container">
                <UnfoldMoreIcon/>
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
    page={page} // משנה את העמוד לפי ה-state
    onChange={handlePageChange} // מעדכן את ה-state כאשר המשתמש משנה עמוד
    className="pagination"
/>
</Box>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    );
}