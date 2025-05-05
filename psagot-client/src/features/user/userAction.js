import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getAllCoordinators, getUserById, addUser, updatedUser, getCoordinators, getAllLecturersAndCoordinators, login } from "../../utils/userUtil";

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const data = await getAllUsers();
    return data;
});

export const fetchAllCoordinators = createAsyncThunk('user/fetchAllCoordinators', async () => {
    const data = await getAllCoordinators();
    return data;
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) =>{
    const data = await getUserById(id);
    return data;
});

export const addUserAction = createAsyncThunk('user/addUserAction' , async(newUser)=>{
    const data = await addUser(newUser);
    return data;
});

export const updateUserAction =createAsyncThunk('user/updateUserAction', async(updateUser)=>{
    const data = await updatedUser(updateUser);
    return data;
});
export const loginAction = createAsyncThunc('user/login', async(loginUser)=>{
    const data = await login(loginUser);
    return data;
})

export const fetchCoordinators = createAsyncThunk("user/fetchCoordinators", async () => {
        const data = await getCoordinators();
        return data;
});

export const fetchAllLecturersAndCoordinators = createAsyncThunk('user/fetchAllLecturersAndCoordinators', async () => {
    const data = await getAllLecturersAndCoordinators();
    return data;
});