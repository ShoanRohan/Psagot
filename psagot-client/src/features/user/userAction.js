import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, getUserById, addUser, updatedUser, deletedUser } from '../../utils/userUtil';

// פעולה להבאת כל המשתמשים
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const data = await getAllUsers();
    return data;
});

// פעולה להבאת משתמש לפי ID
export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) => {
    const data = await getUserById(id);
    return data;
});

// פעולה להוספת משתמש חדש
export const addUserAction = createAsyncThunk('user/addUserAction', async (newUser) => {
    const data = await addUser(newUser);
    return data;
});

export const deleteUserAction = createAsyncThunk('user/deleteUserAction', async (id) => {
    await deletedUser(`/User/DeleteUser/${id}`);
    return id;
  });

// פעולה לעדכון משתמש קיים
export const updateUserAction = createAsyncThunk('user/updateUserAction', async (updateUser) => {
    const data = await updatedUser(updateUser);
    return data;
});
