
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Box,Button,Container,Dialog,DialogTitle,DialogContent,DialogActions,FormControl,FormControlLabel,InputLabel,MenuItem,Select,TextField,Typography,Checkbox, Grid, FormHelperText,Modal} from "@mui/material";
import axios from "axios";
import Editicone from "../assets/icons/Editicone.png";
import Deleteicone from "../assets/icons/Deleteicone.png";
import "../styles/usersPage.css";
import UsersTable from "../components/UsersTable";
import UsersSearch from "../components/UsersSearch";
import {fetchAllUsers,fetchUsersByPage,updateUserAction} from "../features/user/userAction";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import { setPageSize, setPageNumber } from "../features/user/userSlice";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import UpdateUser from '../components/UpdateUser';
import { addUserAction } from "../features/user/userAction";
import { deleteUserAction } from "../features/user/userAction";



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
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
  },
  "&:active": {
    backgroundColor: "#234E9D",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)"
  }
};

const sharedDialogFieldStyles = {
  textAlign: "right",
  direction: "rtl",
  "& .MuiInputLabel-root": {
    right: "0",
    transformOrigin: "top right",
    left: "unset"
  },
  "& .MuiInputBase-root": {
    height: "43px"
  },
  "& .MuiInputBase-root .MuiSelect-select": {
    paddingRight: "32px !important",
    paddingLeft: "14px"
  },
  "& .MuiInputBase-root .MuiSelect-icon": {
    left: "12px",
    right: "unset"
  }
};

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const { users, status, error, pageNumber, pageSize, totalUsers } = useSelector((state) => state.user);
  const loggedInUser = useSelector((state) => state.auth?.loggedInUser || {});
  const dispatch = useDispatch();

  const [currentFilters, setCurrentFilters] = useState({
    name: "",
    phone: "",
    userTypeName: "",
    isActive: true
  });
  const { userTypes, status: userTypeStatus } = useSelector((state) => state.userType);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    userTypeName: "",
    isActive: true
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

  useEffect(() => {
    dispatch(fetchUsersByPage({ pageNumber, pageSize }));
  }, [pageNumber, pageSize, dispatch]);

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  const handleClearFilters = (initialStateFromSearch) => {
    setCurrentFilters(initialStateFromSearch);
  };

  const exportAllUsersToExcel = () => {
    if (!users || users.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
    workbook.Workbook = { Views: [{ RTL: true }] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });
    saveAs(blob, "users.xlsx");
  };

  const handleOpenDialog = () => {
    setFormValues({
      name: "",
      email: "",
      phone: "",
      password: "",
      userTypeName: "",
      isActive: true
    });
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "שם הוא שדה חובה";
        else if (value.length < 2) error = "שם חייב להכיל לפחות 2 תווים";
        break;
      case "email":
        if (!value.trim()) error = "אימייל הוא שדה חובה";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "אימייל לא תקין";
        break;
      case "phone":
        if (!value.trim()) error = "טלפון הוא שדה חובה";
        else if (!/^\d{10}$/.test(value)) error = "טלפון לא תקין (10 ספרות)";
        break;
      case "password":
        if (!value.trim()) error = "סיסמה היא שדה חובה";
        else if (value.length < 6) error = "סיסמה חייבת להכיל לפחות 6 תווים";
        break;
      case "userTypeId":
        case "userTypeName":
  if (!value) error = "יש לבחור הרשאה";
  break;
      default:
        break;
    }
    return error;
  };

 const handleFieldChange = (e) => {
  const { name, value } = e.target;

  setSelectedUser((prev) => ({ ...prev, [name]: value }));

  const error = validateField(name, value);
  setErrors((prev) => ({ ...prev, [name]: error }));
};


 const handleUpdateUser = async () => {
  const newErrors = {};
  let isValid = true;

  Object.entries(selectedUser).forEach(([key, value]) => {
    const error = validateField(key, value);
    if (error) {
      newErrors[key] = error;
      isValid = false;
    }
  });

  if (!isValid) {
    setErrors(newErrors);
    return;
  }

  // מציאת userTypeId לפי שם ההרשאה
  const userType = userTypes.find(t => t.name === selectedUser.userTypeName);
const userToSend = {
  userId: selectedUser.userId,
  name: selectedUser.name,
  email: selectedUser.email,
  phone: selectedUser.phone,
  userTypeId: userType?.userTypeId || 0,
  userTypeName: userType?.name || "", // ודא שיש שם
  isActive: selectedUser.isActive === true || selectedUser.isActive === "true",
  role: selectedUser.role || ""
};

// רק אם שונה הסיסמה, הוסף:
if (selectedUser.password?.trim()) {
  userToSend.password = selectedUser.password;
}




  try {
  console.log("📤 userToSend:", JSON.stringify(userToSend, null, 2));
  await dispatch(updateUserAction(userToSend)).unwrap();
  setOpen(false);
  dispatch(fetchUsersByPage({ pageNumber, pageSize }));
} catch (err) {
  console.error("❌ שגיאה בעדכון המשתמש:", err?.response?.data || err.message);
}

};




const handleFormChange = (e) => {
  const { name, value, type, checked } = e.target;
  const newValue = type === "checkbox" ? checked : value;

  setFormValues((prev) => ({ ...prev, [name]: newValue }));

  const error = validateField(name, newValue);
  setFormErrors((prev) => ({ ...prev, [name]: error }));
};

const handleSaveUser = async () => {
  const newErrors = {};
  let isValid = true;

  Object.entries(formValues).forEach(([key, value]) => {
    const error = validateField(key, value);
    if (error) {
      newErrors[key] = error;
      isValid = false;
    }
  });

  if (!isValid) {
    setFormErrors(newErrors);
    return;
  }

  const userType = userTypes.find(t => t.name === formValues.userTypeName);

const userToSend = {
  userId: selectedUser.userId,
  name: selectedUser.name,
  email: selectedUser.email,
  phone: selectedUser.phone,
  userTypeId: userType?.userTypeId || 0,
  userTypeName: userType?.name || "",
  isActive: selectedUser.isActive === true || selectedUser.isActive === "true",
  role: selectedUser.role || ""
};
  console.log("📝 יצירת משתמש חדש:", userToSend);

  try {
    await dispatch(addUserAction(userToSend)).unwrap(); // ✅ זה שולח לשרת!
    setDialogOpen(false);
    // רענון רשימת המשתמשים אם צריך:
    // await dispatch(fetchUsersByPage({ pageNumber, pageSize }));
  } catch (err) {
    console.error("❌ שגיאה בהוספת משתמש:", err);
  }
};



return (

  <>
   <Box className="tablesize">
          <Typography className="titleRow" variant="h4" component="h2">משתמשים</Typography>
          {error && <Box className="boxError">{error}</Box>}
          </Box>
    {/* דיאלוג הוספת משתמש */}
    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle sx={{ textAlign: "right", fontFamily: "Rubik", fontWeight: 700, fontSize: "24px", color: "#0D1783" }}>
        הוספת משתמש חדש
      </DialogTitle>

      <DialogContent sx={{ direction: "rtl", padding: "20px", display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.name}>
          <TextField name="name" label="שם" value={formValues.name} onChange={handleFormChange} fullWidth variant="standard" error={!!formErrors.name} />
          <FormHelperText>{formErrors.name}</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.email}>
          <TextField name="email" label="מייל" value={formValues.email} onChange={handleFormChange} fullWidth variant="standard" error={!!formErrors.email} />
          <FormHelperText>{formErrors.email}</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.phone}>
          <TextField name="phone" label="טלפון" value={formValues.phone} onChange={handleFormChange} fullWidth variant="standard" error={!!formErrors.phone} />
          <FormHelperText>{formErrors.phone}</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.password}>
          <TextField name="password" label="סיסמה" type="password" value={formValues.password} onChange={handleFormChange} fullWidth variant="standard" error={!!formErrors.password} />
          <FormHelperText>{formErrors.password}</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={sharedDialogFieldStyles} error={!!formErrors.userTypeName}>
          <TextField select label="הרשאה" name="userTypeName" value={formValues.userTypeName} onChange={handleFormChange} fullWidth variant="standard">
            <MenuItem value=""><em>בחר הרשאה</em></MenuItem>
            {userTypes.map((type) => (
              <MenuItem key={type.userTypeId} value={type.name}>{type.name}</MenuItem>
            ))}
          </TextField>
          <FormHelperText>{formErrors.userTypeName}</FormHelperText>
        </FormControl>

        <FormControl variant="standard" sx={{ ...sharedDialogFieldStyles, alignItems: 'flex-end' }}>
          <FormControlLabel
            control={
              <Checkbox
                name="isActive"
                checked={formValues.isActive}
                onChange={handleFormChange}
                color="primary"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
            }
            label="פעיל"
            labelPlacement="end"
            sx={{
              margin: 0,
              '& .MuiTypography-root': {
                fontFamily: "Rubik",
                fontSize: "16px",
                lineHeight: "18.96px",
                color: "#344054",
              },
              '& .MuiCheckbox-root': {
                padding: '0 8px 0 0',
              },
              flexDirection: 'row-reverse',
              marginLeft: 'auto',
            }}
          />
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
        <Button onClick={handleCloseDialog} variant="outlined">ביטול</Button>
        <Button onClick={handleSaveUser} variant="contained">שמור</Button>
      </DialogActions>
    </Dialog>

    {/* ייבוא טבלת משתמשים*/}
    <Container>
   <UsersTable
  onEditUser={(user) => {
    setSelectedUser(user);
    setOpen(true);
  }}
/>
    </Container>

    {/* ייבוא קומפוננטת  עריכת משתמש */}
    <UpdateUser
  open={open}
  setOpen={setOpen}
  selectedUser={selectedUser}
  setSelectedUser={setSelectedUser}
  handleFieldChange={handleFieldChange}
  handleUpdateUser={handleUpdateUser}
  errors={errors}
/>
  </>
  
);
};


export default UsersPage;