// UserTable.jsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomTable from './CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../features/user/userAction';

const UserTable = ({ onEdit }) => {
  const [userToDelete, setUserToDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { users } = useSelector(state => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const columns = useMemo(() => [
    'שם', 'מייל', 'טלפון', 'סיסמה', 'הרשאה', 'סטטוס', 'עריכה', 'מחיקה'
  ], []);

  const keyMap = useMemo(() => ({
    'שם': 'name',
    'מייל': 'email',
    'טלפון': 'phone',
    'סיסמה': 'password',
    'הרשאה': 'role',
    'סטטוס': 'isActive',
    'מזהה': 'id'
  }), []);

  const renderStatusChip = useCallback((row) => (
    <Chip
      label={row.isActive ? 'פעיל' : 'לא פעיל'}
      color={row.isActive ? 'success' : 'default'}
      variant="outlined"
    />
  ), []);

  const renderEditButton = useCallback((row) => (
    <Tooltip title="עריכה">
      <IconButton onClick={() => onEdit?.(row)} size="small" sx={{ color: '#2D50E6' }}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  ), [onEdit]);

  const handleDelete = (user) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    setSnackbar({ open: true, message: 'המשתמש נמחק בהצלחה', severity: 'success' });
    setOpenDialog(false);
  };

  const renderDeleteButton = useCallback((row) => (
    <Tooltip title="מחיקה">
      <IconButton onClick={() => handleDelete(row)} size="small" sx={{ color: '#2D50E6' }}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  ), []);

  const columnConfig = useMemo(() => ({
    'סטטוס': { render: renderStatusChip },
    'עריכה': { render: renderEditButton },
    'מחיקה': { render: renderDeleteButton }
  }), [renderStatusChip, renderEditButton, renderDeleteButton]);

  return (
    <Paper elevation={3} sx={{ p: 3, direction: 'rtl', borderRadius: 3, bgcolor: '#f9fafb' }}>
      <Typography variant="h5" mb={2} sx={{ borderBottom: '2px solid #ccc', pb: 1 }}>טבלת משתמשים</Typography>

      <CustomTable columns={columns} data={users} keyMap={keyMap} columnConfig={columnConfig} />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>מחיקת משתמש</DialogTitle>
        <DialogContent>
          <Typography>האם אתה בטוח שברצונך למחוק את המשתמש "{userToDelete?.name}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>ביטול</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">מחק</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default UserTable;
