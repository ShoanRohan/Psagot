import { createSlice } from '@reduxjs/toolkit';
import { fetchAllMeetings, updateMeetingAction, addMeetingAction, fetchMeetingById, deleteMeetingAction } from './meetingActions';

const initialState = {
  meetings: [],
  meeting: null,
  status: 'idle',
  error: null,
};

const meetingSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Meetings
            .addCase(fetchAllMeetings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllMeetings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meetings = action.payload;
                state.error = null;
            })
            .addCase(fetchAllMeetings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            // Update Meeting
            .addCase(updateMeetingAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateMeetingAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.meetings.findIndex(
                    (meeting) => meeting.meetingId === action.payload.meetingId
                );
                if (index !== -1) {
                    state.meetings[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateMeetingAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            
            // Add Meeting
            .addCase(addMeetingAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addMeetingAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meetings.push(action.payload);
                state.error = null;
            })
            .addCase(addMeetingAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            // Fetch Meeting By ID
            .addCase(fetchMeetingById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMeetingById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.meeting = action.payload;
                state.error = null;
            })
            .addCase(fetchMeetingById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            // Delete Meeting - מחזיר את כל המפגשים המעודכנים
            .addCase(deleteMeetingAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteMeetingAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // עדכון כל רשימת המפגשים עם הנתונים החדשים מהשרת
                state.meetings = action.payload;
                state.error = null;
            })
            .addCase(deleteMeetingAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { clearError, setStatus } = meetingSlice.actions;
export default meetingSlice.reducer;
