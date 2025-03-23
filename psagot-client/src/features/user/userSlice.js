import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllUsers,
  fetchUserById,
  addUserAction,
  updateUserAction,
  fetchCoordinators,
} from "./userAction";

const initialState = {
  user: [],
  selectedUser: null,
  coordinatorsCode: [],
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
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUserAction.fulfilled, (state, action) => {
        state.user.push(action.payload);
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        const index = state.user.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.user[index] = action.payload;
        }
      })
      .addCase(fetchCoordinators.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoordinators.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coordinatorsCode = action.payload;
      })
      .addCase(fetchCoordinators.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;