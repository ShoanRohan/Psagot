import { createSlice } from "@reduxjs/toolkit";
import { fetchAllDays } from "./dayActions";

const initialState = {
  days: [],
  status: "idle", // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
  error: null,
};

const daySlice = createSlice({
  name: "day",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDays.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllDays.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.days = action.payload;
      })
      .addCase(fetchAllDays.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectDays = (state) => state.day.days;
export default daySlice.reducer;