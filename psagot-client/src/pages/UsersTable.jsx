
import { Box, Button, Typography, Paper, IconButton, MenuItem, FormControl, Select } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import '../styles/usersTable.css';
import { Pagination } from '@mui/material';
import { fetchUsersByPage } from "../features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { setPageSize, setPageNumber } from '../features/user/userSlice';
// import Editicone from '../assets/icons/Editicone.png';
// import Deleteicone from '../assets/icons/Deleteicone.png';
const UsersTable = () => {
    const { users, status, error, pageNumber, pageSize, totalUsers } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    // const handleChange = (event) => {
    //     const value = Number(event.target.value); // עדכון ל-`event`
    //     setPageNumber(value); // עדכון `pageSize`
    //     // setPage(value); // קריאה ל-`setPage`
    // };

    const handleChangePageSize = (event) => {
        const size = Number(event.target.value); // עדכון ל-`event`
        // setPageSize(value); // עדכון `pageSize`
        dispatch(setPageSize(size)); // קריאה ל-`setPage`
    };

        // שינוי דף
    const handlePageNumberChange = (newPage) => {
        console.log(newPage.target.value)
        console.log(newPage.target.textContent)
        newPage = Number(newPage.target.textContent);
        if (newPage >= 1 && newPage <= Math.ceil(totalUsers / pageSize)) {
            dispatch(setPageNumber(newPage));
        }
    };

    // // פונקציה לפיצול דפים
    // const getUserByPageNum = (users, page, pageSize) => {
    //     const startIndex = (page - 1) * pageSize;
    //     return users.slice(startIndex, startIndex + pageSize);
    // };

    // טוען את המשתמשים
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log("Fetching users with pageNumber:", pageNumber, "and pageSize:", pageSize);
                dispatch(fetchUsersByPage({ pageNumber, pageSize })); // קבלת כל המשתמשים

            } catch (error) {
                console.error("שגיאה בטעינת המשתמשים:", error);
            }
        };
        fetchUsers();
    }, [pageNumber, pageSize, dispatch]);



    // שינוי סטטוס של משתמש
    const handleStatusChange = (userId, status) => {
        console.log(`User ID: ${userId}, New Status: ${status}`);
        // כאן תוכל לשלוח בקשה לשרת לעדכון סטטוס
    };

//      useEffect(() => {
//     const handleScroll = () => {
//         if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) { // Adjust the threshold as needed
//             const nextPage = pageNumber + 1;
//             if (nextPage <= Math.ceil(totalUsers / pageSize)) {
//                 dispatch(setPageNumber(nextPage));
//             }
//         }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//         window.removeEventListener('scroll', handleScroll);
//     };
// }, [pageNumber, pageSize, totalUsers, dispatch]);

    return (
        <Box>
            <Box className="tablesize" >
                <Typography variant="h4" component="h2">משתמשים</Typography>
                {error && <Box style={{ color: "red", marginBottom: 16 }}>{error}</Box>}  {/* הצגת הודעת שגיאה אם יש */}

                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table sx={{ Width: 3000, height: 682 }} aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="bigtable" height={72} width={1442}>קוד משתמש</TableCell>
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
                                            style={{
                                                borderRadius: '20px',
                                                backgroundColor: user.isActive ? '#DAF8E6' : '#E5E7EB',
                                                color: user.isActive ? '#1A8245' : '#374151',
                                                width: '97px',
                                                height: '39px',
                                            }}
                                            onClick={() => {
                                                const newStatus = user.isActive ? "inactive" : "active";
                                                handleStatusChange(user.userId, newStatus);
                                            }}
                                        >
                                            {user.isActive ? "פעיל" : "לא פעיל"}
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', height: '55%' }}>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => alert(`מחיקת משתמש ${user.userId}`)}
                                        >
                                            <DeleteOutline fontSize="inherit" />
                                            {/* <Deleteicone /> */}
                                        </IconButton>
                                        <IconButton
                                            aria-label="edit"
                                            size="small"
                                            onClick={() => alert(`עריכת משתמש ${user.userId}`)}
                                        >
                                            {/* <Editicone /> */}
                                            <EditOutlinedIcon fontSize="inherit" />
                                        </IconButton>

                                        {/* <Box
            component="img"
            src={myImage}
            alt="Description of the image"
            sx={{ width: '100%', height: 'auto' }} // You can customize styles using sx prop
        /> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* ניווט עמודים */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <label style={{ marginRight: 4 }}>מספר שורות:</label>
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

export default UsersTable;
