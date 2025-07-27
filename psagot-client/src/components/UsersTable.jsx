// components/UsersTable.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Typography, Paper, IconButton, MenuItem, FormControl, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Snackbar, Pagination
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { deleteUserAction, fetchUsersByPage, updateUserAction } from '../features/user/userAction';
import { setPageNumber, setPageSize } from '../features/user/userSlice';
import Editicone from '../assets/icons/Editicone.png';
import Deleteicone from '../assets/icons/Deleteicone.png';
import '../styles/usersPage.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UsersTable = ({ onEditUser }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch = useDispatch();
  const { users, pageNumber, pageSize, totalUsers } = useSelector((state) => state.user);
  const { userTypes } = useSelector((state) => state.userType);

  const onPageSizeChange = (newSize) => dispatch(setPageSize(newSize));
  const onPageNumberChange = (newPage) => dispatch(setPageNumber(newPage));

  const handleToggleUserStatus = async (user) => {
    try {
      const userType = userTypes.find(t => t.name === user.userTypeName);
      const updatedUser = {
        ...user,
        isActive: !user.isActive,
        userTypeId: userType?.userTypeId || 0,
        userTypeName: userType?.name || '',
        role: user.role || '',
        password: user.password || '',
      };

      await dispatch(updateUserAction(updatedUser)).unwrap();
      dispatch(fetchUsersByPage({ pageNumber, pageSize }));
    } catch (error) {
      console.error('שגיאה בסטטוס:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      if (!window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש?')) return;
      await dispatch(deleteUserAction(userId)).unwrap();
      dispatch(fetchUsersByPage({ pageNumber, pageSize }));
      setSnackbarMessage('המשתמש נמחק בהצלחה');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(typeof err === 'string' ? err : 'שגיאה כללית במחיקה');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

    return (
    <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
      <TableContainer component={Paper} sx={{ maxHeight: '500px', overflow: 'auto', marginBottom: 2 }}>
        <Table stickyHeader className="customTable" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">קוד משתמש</TableCell>
              <TableCell align="right">שם משתמש</TableCell>
              <TableCell align="right">מייל</TableCell>
              <TableCell align="right">הרשאה</TableCell>
              <TableCell align="right">סטטוס</TableCell>
              <TableCell align="right">עריכה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={`${user.userId}-${index}`} className={index % 2 === 0 ? 'evenRow' : 'oddRow'}>
                {[user.userId, user.name, user.email, user.userTypeName].map((field, i) => (
                  <TableCell key={i} align="right" className="customTableCell">
                    {field}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <Button
                    variant="contained"
                    className={user.isActive ? 'buttonActive' : 'buttonInactive'}
                    onClick={() => handleToggleUserStatus(user)}
                  >
                    {user.isActive ? 'פעיל' : 'לא פעיל'}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Box className="flexCenter">
                    <IconButton onClick={() => handleDeleteUser(user.userId)}>
                      <img src={Deleteicone} alt="delete" className="iconImage" />
                    </IconButton>
                    <IconButton onClick={() => onEditUser(user)} disableRipple>
                      <img src={Editicone} alt="edit" className="iconImage" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="boxStyle">
        <Typography>מספר שורות:</Typography>
        <FormControl sx={{ minWidth: 80 }}>
          <Select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          count={Math.ceil(totalUsers / pageSize)}
          page={pageNumber}
          onChange={(e, newPage) => onPageNumberChange(newPage)}
        />
      </Box>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          top: '50% !important',
          transform: 'translateY(-50%)',
          '& .MuiPaper-root': {
            minWidth: '500px',
            fontSize: '20px',
            padding: '20px',
            textAlign: 'center',
          },
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            fontSize: '18px',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersTable;
