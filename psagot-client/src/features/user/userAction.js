import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from '../../utils/userUtil';

// פעולה להבאת כל המשתמשים
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  try {
    const users = await getAllUsers();  // מבצע קריאה ל-API
    return users;  // מחזיר את התוצאה
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
});

// פעולה להבאת משתמש לפי ID
export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) => {
  try {
    const user = await getUserById(id);  // מבצע קריאה ל-API
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user by id');
  }
});

// פעולה להוספת משתמש חדש
export const addUserAction = createAsyncThunk('user/addUser', async (newUser) => {
  try {
    console.log('User data being sent to the server:', newUser);
    const user = await addUser(newUser);  // מבצע קריאה ל-API
    return user;
  } catch (error) {
    throw new Error('Failed to add new user');
  }
});

// פעולה לעדכון משתמש
export const updateUserAction = createAsyncThunk('user/updateUser', async (updatedUser) => {
  try {
    const user = await updateUser(updatedUser);  // מבצע קריאה ל-API
    return user;
  } catch (error) {
    throw new Error('Failed to update user');
  }
});

// פעולה למחיקת משתמש
export const deleteUserAction = createAsyncThunk('user/deleteUser', async (id) => {
  try {
    const deletedUser = await deleteUser(id);  // מבצע קריאה ל-API
    return id;  // מחזיר את ה-ID של המשתמש שנמחק
  } catch (error) {
    throw new Error('Failed to delete user');
  }
});
