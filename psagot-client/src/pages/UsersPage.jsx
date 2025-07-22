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
import { useDispatch, useSelector } from "react-redux";
import { setPageSize, setPageNumber } from '../features/user/userSlice';
import Editicone from '../assets/icons/Editicone.png';
import Deleteicone from '../assets/icons/Deleteicone.png';
import { Grid } from '@mui/material';

const UsersPage = () => {
  const { users, status, error, pageNumber, pageSize, totalUsers } = useSelector((state) => state.user);
 const loggedInUser = useSelector((state) => state.auth?.loggedInUser || {});
  const dispatch = useDispatch();

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
    <Box>
      <Box className="tablesize">
        <Typography className="titleRow" variant="h4" component="h2">משתמשים</Typography>
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
      </Box>

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
    </Box>
  );
};

export default UsersPage;
