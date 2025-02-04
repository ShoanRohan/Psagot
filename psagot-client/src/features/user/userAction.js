import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, getUserById, addUser, updatedUser} from '../../utils/userUtil';

// פעולה להבאת כל המשתמשים
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  try {
    const users = await getAllUsers();  // מבצע קריאה ל-API
    return users;  // מחזיר את התוצאה
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) => {
  try {
    const user = await getUserById(id);  
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user by id');
  }
});

export const addUserAction = createAsyncThunk('user/addUser', async (newUser) => {
  try {
    console.log('User data being sent to the server:', newUser);
    const user = await addUser(newUser);  
    return user;
  } catch (error) {
    throw new Error('Failed to add new user');
  }
});

export const updateUserAction = createAsyncThunk('user/updateUser', async (updatedUser) => {
  try {
    const user = await updatedUser(updatedUser);  
    return user;
  } catch (error) {
    throw new Error('Failed to update user');
  }
});


