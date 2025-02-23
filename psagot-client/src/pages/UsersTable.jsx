import { useState, useEffect } from "react";
import { tableUsers } from "../utils/userUtil";

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
            <table>
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
                         <select value={user?.IsActive ? "active" : "inactive"} onChange={(e) => handleStatusChange(user.userId, e.target.value)}>
                    <option value="active">פעיל</option>
                    <option value="inactive">לא פעיל</option>
                     </select>
                          </td>
                            
                            <td>
                                {user.role === "Admin" && (
                                    <button onClick={() => alert(`עריכת משתמש ${user.userId}`)}>✏️</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>הקודם</button>
                <span> עמוד {page} מתוך {Math.ceil(totalUsers / pageSize)}</span>
                <button disabled={page * pageSize >= totalUsers} onClick={() => handlePageChange(page + 1)}>הבא</button>
            </div>
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
