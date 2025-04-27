import {createSlice} from '@reduxjs/toolkit';
import { fetchUserById, addUserAction, updateUserAction, fetchAllUsers } from './userAction';

const initialState = {
    user: [],
    selectedUser: null,
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      .addCase(addUserAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(addUserAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateUserAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

     
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;