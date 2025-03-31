
import { tableUsers } from "../utils/userUtil";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem, FormControl, Select, FormHelperText} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DeleteOutline, Route, Router, RouterSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import '../styles/usersTable.css';
import { Pagination } from '@mui/material';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [error, setError] = useState(null); // לטיפול בשגיאות

    const handleChange = (event) => {
        const value = Number(event.target.value); // עדכון ל-`event`
        setPageSize(value); // עדכון `pageSize`
        setPage(value); // קריאה ל-`setPage`
    };



    // פונקציה לפיצול דפים
    const getUserByPage = (users, page, pageSize) => {
        const startIndex = (page - 1) * pageSize;
        return users.slice(startIndex, startIndex + pageSize);
    };

    // טוען את המשתמשים
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await tableUsers(); // קבלת כל המשתמשים
                const paginatedUsers = getUserByPage(usersData, page, pageSize); // חתוך את המידע לעמוד הנוכחי
                setUsers(paginatedUsers);
                setTotalUsers(usersData.length); // מספר כל המשתמשים
            } catch (error) {
                console.error("שגיאה בטעינת המשתמשים:", error);
                setError("הייתה שגיאה בטעינת המשתמשים. אנא נסה שנית.");
            }
        };
        fetchUsers();
    }, [page, pageSize]);

    // שינוי דף
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalUsers / pageSize)) {
            setPage(newPage);
        }
    };

    // שינוי סטטוס של משתמש
    const handleStatusChange = (userId, status) => {
        console.log(`User ID: ${userId}, New Status: ${status}`);
        // כאן תוכל לשלוח בקשה לשרת לעדכון סטטוס
    };

    return (
        <div>
            <Box sx={{ maxHeight:782,margin: "auto", paddingTop: 30,paddingRight:20,paddingBottom:10,paddingLeft:20 }}>
                <Typography variant="h4" component="h2">משתמשים</Typography>
                {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}  {/* הצגת הודעת שגיאה אם יש */}

                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table sx={{ Width: 3000 ,height:682 }} aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="tablecell" height={72}width={1442}>קוד משתמש</TableCell>
                                <TableCell className="tablecell">שם משתמש</TableCell>
                                <TableCell className="tablecell">מייל</TableCell> {/* יישור הכותרת למרכז */}
                                <TableCell className="tablecell">הרשאה</TableCell>
                                <TableCell className="tablecell">סטטוס</TableCell>
                                <TableCell className="tablecell">עריכה</TableCell>
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
                                    <TableCell sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' , height: '79px' }}>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => alert(`מחיקת משתמש ${user.userId}`)}
                                        >
                                            <DeleteOutline fontSize="inherit" />
                                        </IconButton>
                                        <IconButton
                                            aria-label="edit"
                                            size="small"
                                            onClick={() => alert(`עריכת משתמש ${user.userId}`)}
                                        >
                                            <EditOutlinedIcon fontSize="inherit" />
                                        </IconButton>
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
        <FormControl sx={{ minWidth: 49, height: 26 }}>
            <Select
                value={pageSize}
                onChange={handleChange}
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
        page={page} 
        onChange={handleChange} 
    />
</Box>
            </Box>
        </div>
    );
};

export default UsersTable;
