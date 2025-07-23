import React, { useState } from 'react';
import RoomsSearchBar from "../components/RoomsSearchBar";
import RoomsGrid from '../components/RoomsGrid';
import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox, // ייבוא Checkbox
    ListItemText // ייבוא ListItemText
} from '@mui/material';
import excelIcon from "../assets/icons/excelIcon.svg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useFormik } from 'formik';
import * as yup from 'yup';

// ייבוא הספריות לייצוא אקסל
import * as XLSX from 'xlsx'; // זה לא נחוץ יותר לייצוא מהצד לקוח
import { saveAs } from 'file-saver';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// סגנונות כפתורים כמו בקובץ UsersSearch
const buttonStyles = {
    height: "44px",
    padding: "0px 20px",
    gap: "8px",
    borderRadius: "50px",
    boxShadow: "none",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "18.96px",
    backgroundColor: "#326DEF",
    color: "white",
    "&:hover": {
        backgroundColor: "#2857C4",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    "&:active": {
        backgroundColor: "#234E9D",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
    },
};

// סגנונות כפתורים בפופאפ
const popupButtonStyles = {
    minWidth: "100px",
    height: "40px",
    borderRadius: "50px",
    boxShadow: "none",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: "16px",
    textTransform: "none",
};

// סגנונות משותפים לשדות הטקסט והסלקט בתוך הפופאפ
const sharedDialogFieldStyles = {
    textAlign: "right",
    direction: "rtl",
    "& .MuiInputLabel-root": {
        right: "0",
        transformOrigin: "top right",
        left: "unset",
        fontFamily: "Rubik",
    },
    "& .MuiInputBase-root": {
        height: "43px",
        fontFamily: "Rubik",
    },
    "& .MuiSelect-select": {
        paddingRight: "32px !important",
        paddingLeft: "14px",
    },
    "& .MuiSelect-icon": {
        left: "12px",
        right: "unset",
    },
};

// סכימת ולידציה עם Yup
const addRoomValidationSchema = yup.object({
    name: yup
        .string()
        .required('שם חדר הוא שדה חובה')
        .max(50, 'שם חדר ארוך מדי (מקסימום 50 תווים)'),
    roomId: yup
        .string()
        .required('מספר חדר הוא שדה חובה')
        .matches(/^[0-9]+$/, 'מספר חדר יכול להכיל רק ספרות')
        .max(10, 'מספר חדר ארוך מדי (מקסימום 10 תווים)'),
    capacity: yup
        .number()
        .required('מספר מקומות הוא שדה חובה')
        .min(1, 'מספר מקומות חייב להיות לפחות 1')
        .max(200, 'מספר מקומות מקסימלי הוא 200')
        .typeError('מספר מקומות חייב להיות מספר'),
    equipment: yup
        .array()
        .of(yup.string()),
});


const Rooms = () => {
    const [openAddRoomPopup, setOpenAddRoomPopup] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [roomsData, setRoomsData] = useState([]); // מצב לאחסון נתוני החדרים

    // **השינוי שבוצע:** כתובת ה-API עודכנה לפורט הנכון ול-HTTPS
    const API_BASE_URL = "https://localhost:44333"; 

    // פונקציה לקבלת נתוני החדרים מהשרת
    const fetchRooms = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/Room/GetAllRooms`);
            setRoomsData(response.data); // עדכון מצב הנתונים
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setSnackbarMessage("שגיאה בטעינת נתוני החדרים.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    // קריאה לפונקציית טעינת הנתונים בעת טעינת הקומפוננטה
    React.useEffect(() => {
        fetchRooms();
    }, []); // ריצה רק פעם אחת בטעינה ראשונית


    // שימוש ב-Formik
    const formik = useFormik({
        initialValues: {
            name: "",
            roomId: "",
            capacity: "",
            equipment: [],
        },
        validationSchema: addRoomValidationSchema,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const roomToSend = {
                    name: values.name,
                    // roomId: values.roomId,
                    roomId: parseInt(values.roomId, 10),
                    capacity: parseInt(values.capacity),
                    projector: values.equipment.includes("מקרן"),
                    speakers: values.equipment.includes("רמקולים"),
                    computers: values.equipment.includes("מחשבים"),
                };

                const response = await axios.post(
                    `${API_BASE_URL}/api/Room/AddRoom`,
                    roomToSend
                );

                console.log("Room added successfully:", response.data);

                handleCloseAddRoomPopup();
                setSnackbarMessage("חדר נוסף בהצלחה!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                fetchRooms(); // רענן את נתוני החדרים לאחר הוספה מוצלחת
            } catch (error) {
                console.error(
                    "Error adding room:",
                    error.response ? error.response.data : error.message
                );
                setSnackbarMessage(
                    "שגיאה בהוספת חדר: " +
                    (error.response?.data?.message || "אנא נסה שוב מאוחר יותר.")
                );
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        },
    });

    const handleOpenAddRoomPopup = () => {
        formik.resetForm();
        setOpenAddRoomPopup(true);
    };

    const handleCloseAddRoomPopup = () => {
        setOpenAddRoomPopup(false);
        formik.resetForm();
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    // פונקציה לייצוא לאקסל
    const handleExportToExcel = async () => { // הפוך את הפונקציה ל-async
        setSnackbarMessage("מייצא נתונים לאקסל...");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);

        try {
            // בצע קריאת GET לנקודת הקצה החדשה בשרת
            const response = await axios.get(`${API_BASE_URL}/api/Room/export-to-excel`, {
                responseType: 'blob', // חשוב: צפה לתשובה כ-Blob (קובץ בינארי)
            });

            if (response.data.size === 0) { // בדוק אם הקובץ ריק
                setSnackbarMessage("אין נתונים לייצוא לאקסל.");
                setSnackbarSeverity("warning");
                setSnackbarOpen(true);
                return;
            }

            // קבלת שם הקובץ מהכותרות (אופציונלי, אם השרת שולח)
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'חדרים.xlsx';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="([^"]+)"/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = decodeURIComponent(fileNameMatch[1]); // פענוח שם הקובץ
                }
            }

            // שמירת הקובץ שהתקבל מהשרת
            saveAs(response.data, fileName);

            setSnackbarMessage("הנתונים יוצאו לאקסל בהצלחה!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

        } catch (error) {
            console.error("Error exporting to Excel:", error);
            let errorMessage = "שגיאה בייצוא לאקסל.";
            if (error.response && error.response.data) {
                // נסה לקרוא הודעת שגיאה מ-Blob
                const reader = new FileReader();
                reader.onload = function() {
                    try {
                        const errorJson = JSON.parse(reader.result);
                        errorMessage = errorJson.message || errorMessage;
                    } catch (e) {
                        errorMessage = reader.result || errorMessage;
                    }
                    setSnackbarMessage(errorMessage);
                    setSnackbarSeverity("error");
                    setSnackbarOpen(true);
                };
                reader.readAsText(error.response.data);
            } else {
                setSnackbarMessage(errorMessage);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
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

                <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                    <Button
                        variant="contained"
                        sx={{ ...buttonStyles, backgroundColor: "#326DEF" }}
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleOpenAddRoomPopup}
                    >
                        הוספת חדר
                    </Button>
                    <IconButton
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "44px",
                            width: "44px",
                            padding: 0,
                        }}
                        onClick={handleExportToExcel} // קישור הפונקציה לכפתור
                    >
                        <Box
                            component="img"
                            src={excelIcon}
                            alt="ייצוא לאקסל"
                            sx={{
                                height: "24px",
                                width: "24px",
                                verticalAlign: "middle",
                                mt: "-4px",
                            }}
                        />
                    </IconButton>
                </Stack>
            </Box>
            <RoomsSearchBar />
            {/* RoomsGrid מקבל כעת את נתוני החדרים כדי שיוכל להציג אותם */}
            {/* <RoomsGrid rooms={roomsData} fetchRooms={fetchRooms} /> */}
<RoomsGrid />
            {/* פופאפ הוספת חדר */}
            <Dialog
                open={openAddRoomPopup}
                onClose={handleCloseAddRoomPopup}
                PaperProps={{
                    sx: {
                        maxWidth: '450px',
                        width: 'calc(100% - 64px)',
                        height: 'auto',
                        borderRadius: '10px',
                        margin: 'auto',
                        fontFamily: "Rubik",
                        direction: "rtl",
                        textAlign: "right",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }
                }}
            >
                <DialogTitle sx={{
                    textAlign: "right",
                    direction: "rtl",
                    fontFamily: "Rubik, sans-serif",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#0D1783",
                    padding: "20px 30px 0px 30px",
                }}>
                    הוספת חדר
                </DialogTitle>
                <DialogContent sx={{
                    direction: "rtl",
                    padding: "20px 30px 20px 30px",
                    overflowY: 'unset',
                }}>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            "& .MuiTextField-root": { m: 0, width: "100%" },
                            "& .MuiFormControl-root": { m: 0, width: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Box sx={{ display: "flex", gap: "16px", flexDirection: { xs: 'column', sm: 'row' } }}>
                            <FormControl variant="standard" sx={sharedDialogFieldStyles}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="שם חדר"
                                    type="text"
                                    variant="standard"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </FormControl>
                            <FormControl variant="standard" sx={sharedDialogFieldStyles}>
                                <TextField
                                    id="roomId"
                                    name="roomId"
                                    label="מספר חדר"
                                    type="text"
                                    variant="standard"
                                    value={formik.values.roomId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={formik.touched.roomId && Boolean(formik.errors.roomId)}
                                    helperText={formik.touched.roomId && formik.errors.roomId}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ display: "flex", gap: "16px", flexDirection: { xs: 'column', sm: 'row' } }}>
                            <FormControl variant="standard" sx={sharedDialogFieldStyles}>
                                <TextField
                                    id="capacity"
                                    name="capacity"
                                    label="מספר מקומות"
                                    type="number"
                                    variant="standard"
                                    value={formik.values.capacity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                                    helperText={formik.touched.capacity && formik.errors.capacity}
                                />
                            </FormControl>
                            <FormControl variant="standard" sx={sharedDialogFieldStyles} error={formik.touched.equipment && Boolean(formik.errors.equipment)}>
                                <InputLabel id="equipment-label" shrink>
                                    ציוד
                                </InputLabel>
                                <Select
                                    labelId="equipment-label"
                                    id="equipment"
                                    name="equipment"
                                    multiple
                                    value={formik.values.equipment}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="ציוד"
                                    variant="standard"
                                    renderValue={(selected) => selected.join(', ')} // מציג את הפריטים שנבחרו כמו מחרוזת מופרדת בפסיקים
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                fontFamily: "Rubik",
                                                direction: "rtl",
                                                textAlign: "right",
                                            },
                                        },
                                    }}
                                >
                                    {['מקרן', 'רמקולים', 'מחשבים'].map((option) => (
                                        <MenuItem key={option} value={option} sx={{ fontFamily: "Rubik", textAlign: "right" }}>
                                            <Checkbox checked={formik.values.equipment.indexOf(option) > -1} /> {/* תיבת סימון */}
                                            <ListItemText primary={option} /> {/* טקסט הפריט */}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.equipment && formik.errors.equipment && (
                                    <Typography variant="caption" color="error" sx={{ textAlign: "right", direction: "rtl", mt: 0.5 }}>
                                        {formik.errors.equipment}
                                    </Typography>
                                )}
                            </FormControl>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px", paddingTop: "0px" }}>
                    <Button
                        onClick={handleCloseAddRoomPopup}
                        variant="outlined"
                        sx={{
                            ...popupButtonStyles,
                            borderColor: "#D0D5DD",
                            color: "#344054",
                            "&:hover": {
                                borderColor: "#D0D5DD",
                                backgroundColor: "#F9FAFB",
                            },
                            "&:active": {
                                backgroundColor: "#EDEFF3",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                            },
                        }}
                    >
                        ביטול
                    </Button>
                    <Button
                        type="submit"
                        onClick={formik.handleSubmit}
                        variant="contained"
                        sx={{
                            ...popupButtonStyles,
                            backgroundColor: "#326DEF",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#2857C4",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            },
                            "&:active": {
                                backgroundColor: "#234E9D",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                            },
                        }}
                    >
                        הוסף
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', fontFamily: 'Rubik' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Rooms;