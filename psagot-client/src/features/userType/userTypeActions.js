import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUserType, getUserTypeById, addUserType, updateUserType } from '../../utils/userTypeUtil';

// getting all user types
export const fetchAllUserType = createAsyncThunk('userType/fetchAllUserType', async () => {
  const data = await getAllUserType();
  return data;
});

// getting user type by id
export const fetchUserTypeById = createAsyncThunk('userType/fetchUserTypeById', async (id) => {
  const data = await getUserTypeById(id);
  return data;
});

// adding new user type
export const addUserTypeAction = createAsyncThunk('userType/addUserTypeAction', async (newUserType) => {
  const data = await addUserType(newUserType);
  return data;
});

// updated user type
export const updateUserTypeAction = createAsyncThunk('userType/updateUserTypeAction', async (updatedUserType) => {
  const data = await updateUserType(updatedUserType);
  return data;
});
