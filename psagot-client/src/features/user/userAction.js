import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getUserById, addUser, updatedUser, getCoordinators} from "../../utils/userUtil";


export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const data = await getAllUsers();
    return data;
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id, thunkAPI) => {
  if (!id) {
    return thunkAPI.rejectWithValue({ message: "userId is undefined or null" });    
  }
  const data = await getUserById(id);
  return data;
});

export const addUserAction = createAsyncThunk('user/addUserAction', async (newUser, thunkAPI) => {
  try {
    const data = await addUser(newUser);
    if (data.success) {
      return {
        success: true,
        user: data.user,
        
      };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const updateUserAction =createAsyncThunk('user/updateUserAction', async(updateUser)=>{
    const data = await updatedUser(updateUser);

    return data;
});
export const fetchCoordinators = createAsyncThunk( 'user/fetchCoordinators', async (userTypeId = 3, thunkAPI) => {
    try {
      const data = await getCoordinators(userTypeId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);