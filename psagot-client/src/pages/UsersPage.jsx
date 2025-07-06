import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByPage } from "../features/user/userAction";
import { setPageSize, setPageNumber } from '../features/user/userSlice';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import Editicone from '../assets/icons/Editicone.png';
import Deleteicone from '../assets/icons/Deleteicone.png';
import { StyledTableCell } from '../styles/MeetingsTableStyle';
import ExportToExcel from '../components/ExportToExcel';
import '../styles/usersPage.css';

const UsersPage = () => {
  const { users, status, error, pageNumber, pageSize, totalUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openAddPopup, setOpenAddPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersByPage({ pageNumber, pageSize }));
  }, [pageNumber, pageSize, dispatch]);

  const handleChangePageSize = (event) => {
    dispatch(setPageSize(Number(event.target.value)));
  };

  const handlePageNumberChange = (event, newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalUsers / pageSize)) {
      dispatch(setPageNumber(newPage));
    }
  };

  const handleStatusChange = (userId, status) => {
    const newStatus = status ? "inactive" : "active";
    // עדכון סטטוס לפי הצורך
  };

  const handleAddUser = () => {
    setOpenAddPopup(true);
    // להפעיל פופאפ של הוספת משתמש אם קיים
  };

  return (
    <Box>
      <Box className="tablesize" sx={{ overflowY: "auto" }}>
        
        {/* כפתורי אקשן עליונים */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 2 }}>
          {/* כפתור ייצוא לאקסל */}
          <ExportToExcel data={users} fileName="Users.xlsx" sheetName="משתמשים" />

          {/* כפתור הוספת משתמש עם פלוס לפני המילה */}
          <Button
            variant="contained"
            onClick={handleAddUser}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0px 24px',
              width: '171px',
              height: '44px',
              backgroundColor: '#326DEF',
              borderRadius: '50px',
              color: '#FFFFFF',
              fontFamily: 'Rubik, sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              textAlign: 'center',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#295BCC',
                boxShadow: 'none'
              },
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: '1.5px solid white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              +
            </Box>
            הוספת משתמש
          </Button>
        </Box>

        {/* כותרת */}
        <Typography
          variant="h1"
          align="right"
          sx={{
            fontFamily: "Rubik, sans-serif",
            fontWeight: 700,
            fontSize: "40px",
            color: "#0D1783",
            mb: 2,
          }}
        >
          משתמשים
        </Typography>

        {/* טבלת משתמשים */}
        <TableContainer component={Paper} sx={{ marginBottom: 2, maxHeight: '700px', overflowY: 'auto' }}>
          <Table sx={{ width: '100%', tableLayout: 'auto' }} aria-label="users table">
            <TableHead>
              <TableRow>
                {[
                  'קוד משתמש', 'שם משתמש', 'מייל', 'הרשאה',
                  'סטטוס', 'עריכה', ''
                ].map((header, i) => (
                  <StyledTableCell key={i} align="center" sx={{ whiteSpace: 'nowrap', px: 1 }}>
                    {header}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, index) => (
                <TableRow key={`${user.userId}-${index}`}>
                  <TableCell align="center">{user.userId}</TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.userTypeName}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      className={user.isActive ? 'buttonActive' : 'buttonInactive'}
                      onClick={() => handleStatusChange(user.userId, user.isActive)}
                    >
                      {user.isActive ? "פעיל" : "לא פעיל"}
                    </Button>
                  </TableCell>
                  <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton onClick={() => alert(`מחיקת משתמש ${user.userId}`)}>
                      <img src={Deleteicone} alt="delete" className='deleteIcon' />
                    </IconButton>
                    <IconButton onClick={() => alert(`עריכת משתמש ${user.userId}`)}>
                      <img src={Editicone} alt="edit" className='editIcon' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* פוטר עם פאגינציה ובחירת מספר שורות */}
        <Box className="boxStyle" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography className='flexCenter'>מספר שורות:</Typography>
            <Select
              IconComponent={(props) => <UnfoldMoreOutlinedIcon {...props} sx={{ fontSize: 'small' }} />}
              displayEmpty
              onChange={handleChangePageSize}
              value={pageSize}
              sx={{
                height: '26px',
                width: '49px',
                borderRadius: '10px',
                borderWidth: '0.5px',
                borderColor: '#F0F1F3',
                pl: 0,
                pr: 0,
                fontSize: '12px',
                ml: '8px',
                textAlign: 'center',
                '& .MuiSelect-select': {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Box>

          <Pagination
            count={Math.ceil(totalUsers / pageSize)}
            page={pageNumber}
            onChange={handlePageNumberChange}
            sx={{
              direction: 'ltr',
              ml: 2,
              '& .MuiPaginationItem-root': { fontSize: 12 },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UsersPage;
