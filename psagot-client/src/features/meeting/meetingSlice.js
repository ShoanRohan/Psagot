import { createSlice } from '@reduxjs/toolkit';
import { fetchMeetingsByRange,fetchAllMeetings, updateMeetingAction, addMeetingAction, fetchMeetingById, fetchMeetingsByPage } from '../meeting/meetingActions';

const initialState = {
  meetings: [],
  meeting: null,
  status: 'idle', 
  error: null,
  totalCount: 0, 

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
            .addCase(fetchMeetingsByPage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMeetingsByPage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meetings = action.payload.meetings;
                state.totalCount = action.payload.totalCount;
                
            })
            .addCase(fetchMeetingsByPage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchMeetingsByRange.pending, (state) => {
             state.status = 'loading';
            })
            .addCase(fetchMeetingsByRange.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meetings = action.payload;
            })
            .addCase(fetchMeetingsByRange.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {} = meetingSlice.actions;
export default meetingSlice.reducer;
