
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
        newPage = Number(newPage.target.textContent);
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
            <Box className="tablesize" >
                <Typography className="titleRow" variant="h4" component="h2" >משתמשים</Typography>
                {error && <Box className="boxError">{error}</Box>}  {/* הצגת הודעת שגיאה אם יש */}
                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell className="bigtable">קוד משתמש</TableCell>
                                <TableCell className="bigtable">שם משתמש</TableCell>
                                <TableCell className="bigtable">מייל</TableCell> {/* יישור הכותרת למרכז */}
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
                        <FormControl sx={{ minWidth: '10px', height: '46px' }}>
                            <Select
                                value={pageSize}
                                onChange={handleChangePageSize}
                                displayEmpty
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
                        onChange={handlePageNumberChange}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default UsersPage;
