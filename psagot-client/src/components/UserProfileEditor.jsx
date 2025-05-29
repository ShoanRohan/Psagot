import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Tooltip,
  MenuItem,
  Grid,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function UserProfileEditor() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('ישראל');
  const [lastName, setLastName] = useState('כהן');
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [permission, setPermission] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    console.log({
      firstName,
      lastName,
      email,
      password,
      phone,
      status,
      permission,
    });
    handleClose();
  };

  return (
    <div>
      <Tooltip title="עריכת פרטים">
        <IconButton onClick={handleOpen} color="primary">
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm" // היה xs - שינינו ל-sm כדי להרחיב
        PaperProps={{
          sx: {
            borderRadius: 3,
            minHeight: 320,
          },
        }}
      >
        <DialogTitle
          dir="rtl"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 3,
            pt: 2,
          }}
        >
          <Box fontSize="1.1rem" fontWeight={600}>
            משתמשים
          </Box>
          <Box display="flex" gap={1}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ borderRadius: '20px', minWidth: '64px', height: '32px' }}
            >
              ביטול
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ borderRadius: '20px', minWidth: '64px', height: '32px' }}
            >
              שמור
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent dir="rtl" sx={{ px: 3, pb: 3 }}>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="שם פרטי"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="שם משפחה"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="אימייל"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="סיסמה"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="סטטוס"
                select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
                variant="standard"
              >
                <MenuItem value="active">פעיל</MenuItem>
                <MenuItem value="inactive">לא פעיל</MenuItem>
                <MenuItem value="pending">ממתין</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="הרשאה"
                select
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
                fullWidth
                variant="standard"
              >
                <MenuItem value="admin">מנהלת</MenuItem>
                <MenuItem value="editor">מרצה</MenuItem>
                <MenuItem value="viewer">סגנית</MenuItem>
                <MenuItem value="secretary">מזכירה</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
