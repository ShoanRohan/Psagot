import { createSlice } from '@reduxjs/toolkit';
import { fetchUserById, addUserAction, updateUserAction, fetchAllUsers, fetchCoordinators, fetchAllCoordinators, fetchAllLecturersAndCoordinators, fetchFilteredUseres, fetchTeachers, fetchUsersByPage } from './userAction';

const initialState = {
    coordinators: [],
    users: [],
    teachers: [],
    selectedUser: null,
    status: 'idle',
    error: null,
    pageNumber: 1,
    pageSize: 10,
    totalUsers: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // פונקציה ריקה כרגע
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchAllUsers
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

      // fetchUserById
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

      // addUser
      .addCase(addUserAction.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // fetchAllLecturersAndCoordinators
      .addCase(fetchAllLecturersAndCoordinators.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllLecturersAndCoordinators.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAllLecturersAndCoordinators.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // fetchCoordinators
      .addCase(fetchCoordinators.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoordinators.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coordinators = action.payload;
      })
      .addCase(fetchCoordinators.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // fetchAllCoordinators
      .addCase(fetchAllCoordinators.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCoordinators.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coordinators = action.payload;
      })
      .addCase(fetchAllCoordinators.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // fetchTeachers
      .addCase(fetchTeachers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // fetchUsersByPage
      .addCase(fetchUsersByPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersByPage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.totalUsers = action.payload.countUsers;
      })
      .addCase(fetchUsersByPage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // fetchFilteredUseres
      .addCase(fetchFilteredUseres.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredUseres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users; // תיקון: state.user => state.users
      })
      .addCase(fetchFilteredUseres.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ✅ updateUserAction - השילוב שביקשת
      .addCase(updateUserAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedUser = action.payload;
        const index = state.users.findIndex(u => u.userId === updatedUser.userId);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setUser, setPageNumber, setPageSize } = userSlice.actions;
export default userSlice.reducer;
