import React, { useEffect, useState } from 'react';
import RoomsSearchBar from "../components/RoomsSearchBar";
import RoomsGrid from '../components/RoomsGrid';
import {
    Box,
    Stack,
    Typography,
    Snackbar,
    IconButton,
    Tooltip,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRooms } from '../features/room/roomActions';
import AddRoomButton from '../components/AddRoomButton';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// כאן יש לייבא את האייקון תמונה בדיוק כמו ב-UsersPage.jsx
import excelIcon from '../assets/icons/excelIcon.svg';  // ודא שהנתיב נכון

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Rooms = () => {
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.room.rooms);
    const roomsStatus = useSelector(state => state.room.status);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        if (roomsStatus === 'idle') {
            dispatch(fetchAllRooms());
        }
    }, [dispatch, roomsStatus]);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const onShowSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const exportAllRoomsToExcel = () => {
        if (!rooms || rooms.length === 0) {
            onShowSnackbar("אין חדרים לייצוא", "warning");
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(rooms);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rooms");
        workbook.Workbook = { Views: [{ RTL: true }] }; // מייצר ייצוא מימין לשמאל כמו ב-UsersPage
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(blob, "rooms.xlsx");
        onShowSnackbar("ייצוא לאקסל הצליח!", "success");
    };

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    direction: "rtl",
                }}
            >
                <Typography
                    variant="h1"
                    align="right"
                    sx={{
                        fontFamily: "Rubik, sans-serif",
                        fontWeight: 700,
                        fontSize: "40px",
                        color: "#0D1783",
                    }}
                >
                    חדרים
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" sx={{ direction: "ltr" }}>
                    <AddRoomButton onShowSnackbar={onShowSnackbar} />

                    <Tooltip title="ייצוא לאקסל">
                        <IconButton
                            onClick={exportAllRoomsToExcel}
                            sx={{ height: "44px", width: "44px" }}
                            aria-label="ייצוא לאקסל"
                        >
                            <Box
                                component="img"
                                src={excelIcon}
                                alt="ייצוא לאקסל"
                                sx={{ height: "24px", width: "24px", mt: "-4px" }}
                            />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>

            <RoomsSearchBar />
            <RoomsGrid rooms={rooms} />

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', fontFamily: 'Rubik' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Rooms;
