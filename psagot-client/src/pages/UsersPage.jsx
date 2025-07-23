import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { Stack, MenuItem, FormControl, FormHelperText, Checkbox, FormControlLabel } from "@mui/material"; // ייבוא Checkbox ו-FormControlLabel
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import excelIcon from "../assets/icons/excelIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import *as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { addUserAction, fetchAllUsers, fetchFilteredUseres } from "../features/user/userAction";
import UsersSearch from '../components/UsersSearch';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import UsersTable from "../components/UsersTable";

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

// סגנונות משותפים לשדות הטקסט בדיאלוג
const sharedDialogFieldStyles = {
    textAlign: "right",
    direction: "rtl",
    "& .MuiInputLabel-root": {
        right: "0",
        transformOrigin: "top right",
        left: "unset",
    },
    "& .MuiInputBase-root": {
        height: "43px",
    },
    // הוספת סגנון עבור אייקון הסלקט בשדות הרשאה וסטטוס
    "& .MuiInputBase-root .MuiSelect-select": {
        paddingRight: "32px !important", // מגדיל את הריפוד מימין כדי לפנות מקום לאייקון
        paddingLeft: "14px", // שומר על ריפוד רגיל משמאל
    },
    "& .MuiInputBase-root .MuiSelect-icon": {
        left: "12px", // ממקם את האייקון 12px מהשמאל
        right: "unset", // מבטל את המיקום הימני המוגדר כברירת מחדל
    },
};

const UsersPage = () => {
    const { users } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [currentFilters, setCurrentFilters] = useState({
        name: "",
        phone: "",
        userTypeName: "",
        isActive: true,
    });
    const { userTypes, status: userTypeStatus } = useSelector((state) => state.userType);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        userTypeName: "",
        isActive: true,
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        dispatch(fetchAllUsers(currentFilters));
    }, [dispatch, currentFilters]);

    useEffect(() => {
        if (userTypeStatus === "idle") {
            dispatch(fetchAllUserTypes());
        }
    }, [userTypeStatus, dispatch]);

    // פונקציה זו נקראת מ-UsersSearch כאשר כפתור "חיפוש" נלחץ
    const handleFilterChange = (filters) => {
        setCurrentFilters(filters);
        dispatch(fetchFilteredUseres(filters))
        console.log("Filters applied in UsersPage:", filters);
    };

    // פונקציה זו נקראת מ-UsersSearch כאשר כפתור "ניקוי" נלחץ
    const handleClearFilters = (initialStateFromSearch) => {
        setCurrentFilters(initialStateFromSearch);
        console.log("Filters cleared in UsersPage.");
    };

    // יצוא לאקסל
    const exportAllUsersToExcel = () => {
        if (!users || users.length === 0) return;
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet);
        workbook.Workbook = {
            Views: [{ RTL: true }],
        };
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(blob, "users.xlsx");
    };

    const handleOpenDialog = () => {
        setFormValues({ // איפוס ערכי הטופס והשגיאות בפתיחת דיאלוג חדש
            name: "",
            email: "",
            phone: "",
            password: "",
            userTypeName: "",
            isActive: true,
        });
        setFormErrors({});
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    // פונקציה לולידציה של שדה בודד
    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "name":
                if (!value.trim()) {
                    error = "שם משתמש הוא שדה חובה";
                } else if (value.trim().length < 2) {
                    error = "שם משתמש חייב להיות באורך 2 תווים לפחות";
                } else if (!/^[א-תA-Za-z\s]+$/.test(value)) {
                    error = "שם משתמש יכול להכיל אותיות ורווחים בלבד";
                }
                break;
            case "email":
                if (!value.trim()) {
                    error = "מייל הוא שדה חובה";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = "פורמט מייל לא תקין";
                }
                break;
            case "phone":
                if (!value.trim()) {
                    error = "טלפון הוא שדה חובה";
                } else if (!/^\d{10}$/.test(value)) {
                    error = "מספר טלפון לא תקין (10 ספרות בלבד)";
                }
                break;
            case "password":
                if (!value.trim()) {
                    error = "סיסמה היא שדה חובה";
                } else if (value.trim().length < 6) {
                    error = "סיסמה חייבת להיות באורך 6 תווים לפחות";
                }
                break;
            case "userTypeName":
                if (!value) {
                    error = "הרשאה היא שדה חובה";
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleFormChange = (e) => {
        const { name, value, checked, type } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));

        // הפעלת ולידציה עבור השדה הספציפי ששונה
        const error = validateField(name, newValue);
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const validateAllFormFields = () => {
        let isValid = true;
        const newErrors = {};

        // עובר על כל השדות ב-formValues ומפעיל עליהם ולידציה
        for (const [name, value] of Object.entries(formValues)) {
            const error = validateField(name, value);
            if (error) {
                newErrors[name] = error;
                isValid = false;
            }
        }
        setFormErrors(newErrors);
        return isValid;
    };

    const handleSaveUser = () => {
        if (validateAllFormFields()) { // קורא לפונקציה שבודקת את כל השדות
            console.log("User saved:", formValues);
            const userType = userTypes.find(u => u.name === formValues.userTypeName);
            const userTypeId = userType ? userType.userTypeId : null; // ודא ש-userType נמצא
            const userToSend = { ...formValues, userTypeId: userTypeId };
            dispatch(addUserAction(userToSend));
            handleCloseDialog();
        }
    };

    return (
        <Container maxWidth={false} sx={{ width: "80vw", mx: "auto", px: 2, pt: 3, pb: 3, overflowY: "unset" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, direction: "rtl" }}>
                <Typography variant="h1" align="right" sx={{ fontFamily: "Rubik, sans-serif", fontWeight: 700, fontSize: "40px", color: "#0D1783" }}>
                    משתמשים
                </Typography>
                <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                    <Button variant="contained" sx={buttonStyles} startIcon={<AddCircleOutlineIcon />} onClick={handleOpenDialog}>
                        הוספת משתמש
                    </Button>
                    <IconButton onClick={exportAllUsersToExcel} sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "44px", width: "44px", padding: 0 }}>
                        <Box component="img" src={excelIcon} alt="ייצוא לאקסל" sx={{ height: "24px", width: "24px", verticalAlign: "middle", mt: "-4px" }} />
                    </IconButton>
                </Stack>
            </Box>

            {/* העברת הפונקציות ל-UsersSearch */}
            <UsersSearch onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
            <UsersTable />
            {/* דיאלוג הוספת משתמש */}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                PaperProps={{
                    sx: {
                        maxWidth: 'sm',
                        width: 'calc(100% - 64px)',
                        height: 'auto',
                        borderRadius: '10px',
                        margin: '32px',
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
                    הוספת משתמש חדש
                </DialogTitle>
                <DialogContent sx={{
                    direction: "rtl",
                    padding: "20px 30px 40px 30px",
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px 16px',
                }}>
                    {/* שדות הוספת משתמש */}
                    <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.name}>
                        <TextField
                            id="name-dialog-input"
                            name="name"
                            label="שם"
                            value={formValues.name}
                            onChange={handleFormChange}
                            variant="standard"
                            fullWidth
                            error={!!formErrors.name}
                        />
                        <FormHelperText sx={{ textAlign: "right" }}>
                            {formErrors.name}
                        </FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.email}>
                        <TextField
                            id="email-dialog-input"
                            name="email"
                            label="מייל"
                            value={formValues.email}
                            onChange={handleFormChange}
                            variant="standard"
                            fullWidth
                            error={!!formErrors.email}
                        />
                        <FormHelperText sx={{ textAlign: "right" }}>
                            {formErrors.email}
                        </FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.phone}>
                        <TextField
                            id="phone-dialog-input"
                            name="phone"
                            label="טלפון"
                            value={formValues.phone}
                            onChange={handleFormChange}
                            variant="standard"
                            fullWidth
                            error={!!formErrors.phone}
                        />
                        <FormHelperText sx={{ textAlign: "right" }}>
                            {formErrors.phone}
                        </FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.password}>
                        <TextField
                            id="password-dialog-input"
                            name="password"
                            label="סיסמה"
                            type="password"
                            value={formValues.password}
                            onChange={handleFormChange}
                            variant="standard"
                            fullWidth
                            error={!!formErrors.password}
                        />
                        <FormHelperText sx={{ textAlign: "right" }}>
                            {formErrors.password}
                        </FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.userTypeName}>
                        <TextField
                            id="userTypeName-dialog-select"
                            name="userTypeName"
                            select
                            label="הרשאה"
                            value={formValues.userTypeName}
                            onChange={handleFormChange}
                            variant="standard"
                            fullWidth
                            error={!!formErrors.userTypeName}
                        >
                            <MenuItem value="">
                                <em>בחר הרשאה</em>
                            </MenuItem>
                            {userTypes.map((userType) => (
                                <MenuItem key={userType.userTypeId} value={userType.name}>
                                    {userType.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText sx={{ textAlign: "right" }}>
                            {formErrors.userTypeName}
                        </FormHelperText>
                    </FormControl>

                    {/* שינוי: הפיכת שדה הסטטוס ל-Checkbox */}
                    <FormControl variant="standard" sx={{ ...sharedDialogFieldStyles, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formValues.isActive} // מקושר ל-isActive
                                    onChange={handleFormChange}
                                    name="isActive" // השם של השדה ב-formValues
                                    color="primary"
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} // התאמת גודל הצ'קבוקס
                                />
                            }
                            label="פעיל"
                            labelPlacement="end" // מיקום התווית מצד ימין של הצ'קבוקס
                            sx={{
                                margin: 0, // הסרת מרווחים פנימיים כברירת מחדל
                                '& .MuiTypography-root': {
                                    fontFamily: "Rubik",
                                    fontSize: "16px",
                                    lineHeight: "18.96px",
                                    color: "#344054",
                                },
                                '& .MuiCheckbox-root': {
                                    padding: '0 8px 0 0', // התאמת ריפוד כדי למקם את הצ'קבוקס
                                },
                                flexDirection: 'row-reverse', // היפוך סדר האלמנטים כדי שהתווית תהיה מימין
                                marginLeft: 'auto', // יישור לימין בתוך ה-grid item
                            }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
                    <Button
                        onClick={handleCloseDialog}
                        variant="outlined"
                        sx={{
                            minWidth: "100px",
                            height: "40px",
                            borderRadius: "50px",
                            boxShadow: "none",
                            fontFamily: "Rubik",
                            fontWeight: 400,
                            fontSize: "16px",
                            textTransform: "none",
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
                        onClick={handleSaveUser}
                        variant="contained"
                        sx={{
                            minWidth: "100px",
                            height: "40px",
                            borderRadius: "50px",
                            boxShadow: "none",
                            fontFamily: "Rubik",
                            fontWeight: 400,
                            fontSize: "16px",
                            textTransform: "none",
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
        </Container>
    );
};

export default UsersPage;