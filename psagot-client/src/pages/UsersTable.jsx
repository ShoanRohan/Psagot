import { useState, useEffect } from "react";
import { tableUsers } from "../utils/userUtil";
import { Grid, Typography,Box, Grid2, IconButton, Button } from '@mui/material';
import { DeleteOutline, SpaceBar } from "@mui/icons-material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await tableUsers();
            setUsers(usersData);
            setTotalUsers(usersData.length); // אם יש לך שדה אחר לספירה, עדכן בהתאם
        };
        fetchUsers();
    }, [page, pageSize]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleStatusChange = (userId, status) => {
    // כאן תוכל לעדכן את הסטטוס במצב שלך או לשלוח בקשה לשרת
    console.log(`User ID: ${userId}, New Status: ${status}`);
};

    return (
        <div>
            <h2>משתמשים</h2>
            <Box sx={{ width: 1496, height: 782,top:300,left:63,paddingtop:8,paddingRight:8,paddingLeft:8,gap:24}}>
            <table>
                {}
                <thead>
                    <tr>
                        <th>קוד משתמש</th>
                        <th>שם משתמש</th>
                        <th>מייל</th>
                        <th>הרשאה</th>
                        <th>סטטוס</th>
                        {/* <th>עריכה</th> */}
                    </tr>
                </thead> 
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={`${user?.UserId}-${index}`}>
                            <td>{user?.userId}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.userType}</td>
                            <td>
    {/* <select value={user?.IsActive ? "active" : "inactive"} onChange={(e) => handleStatusChange(user.userId, e.target.value)}>
        <option value="active">פעיל</option>
        <option value="inactive">לא פעיל</option>
    </select> */}
    <Button
        variant="contained"
        style={{
            borderRadius: '68.31px', // עיגול
            backgroundColor: user?.isActive ? '#DAF8E6' : '#E5E7EB', // צבע ירוק
            color:user?.isActive? '#1A8245':'#374151', // צבע טקסט
            
            width: '97px', // רוחב
            height: '39px', // גובה
            paddingTop: '4.1px', // רווח בין ה-select לכפתור
            paddingRight: '20.49px',
            paddingBottom: '4.1px',
            paddingLeft: '20.49px',
            gap: '1.37px'
        }}
        onClick={() => {
            const newStatus = user?.IsActive ? "inactive" : "active";
            handleStatusChange(user.userId, newStatus);
        }}
    >
        {user?.isActive ? "פעיל" : "לא פעיל"}
    </Button>
</td>          
                            <td>
                                {user.role === "Meneger" && (
                                    <button onClick={() => alert(`עריכת משתמש ${user.userId}`)}></button>
                                )}
                                <IconButton aria-label="delete" size="small" width='30px'height='34px' color="#F6F7F9">
                                    <DeleteOutline fontSize="inherit" />
                                  </IconButton>
                                  <IconButton aria-label="delete" size="small">
                                    <EditOutlinedIcon fontSize="inherit" />
                                  </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </Box>
            <Box sx={{ width: 1480, height: 58,borderRadius:8,paddingtop:16,paddingRight:24,paddingBottom:16,paddingLeft:24,gap:67,color:"white"}}>
                <div sx={{width:1432,height:26, justif:SpaceBar}}>
                <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>*</button>
                <span> עמוד {page} מתוך {Math.ceil(totalUsers / pageSize)}</span>
                <button disabled={page * pageSize >= totalUsers} onClick={() => handlePageChange(page + 1)}>*</button>
                </div>
                </Box>
            <div>
                <label>מספר שורות:</label>
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default UsersTable;
