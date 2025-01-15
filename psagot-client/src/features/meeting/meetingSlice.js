import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
  error: null,
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMeetingAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateMeetingAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMeetingAction.fulfilled, (state, action) => {
        const index = state.meetings.findIndex(
          (meeting) => meeting.meetingId === action.payload.meetingId
        );
        if (index !== -1) {
          state.meetings[index] = action.payload;
        }
      });
  },
});

export const {} = meetingSlice.actions;
export default meetingSlice.reducer;
