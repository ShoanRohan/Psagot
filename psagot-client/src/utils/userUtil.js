import api from './api';  // נניח שיש לך את קובץ ה-axios api שהגדרת

// פונקציה להביא את כל המשתמשים
const getAllUsers = async () => {
    const response = await api.get('/User/GetAllUsers');
    return response.data;
};

// פונקציה להביא משתמש לפי ID
const getUserById = async (id) => {
    const response = await api.get(`/User/GetUserById/${id}`);
    return response.data;
};

// פונקציה להוסיף משתמש חדש
const addUser = async (newUser) => {
    const response = await api.post('/User/AddUser', newUser);
    return response.data;
};

// פונקציה לעדכון משתמש קיים
const updatedUser = async (updateUser) => {
    const response = await api.put('/User/UpdateUser', updateUser);
    return response.data;
};
// פונקציה למחיקת משתמש
const deletedUser = async (deleteUser) => {
    await api.delete('/User/DeleteUser', deleteUser);
};

export { getAllUsers, getUserById, addUser, updatedUser, deletedUser };