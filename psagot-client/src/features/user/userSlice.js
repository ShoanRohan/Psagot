import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers, fetchUserById, addUserAction, updateUserAction } from './userAction';

const initialState = {
  users: [],
  user: null,
  status: 'idle', // יכול להיות: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // פעולה fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload; // עדכון רשימת המשתמשים
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // טיפול בשגיאה
      })

      // פעולה fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // עדכון המשתמש שנמצא
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // פעולה addUserAction
      .addCase(addUserAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload); // הוספת המשתמש החדש
      })
      .addCase(addUserAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // פעולה updateUserAction
      .addCase(updateUserAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload; // עדכון המשתמש הקיים
        }
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
