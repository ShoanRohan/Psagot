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
  Alert,
  Pagination,
  PaginationItem,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomTable from './CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem } from '@mui/material'
import { fetchUsersWithPagination } from '../features/user/userAction';



const UserTable = ({ onEdit }) => {
  const [userToDelete, setUserToDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
 const [rowsPerPage, setRowsPerPage] = useState(10);


  const dispatch = useDispatch();
  const { users ,total} = useSelector(state => state.user);

  useEffect(() => {
    dispatch( fetchUsersWithPagination({page:currentPage, rows:rowsPerPage}));
  }, [dispatch]);

const [anchorEl, setAnchorEl] = useState(null);
const openMenu = Boolean(anchorEl);

const handleOpenMenu = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleCloseMenu = () => {
  setAnchorEl(null);
};

const handleSelectRowsPerPage = (value) => {
  setRowsPerPage(value);
  console.log(value);
  
  setCurrentPage(1); // תחזור לעמוד הראשון אחרי שינוי
  handleCloseMenu();
  dispatch(fetchUsersWithPagination({page:currentPage,rows:value}));
};


const handleChangePage = (value) => {

  setCurrentPage(value); // תחזור לעמוד הראשון אחרי שינוי
  handleCloseMenu();
  dispatch(fetchUsersWithPagination({page:value,rows:rowsPerPage}));
};
  const totalPages=Math.ceil(total/rowsPerPage)

  const columns = useMemo(() => [
    'שם', 'מייל', 'טלפון', 'סיסמה', 'הרשאה', 'סטטוס', 'עריכה', 'מחיקה'
  ], []);

  const keyMap = useMemo(() => ({
    'שם': 'name',
    'מייל': 'email',
    'טלפון': 'phone',
    'סיסמה': 'password',
    'הרשאה': 'userTypeName',
    'סטטוס': 'isActive',
    'מזהה': 'userId',
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
      <Typography variant="h5" mb={2} sx={{ borderBottom: '2px solid #ccc', pb: 1 }}>
        טבלת משתמשים
      </Typography>

      <CustomTable
        columns={columns}
        data={users}
        keyMap={keyMap}
        columnConfig={columnConfig}
      />

     <Paper
  elevation={0}
  sx={{
    mt: 4,
    p: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    bgcolor: '#f9fafb',
  }}
>
  {/* מספר שורות - ימין */}
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <Typography sx={{ fontSize: 14, color: 'gray' }}>
    מספר שורות:
  </Typography>
  <Box
  onClick={handleOpenMenu}
  sx={{
    border: '1px solid #ccc',
    borderRadius: 2,
    px: 1.5,
    py: 0.5,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  }}
>
  {/* חיצים מימין */}
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 1 }}>
    <ArrowDropUpIcon fontSize="small" />
    <ArrowDropDownIcon fontSize="small" />
  </Box>

  {/* מספר שורות */}
  <Typography sx={{ fontSize: 14 }}>{rowsPerPage}</Typography>
</Box>



  <Menu
    anchorEl={anchorEl}
    open={openMenu}
    onClose={handleCloseMenu}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
  >
    {[10, 20, 50].map((value) => (
      <MenuItem
        key={value}
        selected={rowsPerPage === value}
        onClick={() => handleSelectRowsPerPage(value)}
      >
        {value}
      </MenuItem>
    ))}
  </Menu>
</Box>



  {/* פגינציה עם מספרים וחיצים - שמאל */}
  <Pagination
    count={totalPages}
    page={currentPage}
    onChange={(event, page) => handleChangePage(page)}
    siblingCount={1}
    boundaryCount={1}
    renderItem={(item) => (
      <PaginationItem
        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
        {...item}
      />
    )}
    sx={{ direction: 'ltr' }}
  />
</Paper>


      {/* דיאלוג ומודעות */}
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

