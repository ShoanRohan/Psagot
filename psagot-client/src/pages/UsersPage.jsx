import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import '../styles/usersPage.css';
import { InputLabel, Modal, Pagination, TextField } from '@mui/material';
import { fetchUsersByPage, updateUserAction } from "../features/user/userAction";
import Container from "@mui/material/Container";
import { Stack, MenuItem, FormControl, FormHelperText, Checkbox, FormControlLabel } from "@mui/material"; // ייבוא Checkbox ו-FormControlLabel
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import *as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { addUserAction, fetchAllUsers } from "../features/user/userAction";
import UsersSearch from '../components/UsersSearch';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import { setPageSize, setPageNumber } from '../features/user/userSlice';
import Editicone from '../assets/icons/Editicone.png';
import Deleteicone from '../assets/icons/Deleteicone.png';
import { Grid } from '@mui/material';

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
import { Grid } from '@mui/material';

const UsersPage = () => {
  const { users } = useSelector((state) => state.user);
 const loggedInUser = useSelector((state) => state.auth?.loggedInUser || {}); 
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
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsersByPage({ pageNumber, pageSize }));
  }, [pageNumber, pageSize, dispatch]);

  const handleChangePageSize = (event) => {
    dispatch(setPageSize(Number(event.target.value)));
  };

  const handlePageNumberChange = (event, value) => {
    dispatch(setPageNumber(value));
  };

const handleStatusChange = async (userId, currentStatus) => {
  const user = users.find((u) => u.userId === userId);
  if (!user) {
    console.error("המשתמש לא נמצא");
    return;
  }

  const updatedUser = {
    userId: user.userId,
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    password: user.password || '123456',  // ← חובה! השרת מצפה לסיסמה
    userTypeId: user.userTypeId || 3,
    userTypeName: user.userTypeName || '',
    isActive: !currentStatus,
    role: user.role || ''
  };

  console.log(" עדכון סטטוס נשלח:", updatedUser);

  try {
    await dispatch(updateUserAction(updatedUser)).unwrap();
    dispatch(fetchUsersByPage({ pageNumber, pageSize }));
  } catch (err) {
    console.error(" שגיאה בעדכון סטטוס המשתמש", err);
  }
};


const handleUpdateUser = async () => {
  const userToUpdate = {
    userId: selectedUser.userId,
    name: selectedUser.name || '',
    email: selectedUser.email || '',
    phone: selectedUser.phone || '',
    password: selectedUser.password || '',
    userTypeId: selectedUser.userTypeId || 3, 
    userTypeName: selectedUser.userTypeName || '',
    isActive: selectedUser.isActive ?? true,   
    role: selectedUser.role || '',            
  };

  console.log(" נשלח לעדכון:", userToUpdate);

  try {
    await dispatch(updateUserAction(userToUpdate)).unwrap();
    setOpen(false);
    dispatch(fetchUsersByPage({ pageNumber, pageSize }));
  } catch (err) {
    console.error(" שגיאה בעדכון המשתמש", err);
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
           {error && <Box className="boxError">{error}</Box>}
        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="bigtable">קוד משתמש</TableCell>
                <TableCell className="bigtable">שם משתמש</TableCell>
                <TableCell className="bigtable">מייל</TableCell>
                <TableCell className="bigtable">הרשאה</TableCell>
                <TableCell className="bigtable">סטטוס</TableCell>
                <TableCell className="bigtable">עריכה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, index) => (
                <TableRow key={`${user.userId}-${index}`}>
                  <TableCell sx={{ textAlign: 'center' }}>{user.userId}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{user.name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{user.email}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{user.userTypeName}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      className={user.isActive ? 'buttonActive' : 'buttonInactive'}
                      onClick={() => handleStatusChange(user.userId, user.isActive)}
                    >
                      {user.isActive ? "פעיל" : "לא פעיל"}
                    </Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    <IconButton onClick={() => alert(`מחיקת משתמש ${user.userId}`)}>
                      <img src={Deleteicone} alt="delete" className='deleteIcon' />
                    </IconButton>
                    <IconButton onClick={() => {
                      setSelectedUser(user);
                      setOpen(true);
                    }}>
                      <img src={Editicone} alt="edit" className='editIcon' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box className="boxStyle">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography className='flexCenter'>מספר שורות:</Typography>
            <FormControl sx={{ minWidth: 120, ml: 2 }}>
              <Select value={pageSize} onChange={handleChangePageSize} displayEmpty>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Pagination
            count={Math.ceil(totalUsers / pageSize)}
            page={pageNumber}
            onChange={handlePageNumberChange}
          />
        </Box>
      
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
            <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="popUpBox" sx={{ p: 4, bgcolor: 'white', borderRadius: 2, maxWidth: '900px', width: '95%', mx: 'auto', my: '5vh' }}>
          {selectedUser && (
            <>
              <Typography variant="h6" mb={3} sx={{ textAlign: 'center' }}>
                עריכת משתמש
              </Typography>

              <Grid container spacing={3} mb={1}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="שם"
                    name="name"
                    value={selectedUser.name || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    fullWidth
                    size="medium"
                    InputProps={{ sx: { height: 56 } }}
                    InputLabelProps={{ sx: { fontSize: 16 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="אימייל"
                    name="email"
                    value={selectedUser.email || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    fullWidth
                    size="medium"
                    InputProps={{ sx: { height: 56 } }}
                    InputLabelProps={{ sx: { fontSize: 16 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="טלפון"
                    name="phone"
                    value={selectedUser.phone || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                    fullWidth
                    size="medium"
                    InputProps={{ sx: { height: 56 } }}
                    InputLabelProps={{ sx: { fontSize: 16 } }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="סיסמה"
                    name="password"
                    type="password"
                    value={selectedUser.password || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                    fullWidth
                    size="medium"
                    InputProps={{ sx: { height: 56 } }}
                    InputLabelProps={{ sx: { fontSize: 16 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="הרשאה"
                    name="userTypeName"
                    value={selectedUser.userTypeName || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, userTypeName: e.target.value })}
                    fullWidth
                    size="medium"
                    disabled
                    InputProps={{ sx: { height: 56 } }}
                    InputLabelProps={{ sx: { fontSize: 16 } }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="medium">
                    <InputLabel id="status-label" sx={{ fontSize: 16 }}>סטטוס</InputLabel>
                    <Select
                      labelId="status-label"
                      label="סטטוס"
                      value={selectedUser.isActive ? "true" : "false"}
                      onChange={(e) => setSelectedUser({ ...selectedUser, isActive: e.target.value === "true" })}
                      displayEmpty
                      inputProps={{ sx: { height: 70, fontSize: '1.25rem', padding: '10px 14px' } }}
                      sx={{ fontSize: '1.25rem' }}
                    >
                      <MenuItem value="true">פעיל</MenuItem>
                      <MenuItem value="false">לא פעיל</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box mt={4} display="flex" gap={2} justifyContent="center">
                <Button variant="contained" size="large" onClick={handleUpdateUser}>שמור</Button>
                <Button variant="outlined" size="large" onClick={() => setOpen(false)}>ביטול</Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
        </Container>
    );
};

export default UsersPage;