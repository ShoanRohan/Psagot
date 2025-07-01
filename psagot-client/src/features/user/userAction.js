import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getUserById,
     addUser, updatedUser, getCoordinators, getAllLecturersAndCoordinators,
      login, register, getTeachers, getFilteredUsers } from "../../utils/userUtil";

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const data = await getAllUsers();
    return data;
  }
);

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) =>{
    const data = await getUserById(id);
    return data;
  }
);

export const fetchFilteredUseres = createAsyncThunk(
  "user/fetchFilteredUseres",
  async (filteredUsersParamaters) => {
    const data = await getFilteredUsers(filteredUsersParamaters);
    return data;
  }
);

export const addUserAction = createAsyncThunk(
  "user/addUserAction",
  async (newUser) => {
    const data = await addUser(newUser);
    return data;
});

export const updateUserAction =createAsyncThunk('user/updateUserAction', async(updateUser)=>{
    const data = await updatedUser(updateUser);
    return data;
});

export const loginAction = createAsyncThunk('user/login', async (loginUser) => {
    const data = await login(loginUser); // מחזיר רק את data
    return data;
});

export const fetchCoordinators = createAsyncThunk("user/fetchCoordinators", async () => {
        const data = await getCoordinators();
        return data;
});

export const fetchTeachers = createAsyncThunk("user/fetchTeachers", async () => {
        const data = await getTeachers();
        return data;
});
export const fetchAllLecturersAndCoordinators = createAsyncThunk('user/fetchAllLecturersAndCoordinators', async () => {
    const data = await getAllLecturersAndCoordinators();
    return data;
  }
);

export const registerAction = createAsyncThunk('user/register', async (newUser) => {
    const data = await register(newUser);
    return data;
});
