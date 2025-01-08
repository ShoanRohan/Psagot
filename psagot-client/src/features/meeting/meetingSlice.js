import { createSlice } from '@reduxjs/toolkit';
import { updateMeetingAction } from "./meetingActions";

const initialState = {
  meetings: [],
  status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
  error: null,
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateMeetingAction.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateMeetingAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.meetings.findIndex((meeting) => meeting.id === action.payload.id);
        if (index !== -1) {
          state.meetings[index] = action.payload;
        }
      })
      .addCase(updateMeetingAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to update meeting.";
      });
  },
});

export const {} = meetingSlice.actions;
export default meetingSlice.reducer;
