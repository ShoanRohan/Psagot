import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, getUserById, addUser, updatedUser } from '../../utils/userUtil';

// פעולה להבאת כל המשתמשים
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const response = await fetch('/api/users'); 
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return data.users;  
});

// פעולה להבאת משתמש לפי ID
export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) => {
    const data = await getUserById(id);
    return data;
});

// פעולה להוספת משתמש חדש
export const addUserAction = createAsyncThunk('user/addUser', async (newUser) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data;
});

// פעולה לעדכון משתמש
export const updateUserAction = createAsyncThunk('user/updateUser', async (updatedUser) => {
    const response = await fetch(`/api/users/${updatedUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data;
});

// פעולה למחיקת משתמש
export const deleteUserAction = createAsyncThunk('user/deleteUser', async (id) => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return id; // מחזיר את ה-ID של המשתמש שנמחק
    }
    throw new Error('Failed to delete user');
});
