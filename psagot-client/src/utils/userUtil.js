import axios from 'axios';

// יצירת אובייקט axios עם baseURL המתאים
const api = axios.create({
  baseURL: 'https://localhost:44333/api', // כתובת ה-API שלך
  headers: {
    'Content-Type': 'application/json',
  },
});

// פעולה להבאת כל המשתמשים
const getAllUsers = async () => {
  const response = await api.get('/users');  // נתיב תקני לשירות GET להחזרת כל המשתמשים
  return response.data;  
};

// פעולה להבאת משתמש לפי ID
const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);  // נתיב לשירות GET למידע של משתמש לפי ID
  return response.data;
};

// פעולה להוספת משתמש חדש
const addUser = async (newUser) => {
    console.log('Sending user data to the server:', newUser);

    try {
        const response = await api.post('/User/AddUser', newUser);
        console.log('Response from server:', response.data);  // בדוק את הנתונים שהשרת מחזיר
        return response.data;
    } catch (error) {
        console.error('Error during POST request:', error.response ? error.response.data : error);
        throw error;
    }
};

  

// פעולה לעדכון משתמש
const updateUser = async (updatedUser) => {
  const response = await api.put(`/users/${updatedUser.id}`, updatedUser);  // נתיב לשירות PUT לעדכון משתמש
  return response.data;
};

// פעולה למחיקת משתמש
const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);  // נתיב לשירות DELETE למחיקת משתמש לפי ID
  return response.data;
};
// פונקציה למחיקת משתמש
const deletedUser = async (deleteUser) => {
    await api.delete('/User/DeleteUser', deleteUser);
};

export { getAllUsers, getUserById, addUser, updateUser, deleteUser };
export default api;
