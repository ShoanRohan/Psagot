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
import * as XLSX from 'xlsx'; // ספריית XLSX לייצוא אקסל
import { saveAs } from 'file-saver'; // ספריית FileSaver לשמירת הקובץ

// ייבוא אייקון אקסל - יש לוודא שהנתיב נכון
import excelIcon from '../assets/icons/excelIcon.svg'; 

// קומפוננטת Alert מותאמת ל־Snackbar של MUI
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Rooms = () => {
    const dispatch = useDispatch();

    // קבלת רשימת החדרים וסטטוס הטעינה מהרידקס
    const rooms = useSelector(state => state.room.rooms);
    const roomsStatus = useSelector(state => state.room.status);

    // ניהול מצב Snackbar להצגת הודעות למשתמש
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // סוג ההודעה: success, error, warning, info

    // טעינת החדרים ברגע שסטטוס הוא 'idle'
    useEffect(() => {
        if (roomsStatus === 'idle') {
            dispatch(fetchAllRooms());
        }
    }, [dispatch, roomsStatus]);

    // טיפול בסגירת Snackbar, מתעלם מלחיצות מחוץ להודעה
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    // פונקציה להצגת Snackbar עם הודעה וסוג
    const onShowSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    // ייצוא כל החדרים לאקסל
    const exportAllRoomsToExcel = () => {
        if (!rooms || rooms.length === 0) {
            onShowSnackbar("אין חדרים לייצוא", "warning"); // אם אין חדרים לייצוא מציג הודעה
            return;
        }
        // המרת מערך החדרים לגיליון עבודה באקסל
        const worksheet = XLSX.utils.json_to_sheet(rooms);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rooms");

        // הגדרת כיוון ימין לשמאל (RTL) לייצוא
        workbook.Workbook = { Views: [{ RTL: true }] };

        // יצירת קובץ אקסל בפורמט מערך ביטים
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        // יצירת Blob מסוג קובץ אקסל
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

        // שמירת הקובץ בשם rooms.xlsx
        saveAs(blob, "rooms.xlsx");

        // הודעת הצלחה למשתמש
        onShowSnackbar("ייצוא לאקסל הצליח!", "success");
    };

    return (
        <div>
            {/* כותרת ופעולות על גבי שורה אחת */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between", // פיזור בין הכותרת לכפתורים
                    alignItems: "center",
                    mb: 3,
                    direction: "rtl", // כיוון טקסט מימין לשמאל
                }}
            >
                {/* כותרת ראשית */}
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

                {/* Stack לאירגון כפתורי הוספה וייצוא - בכיוון ltr כדי שהכפתורים יהיו משמאל לימין */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ direction: "ltr" }}>
                    {/* כפתור להוספת חדר, מקבל callback להצגת Snackbar */}
                    <AddRoomButton onShowSnackbar={onShowSnackbar} />

                    {/* Tooltip וכפתור לייצוא לאקסל */}
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

            {/* שורת חיפוש */}
            <RoomsSearchBar />

            {/* טבלת חדרים */}
            <RoomsGrid rooms={rooms} />

            {/* Snackbar להצגת הודעות משתמש */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', fontFamily: 'Rubik' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Rooms;
