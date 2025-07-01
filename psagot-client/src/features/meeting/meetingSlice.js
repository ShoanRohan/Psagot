import { createSlice } from '@reduxjs/toolkit';
import { fetchAllMeetings, updateMeetingAction, addMeetingAction, fetchMeetingById,fetchMeetingByDate } from './meetingActions';

const initialState = {
  meetings: [],
  meeting: null,
  status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
  meetingsSchedule: [],
  isLoadingSchedule: false,
  scheduleError: null,
  selectedDateRange: { from: null, to: null },
  error: null,
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

        .addCase(fetchMeetingByDate.pending, (state) => {
            state.isLoadingSchedule = true;
            state.scheduleError = null;
        })
        .addCase(fetchMeetingByDate.fulfilled, (state, action) => {
            state.isLoadingSchedule = false;
            state.meetingsSchedule = action.payload;
            state.selectedDateRange.to = action.meta.arg.to;
            state.selectedDateRange.from = action.meta.arg.from;
        })
        .addCase(fetchMeetingByDate.rejected, (state, action) => {
            state.isLoadingSchedule = false;
            state.scheduleError = action.payload || action.error.message;
        });
    },
});

// export const {} = meetingSlice.actions;
export default meetingSlice.reducer;
