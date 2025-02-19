import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, MenuItem } from "@mui/material";
import "./UserModal.css"; 

const AddUserModal = ({ open, onClose }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    status: "פעיל",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Box className="modal-container">
        <DialogTitle>הוספת משתמש</DialogTitle>
        <DialogContent>
          <Box className="modal-content">
            <TextField label="שם" name="name" fullWidth onChange={handleChange} />
            <TextField label="אימייל" name="email" fullWidth onChange={handleChange} />
            <TextField label="טלפון" name="phone" fullWidth onChange={handleChange} />
            <TextField label="סיסמה" name="password" type="password" fullWidth onChange={handleChange} />
            <TextField select label="סטטוס" name="status" fullWidth onChange={handleChange} value={userData.status}>
              <MenuItem value="פעיל">פעיל</MenuItem>
              <MenuItem value="לא פעיל">לא פעיל</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <Box className="modal-actions">
          <Button variant="outlined" onClick={onClose}>
            ביטול
          </Button>
          <Button variant="contained" color="primary">
            שמור
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddUserModal;
