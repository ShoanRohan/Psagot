import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getUserById, updatedUser } from "../utils/userUtil";
import "../styles/editUser.css";

const EditUser = () => {
    const { id } = useParams(); // קבלת מזהה המשתמש מה-URL
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await getUserById(id);
            console.log(response)
            setUser(response);
        } catch (error) {
            setError("שגיאה בטעינת נתוני המשתמש");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await updatedUser(user)
            alert("המשתמש עודכן בהצלחה!");
            navigate("/users"); // חזרה לרשימת המשתמשים
        } catch (error) {
            setError("שגיאה בעדכון המשתמש");
        }
    };
    const handleCancel = () => {
        if (location.state?.from === 'users') {
            navigate('/users');
        } else {
            navigate('/'); // דף הבית
        }
    };

    if (loading) return <p>טוען נתונים...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>עריכת משתמש</h2>

            <label>קוד משתמש:</label>
            <input type="id" value={user?.userId} onChange={(e) => setUser({ ...user, userId: e.target.value })}className="input-place"   />

            <label>שם משתמש:</label>
            <input type="name" value={user?.name} onChange={(e) => setUser({ ...user, name: e.target.value })}   placeholder="שם"  className="input-place"   />

            <label>אימייל:</label>
            <input type="email" value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="input-place"  />

            <label>טלפון:</label>
            <input type="phone" value={user?.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} className="input-place"   />

            <label>סיסמא:</label>
            <input type="password" value={user?.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="input-place"  />

            <label> קוד סוג משתמש:</label>
            <input type="usertypeId" value={user?.userTypeId} onChange={(e) => setUser({ ...user, userTypeId: e.target.value })}className="input-place"   />

            <label>:סוג משתמש</label>
            <input type="userType" value={user?.userTypeName} onChange={(e) => setUser({ ...user, userTypeName: e.target.value })}className="input-place"   />

            <label>פעיל:</label>
            <input type="isActive?" value={user?.isActive} onChange={(e) => setUser({ ...user, isActive: e.target.value })}className="input-place"   />

            <label>תפקיד:</label>
            <input type="role" value={user?.role} onChange={(e) => setUser({ ...user, role: e.target.value })}className="input-place"   />

            {/* <label>הרשאה:</label>
            <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="User">משתמש</option>
                <option value="Admin">מנהל</option>
            </select> */}

            <button onClick={handleSave}>שמירה</button>
            <button onClick={handleCancel}>ביטול</button>
        </div>
    );
};

export default EditUser;