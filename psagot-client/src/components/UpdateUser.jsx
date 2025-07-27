// components/UpdateUser.jsx
import React from 'react';
import {Modal, Box, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Butto} from '@mui/material';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const UpdateUser = ({
  open,
  setOpen,
  selectedUser,
  setSelectedUser,
  handleFieldChange,
  handleUpdateUser,
  errors
}) => {
    const { userTypes, status: userTypeStatus } = useSelector((state) => state.userType);

      const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : Number(value),
    }));
  };
  
console.log(selectedUser);
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
              <Grid item xs={12} sm={4}>
                <TextField label="סיסמה" name="password" type="password" value={selectedUser.password}
                  onChange={handleFieldChange} error={!!errors.password} helperText={errors.password} fullWidth />
              </Grid>
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
