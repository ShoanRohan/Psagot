import { useState, useEffect } from "react";
import { getUserByPage, tableUsers } from "../utils/userUtil";
import { Grid, Typography,Box, Grid2, IconButton, Button } from '@mui/material';
import { DeleteOutline, SpaceBar } from "@mui/icons-material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';


const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const navigate = useNavigate();       

    const getUserByPage = (users, page, pageSize) => {
        const startIndex = (page - 1) * pageSize;
        return users.slice(startIndex, startIndex + pageSize);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await tableUsers(); // קבלת כל המשתמשים
            const paginatedUsers = getUserByPage(usersData, page, pageSize); // חתוך את המידע לעמוד הנוכחי
            setUsers(paginatedUsers);
            setTotalUsers(usersData.length); // מספר כל המשתמשים
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
            <Box className="box-size">
            <table className="table">
                <thead className="th">
                    <tr className="coulm"> 
                        <th >קוד משתמש</th>
                        <th >שם משתמש</th>
                        <th >מייל</th>
                        <th >הרשאה</th>
                        <th>סטטוס</th>
                        {/* <th>עריכה</th> */}
                    </tr>
                </thead> 
                <tbody className="th">
                    {users?.map((user, index) => (
                        <tr key={`${user?.UserId}-${index}`} >
                            <td className="td">{user?.userId}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.userType}</td>
                            <td>
    
    <Button
        variant="contained" className="isActive-button"
        style={{
            borderRadius: '68.31px', 
            backgroundColor: user?.isActive ? '#DAF8E6' : '#E5E7EB',
            color:user?.isActive? '#1A8245':'#374151', 
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
                                <IconButton aria-label="delete" className="delete-Button">
                                    <DeleteOutline fontSize="inherit" />
                                  </IconButton>
                                  <IconButton aria-label="edit" size="small" onClick={() => navigate(`/EditUser/${user?.userId}`)} >
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
