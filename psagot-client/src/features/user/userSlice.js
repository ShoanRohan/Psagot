import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserById,
  addUserAction,
  updateUserAction,
  fetchAllUsers,
  fetchAllLecturersAndCoordinators,
  fetchFilteredUseres,
} from "./userAction";

const initialState = {
  user: [],
  selectedUser: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = " failed";
        state.error = action.error.message;
      })
      .addCase(addUserAction.fulfilled, (state, action) => {
        state.user.puse(action.payload);
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        const index = state.user.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.user[index] = action.payload;
        }
      })
      .addCase(fetchAllLecturersAndCoordinators.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllLecturersAndCoordinators.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchAllLecturersAndCoordinators.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFilteredUseres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredUseres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.users;
      })
      .addCase(fetchFilteredUseres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
