import { useState, useEffect } from "react";
import axios from "axios";

const UsersTableUtil = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, [page, pageSize]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:44333/api/users/paged?page=${page}&pageSize=${pageSize}`);
            setUsers(response.data.users);
            setTotalUsers(response.data.total);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

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
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.isActive ? "✅" : "❌"}</td>
                            <td>
                                {user.role === "Admin" && (
                                    <button onClick={() => alert(`עריכת משתמש ${user.id}`)}>✏️</button>
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

export default UsersTableUtil;