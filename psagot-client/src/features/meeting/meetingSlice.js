import { createSlice } from '@reduxjs/toolkit';
import { fetchAllMeetings, updateMeetingAction, addMeetingAction, fetchMeetingById,  fetchMeetings } from '../meeting/meetingActions';

const initialState = {
  meetings: [],
  meeting: null,
  status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
  error: null,
  totalRecords: 0, // Add totalRecords to track pagination info
  pageNumber: 1, 
  pageSize:10
  
};

const meetingSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: { 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMeetings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllMeetings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meetings = action.payload;
            })
            .addCase(fetchAllMeetings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }).addCase(updateMeetingAction.rejected, (state, action) => {
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
            })
            .addCase(addMeetingAction.pending, (state) => {
                state.status = "loading";
              })
             .addCase(addMeetingAction.fulfilled, (state, action) => {
                state.meetings.push(action.payload)
              })
              .addCase(addMeetingAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
              })
            .addCase(fetchMeetingById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMeetingById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meeting = action.payload;
            })
            .addCase(fetchMeetingById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
           
            .addCase(fetchMeetings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMeetings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meetings = action.payload.meetings;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(fetchMeetings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const {} = meetingSlice.actions;
export default meetingSlice.reducer;
