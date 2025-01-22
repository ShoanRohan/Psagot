import { createSlice } from '@reduxjs/toolkit';
import {fetchMeetingById} from './meetingActions'

const initialState = {
  meetings: [],
  status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
  error: null,
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetingById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMeetingById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(fetchMeetingById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = meetingSlice.actions;
export default meetingSlice.reducer;
