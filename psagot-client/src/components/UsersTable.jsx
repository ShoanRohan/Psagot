import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Typography, Paper, IconButton, MenuItem, FormControl, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Snackbar, Pagination, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { deleteUserAction, fetchUserById, fetchUsersByPage, updateUserAction } from '../features/user/userAction';
import { setPageNumber, setPageSize } from '../features/user/userSlice';
import Editicone from '../assets/icons/Editicone.png';
import Deleteicone from '../assets/icons/Deleteicone.png';
import '../styles/usersPage.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UsersTable = ({ setOpen }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const handleDeleteConfirmation = async () => {
    try {
      await dispatch(deleteUserAction(userToDelete)).unwrap();
      dispatch(fetchUsersByPage({ pageNumber, pageSize }));
      setSnackbarMessage('המשתמש נמחק בהצלחה');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(typeof err === 'string' ? err : 'שגיאה כללית במחיקה');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleEditUser = async (user) => {
    dispatch(fetchUserById(user.userId));
    setOpen(true);
  };

  return (
    <Box className="tableWrapper">
      <TableContainer
        component={Paper}
        className="tableContainer"
        sx={{ paddingLeft: '12px',  maxHeight: 500 }}
      >
        <Table className="customTable" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right" className="customTableCell">שם משתמש</TableCell>
              <TableCell align="right" className="customTableCell">מייל</TableCell>
              <TableCell align="right" className="customTableCell">טלפון</TableCell>
              <TableCell align="right" className="customTableCell">הרשאה</TableCell>
              <TableCell align="right" className="customTableCell">סטטוס</TableCell>
              <TableCell align="right" className="customTableCell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={`${user.userId}-${index}`} className={index % 2 === 0 ? 'evenRow' : 'oddRow'}>
                {[user.name, user.email, user.phone, user.userTypeName].map((field, i) => (
                  <TableCell key={i} align="right" className="customTableCell">
                    {field}
                  </TableCell>
                ))}
                <TableCell align="right" className="customTableCell">
                  <Button
                    variant="contained"
                    className={user.isActive ? 'buttonActive' : 'buttonInactive'}
                    onClick={() => handleToggleUserStatus(user)}
                  >
                    {user.isActive ? 'פעיל' : 'לא פעיל'}
                  </Button>
                </TableCell>
                <TableCell align="right" className="customTableCell">
                  <Box className="flexCenter">
                    <IconButton onClick={() => handleDeleteUser(user.userId)}>
                      <img src={Deleteicone} alt="delete" className="iconImage" />
                    </IconButton>
                    <IconButton onClick={() => handleEditUser(user)} disableRipple>
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography>מספר שורות:</Typography>
          <FormControl sx={{ minWidth: 60 }}>
            <Select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              size="small"
              sx={{
                fontSize: '12px',
                height: '28px',
                '.MuiSelect-select': {
                  padding: '4px 8px',
                  minHeight: 'unset',
                },
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>

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
        sx={{top: '50% !important',transform: 'translateY(-50%)','& .MuiPaper-root': {minWidth: '500px', fontSize: '20px',padding: '20px',textAlign: 'center',},
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{width: '100%',fontSize: '18px',fontWeight: 'bold',justifyContent: 'center',alignItems: 'center',}}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{fontSize: '28px',fontWeight: 'bold',textAlign: 'center',paddingTop: '30px',}}>
          מחיקת משתמש
        </DialogTitle>
        <DialogContent
          sx={{textAlign: 'center',fontSize: '20px',padding: '40px 24px',}}>
          האם אתה בטוח שברצונך למחוק את המשתמש?
        </DialogContent>
        <DialogActions sx={{justifyContent: 'center',gap: 2,paddingBottom: '30px',}}>
          <Button onClick={handleDeleteConfirmation} variant="contained" color="error" size="large">
            אישור
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" size="large">
            ביטול
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersTable;

