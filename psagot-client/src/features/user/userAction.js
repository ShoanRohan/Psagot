import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getUserById, addUser, updatedUser, getCoordinators } from "../../utils/userUtil";


export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const data = await getAllUsers();
    return data;
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) =>{
    const data = await getUserById(id);
    return data;
});

export const addUserAction = createAsyncThunk('user/addUserAction', async (newUser) => {
  const data = await addUser(newUser);
  return {
    success: true,
    user: data.user,
  };
});
export const updateUserAction =createAsyncThunk('user/updateUserAction', async(updateUser)=>{
    const data = await updatedUser(updateUser);

    return data;
});

export const fetchCoordinators = createAsyncThunk('user/fetchCoordinators', async (userTypeId = 3) => {
  const data = await getCoordinators(userTypeId);
  return data;
});

