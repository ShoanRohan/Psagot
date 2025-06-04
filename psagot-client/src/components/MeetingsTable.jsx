import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeetingsByPage } from "../features/meeting/meetingActions";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../styles/meetingsTable.css";
import { StyledTableCell, StyledTableRow } from "../styles/MeetingsTableStyle";

export default function MeetingsTable() {
  const dispatch = useDispatch();
  const { meetings, status, error, totalCount } = useSelector(
    (state) => state.meeting
  );
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

const getStatusChip = (meetingDateStr) => {
  const meetingDate = new Date(meetingDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isActive = meetingDate >= today;
    return (
      <Chip
        label={isActive ? "פעיל" : "הסתיים"}
        className={isActive ? "status-chip active" : "status-chip inactive"}
      />
    );
};

  useEffect(() => {
    if (!pageNumber || !rowsPerPage) return;

    dispatch(fetchMeetingsByPage({ page: pageNumber, pageSize: rowsPerPage }));
  }, [dispatch, pageNumber, rowsPerPage]);

  const handleDelete = (id) => {
    setSnackbar({ open: true, message: "מחיקת מפגש נכשלה", severity: "error" });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setPageNumber(value);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPageNumber(1);
  };

  if (status === 'loading') return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const displayedMeetings = Array.isArray(meetings) ? meetings : [];

  const pageCount = Math.ceil(totalCount / rowsPerPage);
  return (
    <Box>
      <TableContainer component={Paper} className="table-container">
        <Table className="meetings-table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="table-header">
                מספר מפגש
              </StyledTableCell>
              <StyledTableCell className="table-header">
                שם קורס
              </StyledTableCell>
              <StyledTableCell className="table-header">
                שם נושא
              </StyledTableCell>
              <StyledTableCell className="table-header">
                שם מרצה
              </StyledTableCell>
              <StyledTableCell className="table-header">תאריך</StyledTableCell>
              <StyledTableCell className="table-header">יום</StyledTableCell>
              <StyledTableCell className="table-header">
                שעת התחלה
              </StyledTableCell>
              <StyledTableCell className="table-header">
                שעת סיום
              </StyledTableCell>
              <StyledTableCell className="table-header">
                מספר חדר
              </StyledTableCell>
              <StyledTableCell className="table-header">שיבוץ</StyledTableCell>
              <StyledTableCell className="table-header">סטטוס</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedMeetings.map((meeting) => (
              <StyledTableRow key={meeting.meetingId}>
                <StyledTableCell>{meeting.meetingNumberForTopic}</StyledTableCell>
                <StyledTableCell>{meeting.course?.name || "-"}</StyledTableCell>
                <StyledTableCell>{meeting.topic?.name || "-"}</StyledTableCell>
                <StyledTableCell>{meeting.teacher?.name || "-"}</StyledTableCell>
                <StyledTableCell>{meeting.meetingDate}</StyledTableCell>
                <StyledTableCell>{meeting.day?.name || "-"}</StyledTableCell>
                <StyledTableCell>{meeting.startTime}</StyledTableCell>
                <StyledTableCell>{meeting.endTime}</StyledTableCell>
                <StyledTableCell>{meeting.room?.name || "-"}</StyledTableCell>
                <StyledTableCell>{meeting.isValid ? "V" : "X"}</StyledTableCell>
                <StyledTableCell>{getStatusChip(meeting.meetingDate)}</StyledTableCell>
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
                {" "}
                <UnfoldMoreIcon />{" "}
              </Box>
            )}
          >
            {[10, 25, 50].map((option) => (
              <MenuItem key={option} value={option}>
                {option}{" "}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          className="pagination"
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
