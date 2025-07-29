
import React, { useEffect, useState } from 'react';
import {Modal, Box, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersByPage, updateUserAction } from '../features/user/userAction';
import { setSelectUser } from '../features/user/userSlice';

const UpdateUser = ({
  open,
  setOpen,
}) => {
    const [selectedUser, setSelectedUser] = useState(null);  //המשתמש שנבחר לעריכה
    const { userTypes, status: userTypeStatus } = useSelector((state) => state.userType);
    const{selectUser,pageNumber,pageSize}= useSelector(state=> state.user)
    const [errors, setErrors] = useState({});  //אובייקט שמכיל שגיאות בטופס
   const dispatch = useDispatch(); // יוזם שליחת פעולות ל־Redux
   useEffect(()=> {
   if (selectUser )
      setSelectedUser(selectUser)
      console.log("selectuser",selectUser);
   },[dispatch,selectUser])

      const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : Number(value),
    }));
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
  const cleanedPhone = value.replace(/[-\s]/g, ""); // מסיר רווחים ומקפים
  if (!cleanedPhone) error = "טלפון הוא שדה חובה";
  else if (!/^\d{10}$/.test(cleanedPhone)) error = "טלפון לא תקין (10 ספרות בלבד)";
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
 console.log(selectUser.password);
// רק אם שונה הסיסמה, הוסף:
if (selectedUser.password?.trim()) {
  userToSend.password = selectUser.password;
}
  dispatch(setSelectUser(null)) 
  try {
  console.log("📤 userToSend:", JSON.stringify(userToSend, null, 2));
  await dispatch(updateUserAction(userToSend)).unwrap();
  setOpen(false);
  dispatch(fetchUsersByPage({ pageNumber, pageSize }));
} catch (err) {
  console.error("❌ שגיאה בעדכון המשתמש:", err?.response?.data || err.message);
}

};

console.log(selectedUser)
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={{
        p: 4, bgcolor: 'white', borderRadius: 2, maxWidth: '900px',
        width: '95%', mx: 'auto', my: '5vh', direction: 'rtl'
      }}>
        {selectedUser && (
          <>
            <Typography variant="h6" mb={3} textAlign="center">עריכת משתמש</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField label="שם" name="name" value={selectedUser.name} onChange={handleFieldChange}
                  error={!!errors.name} helperText={errors.name} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="אימייל" name="email" value={selectedUser.email} onChange={handleFieldChange}
                  error={!!errors.email} helperText={errors.email} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="טלפון" name="phone" value={selectedUser.phone} onChange={handleFieldChange}
                  error={!!errors.phone} helperText={errors.phone} fullWidth />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
                <TextField label="סיסמה" name="password" type="password" value={selectedUser.password}
                  onChange={handleFieldChange} error={!!errors.password} helperText={errors.password} fullWidth />
              </Grid> */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth error={!!errors.userTypeId}>
                  <InputLabel>הרשאה</InputLabel>
                  <Select name="userTypeName" value={selectedUser.userTypeName || ""} onChange={handleFieldChange}>
  {userTypes.map((type) => (
<MenuItem key={type.userTypeId} value={type.name}>
  {type.name}
</MenuItem>

  ))}
</Select>
                  <FormHelperText>{errors.userTypeId}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>סטטוס</InputLabel>
                  <Select
                    name="isActive"
                    value={selectedUser.isActive ? "true" : "false"}
                    onChange={handleSelectChange}>
                    <MenuItem value="true">פעיל</MenuItem>
                    <MenuItem value="false">לא פעיל</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={4} display="flex" gap={2} justifyContent="center">
              <Button variant="contained" onClick={handleUpdateUser}>שמור</Button>
              <Button variant="outlined" onClick={() => setOpen(false)}>ביטול</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UpdateUser;
