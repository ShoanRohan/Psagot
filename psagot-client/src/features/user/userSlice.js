import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllUsers,
  fetchUserById,
  addUserAction,
  updateUserAction,
} from './userAction';

const initialState = {
  users: [],
  selectedUser: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
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

      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

       .addCase(addUserAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users.push(action.payload);
    })
    .addCase(addUserAction.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })

      .addCase(updateUserAction.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.userId === action.payload.userId
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;


