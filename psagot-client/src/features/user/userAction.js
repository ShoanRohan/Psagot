import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getUserById, addUser, updatedUser ,getAllLecturersAndCoordinators,tableUsers} from "../../utils/userUtil";


export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const data = await getAllUsers();
    return data;
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) =>{
    const data = await getUserById(id);
    return data;
});

export const addUserAction = createAsyncThunk('user/addUserAction' , async(newUser)=>{
    const data = await addUser(newUser);
    return data;
}) ;
export const updateUserAction =createAsyncThunk('user/updateUserAction', async(updateUser)=>{
    const data = await updatedUser(updateUser);
    return data;
});

export const fetchAllLecturersAndCoordinators = createAsyncThunk('user/fetchAllLecturersAndCoordinators', async () => {
    const data = await getAllLecturersAndCoordinators();
    return data;
});

export const userTableAction =createAsyncThunk('user/userTableAction', async()=>{
    const data = await tableUsers();
    return data;
});
