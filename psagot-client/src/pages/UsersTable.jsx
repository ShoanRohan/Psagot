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

    return (
        <div>
            <h2>רשימת משתמשים</h2>
            <table>
                <thead>
                    <tr>
                        <th>קוד משתמש</th>
                        <th>שם משתמש</th>
                        <th>מייל</th>
                        <th>רמת הרשאה</th>
                        <th>פעיל</th>
                        <th>עריכה</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user?.UserId}>
                            <td>{user?.UserId}</td>
                            <td>{user?.Name}</td>
                            <td>{user?.Email}</td>
                            <td>{user?.Role}</td>
                            <td>{user?.IsActive ? "✅" : "❌"}</td>
                            <td>
                                {user.Role === "Admin" && (
                                    <button onClick={() => alert(`עריכת משתמש ${user.UserId}`)}>✏️</button>
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
                <label>שורות לעמוד:</label>
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
