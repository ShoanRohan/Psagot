
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import *as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {  fetchAllUsers, fetchFilteredUseres, fetchUsersByPage, updateUserAction } from "../features/user/userAction";
import UsersSearch from '../components/UsersSearch';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import UsersTable from "../components/UsersTable";
import UpdateUser from '../components/UpdateUser';
import AddUser from "../components/AddUser";
import excelIcon from "../assets/icons/excelIcon.svg"
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

  // useEffect(() => {
  //   dispatch(fetchAllUsers(currentFilters));
  // }, [dispatch, currentFilters]);

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
        dispatch(fetchFilteredUseres(filters));
        console.log("Filters applied in UsersPage:", filters);
    };

    const handleClearFilters = (initialStateFromSearch) => {
        setCurrentFilters(initialStateFromSearch);
      console.log("Filters cleared in UsersPage.");
    };

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





    return (
        <Container maxWidth={false} sx={{ width: "80vw", mx: "auto", px: 2, pt: 3, pb: 3, overflowY: "unset" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, direction: "rtl" }}>
              {/* שינוי כאן: גודל גופן והזחה שמאלה כמו בצילום מסך */}
              <Typography variant="h4" sx={{ fontFamily: "Rubik, sans-serif", fontWeight: 700, fontSize: "30px", color: "#0D1783" }}>
                  משתמשים
              </Typography>
                <Stack direction="row" spacing={2} sx={{ direction: "ltr" }}>
                    <AddUser />
                    <IconButton onClick={exportAllUsersToExcel} sx={{ height: "44px", width: "44px" }}>
                      <Box component="img" src={excelIcon} alt="ייצוא לאקסל" sx={{ height: "24px", width: "24px", mt: "-4px" }} />
                    </IconButton>
                  </Stack>
            </Box>

              <UsersSearch onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
               <Container>
   <UsersTable
  onEditUser={(user) => {
    console.log(user);
    setSelectedUser(user);
    setOpen(true);
  }}
/>
    </Container>

              {/* <AddUser/> */}
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
        </Container>
    );
};


export default UsersPage;