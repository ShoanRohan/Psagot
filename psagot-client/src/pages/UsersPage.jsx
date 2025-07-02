
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
import { useEffect } from "react";
import '../styles/usersPage.css';
import { Pagination } from '@mui/material';
import { fetchUsersByPage } from "../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { setPageSize, setPageNumber } from '../features/user/userSlice';
import Editicone from '../assets/icons/Editicone.png';
import Deleteicone from '../assets/icons/Deleteicone.png';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import { StyledTableCell } from '../styles/MeetingsTableStyle';

const UsersPage = () => {
    const { users, status, error, pageNumber, pageSize, totalUsers } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    // טוען את המשתמשים
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                dispatch(fetchUsersByPage({ pageNumber, pageSize })); // קבלת כל המשתמשים
            } catch (error) {
                console.error("שגיאה בטעינת המשתמשים:", error);
            }
        };
        fetchUsers();
    }, [pageNumber, pageSize, dispatch]);

    const handleChangePageSize = (event) => {
        const size = Number(event.target.value); // עדכון ל-`event`
        dispatch(setPageSize(size)); // קריאה ל-`setPage`
    };

    // שינוי דף
const handlePageNumberChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalUsers / pageSize)) {
        dispatch(setPageNumber(newPage));
    }
};

    // שינוי סטטוס של משתמש
    const handleStatusChange = (userId, status) => {
        const newStatus = status ? "inactive" : "active";
        // כאן תוכל לשלוח בקשה לשרת לעדכון סטטוס
    };

    return (
        <Box>
         <Box className="tablesize" sx={{overflowY:"auto"}} >
        <Typography
          variant="h1"
          align="right"
          sx={{
            fontFamily: "Rubik, sans-serif",
            fontWeight: 700,
            fontSize: "40px",
            color: "#0D1783",
          }}
        >
            משתמשים
        </Typography>                {error && <Box className="boxError">{error}</Box>}  {/* הצגת הודעת שגיאה אם יש */}
                <TableContainer component={Paper} sx={{ marginBottom: 2, maxHeight: '700px', overflowY: 'auto' }}>
                        <Table sx={{ width: '100%', tableLayout: 'auto' }} aria-label="courses table">
                                  <TableHead>
                                    <TableRow>
                                      {[
                                        'קוד משתמש', 'שם משתמש', 'מייל', 'הרשאה',
                                        'סטטוס', 'עריכה', ''
                                      ].map((header, i) => (
                                        <StyledTableCell
                                          key={i}
                                          align="center"
                                          sx={{ whiteSpace: 'nowrap', px: 1 }}
                                        >
                                          {header}
                                        </StyledTableCell>
                                      ))}
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
                                            onClick={() => {
                                                handleStatusChange(user.userId, user.isActive);
                                            }}
                                        >
                                            {user.isActive ? "פעיל" : "לא פעיל"}
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', height: '70%' }}>
                                        <IconButton
                                            onClick={() => alert(`מחיקת משתמש ${user.userId}`)}
                                        >
                                            <img src={Deleteicone} alt="delelte" className='deleteIcon' />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => alert(`עריכת משתמש ${user.userId}`)}>
                                            <img src={Editicone} alt="edit" className='editIcon' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* ניווט עמודים */}
                <Box className="boxStyle">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography className='flexCenter'>
                            מספר שורות:
                        </Typography>
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
