import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add"; // ייבוא חדש: AddIcon
import { styled } from "@mui/material/styles";
import { fetchAllRooms } from "../features/room/roomActions";
import {
    changePageIndex,
    changePageSize,
    updateFilteredRooms,
} from "../features/room/roomSlice";
import TablePaginationActions from "./TablePaginationActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { DialogActions, Typography } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


const StyledTableCell = styled(TableCell)(() => ({
    fontSize: "14px",
    textAlign: "right",
    whiteSpace: "nowrap",
    borderBottom: "none",
    fontFamily: "Rubik",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#f9f9f9",
    },
    "&:hover": {
        backgroundColor: "#f1f1f1",
    },
    fontFamily: "Rubik",
}));

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

const buttonStyles = {
    minWidth: "100px",
    height: "40px",
    borderRadius: "50px",
    boxShadow: "none",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: "16px",
    textTransform: "none",
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// סכימת ולידציה משותפת להוספה ועריכה
const roomValidationSchema = yup.object({
    name: yup
        .string()
        .required('שם חדר הוא שדה חובה')
        .max(50, 'שם חדר ארוך מדי (מקסימום 50 תווים)'),
    roomId: yup // יהיה required רק בהוספה אם ה-backend מצפה לו
        .number() // שנה ל-number כי מדובר במספר חדר
        .required('מספר חדר הוא שדה חובה')
        .positive('מספר חדר חייב להיות חיובי')
        .integer('מספר חדר חייב להיות מספר שלם')
        .typeError('מספר חדר חייב להיות מספר'),
    capacity: yup
        .number()
        .required('מספר מקומות הוא שדה חובה')
        .min(1, 'מספר מקומות חייב להיות לפחות 1')
        .max(200, 'מספר מקומות מקסימלי הוא 200')
        .typeError('מספר מקומות חייב להיות מספר'),
    equipment: yup
        .array()
        .of(yup.string()), // יטפל בציוד אם נבחר
});


const RoomsGrid = () => {
    const {
        filteredRooms: rooms,
        status: roomStatus,
        error: roomError,
        pageSize,
        pageIndex,
        totalFilteredCount,
    } = useSelector((state) => state.room);
    console.log("📦 rooms from Redux:", rooms);
    const dispatch = useDispatch();
    const isLoading = roomStatus === "Loading";

    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [openAddPopup, setOpenAddPopup] = useState(false); // מצב חדש לדיאלוג הוספה
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null); // שימש גם לעריכה וגם לאיתחול לחדש
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const API_BASE_URL = "https://localhost:44333";

    const formik = useFormik({
        initialValues: {
            // אתחל את הערכים בהתבסס על currentRoom. אם currentRoom הוא null (מצב הוספה), הערכים יהיו ריקים
            name: currentRoom?.name || "",
            roomId: currentRoom?.roomId || "", // חשוב: roomId צריך להיות כאן
            capacity: currentRoom?.capacity || "",
            equipment: currentRoom ? [
                currentRoom.projector ? "מקרן" : null,
                currentRoom.speakers ? "רמקולים" : null,
                currentRoom.computers ? "מחשבים" : null,
            ].filter(Boolean) : [],
        },
        validationSchema: roomValidationSchema, // שימוש בסכימה המשותפת
        validateOnChange: true,
        enableReinitialize: true, // מאפשר לאתחל את הערכים כאשר currentRoom משתנה
        onSubmit: async (values) => {
            try {
                const roomToSend = {
                    name: values.name,
                    capacity: parseInt(values.capacity),
                    projector: values.equipment.includes("מקרן"),
                    speakers: values.equipment.includes("רמקולים"),
                    computers: values.equipment.includes("מחשבים"),
                };

                let response;
                if (currentRoom) { // אם currentRoom קיים, אנחנו במצב עריכה
                    roomToSend.roomId = Number(values.roomId); // ודא ש-roomId נשלח בעריכה
                    response = await axios.put(
                        `${API_BASE_URL}/api/Room/UpdateRoom`,
                        roomToSend
                    );
                    setSnackbarMessage("חדר עודכן בהצלחה!");
                } else { // מצב הוספה
                    roomToSend.roomId = Number(values.roomId); // הוספת roomId ל-roomToSend בהוספה
                    response = await axios.post(
                        `${API_BASE_URL}/api/Room/AddRoom`, // נקודת קצה חדשה
                        roomToSend
                    );
                    setSnackbarMessage("חדר נוסף בהצלחה!");
                }

                console.log("Operation successful:", response.data);
                dispatch(fetchAllRooms());
                handleCloseEditPopup(); // תסגור את דיאלוג העריכה
                handleCloseAddPopup(); // תסגור את דיאלוג ההוספה
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                console.error(
                    "Error during room operation:",
                    error.response ? error.response.data : error.message
                );
                let errorMessage = "אנא נסה שוב מאוחר יותר.";
                if (error.response && error.response.data) {
                    if (typeof error.response.data === 'string') {
                        errorMessage = error.response.data;
                    } else if (error.response.data.errors) {
                        const serverErrors = error.response.data.errors;
                        const errorMessages = [];
                        for (const key in serverErrors) {
                            if (Array.isArray(serverErrors[key])) {
                                errorMessages.push(...serverErrors[key]);
                            }
                        }
                        errorMessage = errorMessages.length > 0 ? errorMessages.join(" | ") : error.response.data.title || "שגיאה מהשרת.";
                    } else if (error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }
                } else if (error.message) {
                    errorMessage = error.message;
                }

                setSnackbarMessage("שגיאה בפעולת החדר: " + errorMessage);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchAllRooms());
            } catch (error) {
                console.log("Error occurred while fetching the rooms:", error);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        dispatch(updateFilteredRooms());
    }, [dispatch, pageIndex, pageSize]);

    const handleChangePage = (event, newPage) => {
        dispatch(changePageIndex(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(changePageSize(Number(event.target.value)));
    };

    const renderEquipment = (room) => {
        const items = [];
        if (room.computers) items.push("מחשבים");
        if (room.speakers) items.push("רמקולים");
        if (room.projector) items.push("מקרן");
        return items.join(", ");
    };

    const handleEditClick = (room) => {
        setCurrentRoom(room); // הגדר את החדר הנוכחי לעריכה
        setOpenEditPopup(true);
    };

    const handleCloseEditPopup = () => {
        setOpenEditPopup(false);
        setCurrentRoom(null); // איפוס החדר הנבחר לאחר סגירה
        formik.resetForm(); // איפוס הטופס Formik
    };

    // פונקציות חדשות לטיפול בדיאלוג ההוספה
    const handleAddClick = () => {
        setCurrentRoom(null); // חשוב: הגדר את currentRoom ל-null כדי שהטופס יתאפס למצב הוספה
        setOpenAddPopup(true);
        formik.resetForm(); // איפוס הטופס Formik עבור חדר חדש
    };

    const handleCloseAddPopup = () => {
        setOpenAddPopup(false);
        setCurrentRoom(null); // איפוס החדר הנבחר לאחר סגירה
        formik.resetForm(); // איפוס הטופס Formik
    };


    const handleDeleteClick = (room) => {
        setCurrentRoom(room); // שינוי ל-currentRoom במקום currentRoomToDelete
        setOpenDeleteConfirm(true);
    };

    const handleCloseDeleteConfirm = () => {
        setOpenDeleteConfirm(false);
        setCurrentRoom(null); // איפוס החדר הנבחר לאחר סגירה
    };

    const handleConfirmDelete = async () => {
    if (currentRoom?.roomId) { // שינוי מ-currentRoomToDelete
        console.log("Attempting to delete room with ID:", currentRoom.roomId);
        try {
            await axios.delete(
                `${API_BASE_URL}/api/Room/DeleteRoom/${currentRoom.roomId}`
            );

            console.log(`Room ${currentRoom.roomId} deleted successfully.`);
            dispatch(fetchAllRooms());
            handleCloseDeleteConfirm();
            setSnackbarMessage("חדר נמחק בהצלחה!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            } catch (error) {
                console.error(
                    "Error deleting room:",
                    error.response ? error.response.data : error.message
                );
                handleCloseDeleteConfirm();

                let errorMessage = "מחיקת חדר נכשלה";
                if (error.response && error.response.status === 400 && error.response.data === "Cannot delete room with associated meetings.") {
                    errorMessage = "לא ניתן למחוק את החדר מכיוון שיש לו מפגשים מקושרים.";
                } else if (error.response && error.response.data && (typeof error.response.data === 'string' || error.response.data.message)) {
                    errorMessage += `: ${typeof error.response.data === 'string' ? error.response.data : error.response.data.message}`;
                } else if (error.message) {
                    errorMessage += `: ${error.message}`;
                }

                setSnackbarMessage(errorMessage);
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="60vh"
            >
                <CircularProgress />
            </Box>
        );
    }
    if (roomStatus === "failed")
        return <Box> שגיאה בטעינת חדרים: {roomError}</Box>;

    return (
        <TableContainer
            component={Paper}
            sx={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        >
            {/* כפתור "הוספת חדר" - חדש - **נמחק כעת** */}
            {/*
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        ...buttonStyles,
                        backgroundColor: "#326DEF",
                        color: "white",
                        fontSize: "14px",
                        height: "40px",
                        padding: "0 20px",
                        '&:hover': {
                            backgroundColor: "#2857C4",
                        },
                    }}
                    onClick={handleAddClick}
                >
                    הוספת חדר
                </Button>
            </Box>
            */}

            <Table sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell><b>שם חדר</b></StyledTableCell>
                        <StyledTableCell><b>מספר חדר</b></StyledTableCell>
                        <StyledTableCell><b>מס' מקומות</b></StyledTableCell>
                        <StyledTableCell><b>ציוד </b></StyledTableCell>
                        <StyledTableCell align="center" sx={{ width: "70px" }}></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms.map((room) => (
                        <StyledTableRow key={room?.roomId}>
                            <StyledTableCell>{room?.name}</StyledTableCell>
                            <StyledTableCell>{room?.roomId}</StyledTableCell>
                            <StyledTableCell>{room?.capacity}</StyledTableCell>
                            <StyledTableCell>{renderEquipment(room)}</StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: "70px" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 0.5,
                                    }}
                                >
                                    <IconButton
                                        color="primary"
                                        sx={{ p: 0.5 }}
                                        onClick={() => handleEditClick(room)}
                                    >
                                        <EditOutlinedIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: "#1976d2", p: 0.5 }}
                                        onClick={() => handleDeleteClick(room)}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={totalFilteredCount}
                page={pageIndex}
                onPageChange={handleChangePage}
                rowsPerPage={pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage="מספר שורות:"
                labelDisplayedRows={({ from, to, count }) =>
                    `עמוד ${pageIndex + 1} מתוך ${Math.ceil(count / pageSize)}`
                }
                ActionsComponent={TablePaginationActions}
                sx={{
                    borderTop: "1px solid #e0e0e0",
                    direction: "ltr",
                    "& .MuiTablePagination-toolbar": {
                        justifyContent: "flex-end",
                        paddingRight: "16px",
                        paddingLeft: "16px",
                        minHeight: "48px",
                    },
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                    {
                        fontSize: "13px",
                        color: "#6b6b6b",
                    },
                    "& .MuiTablePagination-actions button": {
                        borderRadius: "4px",
                        minWidth: "32px",
                        height: "32px",
                        margin: "0 2px",
                        color: "#1976d2",
                    },
                }}
            />

            {/* דיאלוג עריכת חדר - Open תלוי ב-openEditPopup */}
            <Dialog
                open={openEditPopup}
                onClose={handleCloseEditPopup}
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
                    עריכת חדר
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
                                    onChange={formik.handleChange} // אפשר לערוך roomId גם בעריכה אם זה המודל
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={formik.touched.roomId && Boolean(formik.errors.roomId)}
                                    helperText={formik.touched.roomId && formik.errors.roomId}
                                    disabled={true} // השדה מנוטרל במצב עריכה - אסור לשנות מפתח ראשי קיים
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
                                    renderValue={(selected) => selected.join(', ')}
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
                                        <MenuItem value={option} key={option} sx={{ fontFamily: "Rubik", textAlign: "right" }}>
                                            <Checkbox checked={formik.values.equipment.includes(option)} />
                                            <ListItemText primary={option} sx={{ textAlign: 'right' }} />
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
                        onClick={handleCloseEditPopup}
                        variant="outlined"
                        sx={{
                            ...buttonStyles,
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
                            ...buttonStyles,
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
                        שמור
                    </Button>
                </DialogActions>
            </Dialog>

            {/* דיאלוג הוספת חדר - חדש - Open תלוי ב-openAddPopup */}
            <Dialog
                open={openAddPopup}
                onClose={handleCloseAddPopup}
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
                                    renderValue={(selected) => selected.join(', ')}
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
                                            <Checkbox checked={formik.values.equipment.includes(option)} />
                                            <ListItemText primary={option} sx={{ textAlign: 'right' }} />
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
                        onClick={handleCloseAddPopup}
                        variant="outlined"
                        sx={{
                            ...buttonStyles,
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
                            ...buttonStyles,
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

            {/* דיאלוג אישור מחיקה */}
            <Dialog
                open={openDeleteConfirm}
                onClose={handleCloseDeleteConfirm}
                PaperProps={{
                    sx: {
                        maxWidth: '400px',
                        width: 'calc(100% - 64px)',
                        borderRadius: '10px',
                        margin: 'auto',
                        fontFamily: "Rubik",
                        direction: "rtl",
                        textAlign: "right",
                    }
                }}
            >
                <DialogTitle sx={{
                    textAlign: "center",
                    fontFamily: "Rubik, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#0D1783",
                    padding: "20px 30px 0px 30px",
                }}>
                    מחיקת חדר
                </DialogTitle>
                <DialogContent sx={{
                    textAlign: "center",
                    direction: "rtl",
                    padding: "20px 30px",
                }}>
                    <Typography sx={{ fontFamily: "Rubik", fontSize: "16px", color: "#344054" }}>
                        האם אתה בטוח שברצונך למחוק את החדר "{currentRoom?.name}"?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
                    <Button
                        onClick={handleCloseDeleteConfirm}
                        variant="outlined"
                        sx={{
                            ...buttonStyles,
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
                        onClick={handleConfirmDelete}
                        variant="contained"
                        sx={{
                            ...buttonStyles,
                            backgroundColor: "#F04438", // צבע אדום למחיקה
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#D92D20",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            },
                            "&:active": {
                                backgroundColor: "#B42318",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                            },
                        }}
                    >
                        מחק
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', fontFamily: 'Rubik' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </TableContainer>
    );
};

export default RoomsGrid;