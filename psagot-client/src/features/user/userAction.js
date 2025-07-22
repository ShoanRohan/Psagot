import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getAllCoordinators, getUserById, addUser, updatedUser, getCoordinators, getAllLecturersAndCoordinators, getTeachers, getFilteredUsers, getUsersByPage } from "../../utils/userUtil";

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const data = await getAllUsers();
    return data;
  }
);

export const fetchAllCoordinators = createAsyncThunk('user/fetchAllCoordinators', async () => {
    const data = await getAllCoordinators();
    return data;
});

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


export const updateUserAction = createAsyncThunk(
  'user/updateUserAction',
  async (userData, thunkAPI) => {
    try {
      const data = await updatedUser(userData); 
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



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
});

export const fetchUsersByPage = createAsyncThunk('user/fetchUsersByPage', async({pageNumber, pageSize}) => {
    const data = await getUsersByPage(pageNumber, pageSize);
    return data;
});


