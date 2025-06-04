import { createSlice } from "@reduxjs/toolkit";
import { fetchAllStatuses, fetchAllStatusesTopics } from "./statusActions";

const initialState = {
  coursesStatuses: [], 
  topicsStatuses: [],
  status: "idle", // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
  error: null,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStatuses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllStatuses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coursesStatuses = action.payload;
      })
      .addCase(fetchAllStatuses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAllStatusesTopics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllStatusesTopics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topicsStatuses = action.payload;
      })
      .addCase(fetchAllStatusesTopics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectStatuses = (state) => state.status.coursesStatuses;
export default statusSlice.reducer;
