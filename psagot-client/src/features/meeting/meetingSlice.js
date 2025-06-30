import { createSlice } from '@reduxjs/toolkit';
import { fetchAllMeetings, updateMeetingAction, addMeetingAction, fetchMeetingById, deleteMeetingAction } from './meetingActions';

const initialState = {
  meetings: [],
  meeting: null,
  status: 'idle',
  error: null,
  isLoading: false,
};

const meetingSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: { 
        clearError: (state) => {
            state.error = null;
        },
        clearMeeting: (state) => {
            state.meeting = null;
        },
        resetStatus: (state) => {
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Meetings
            .addCase(fetchAllMeetings.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllMeetings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoading = false;
                state.meetings = action.payload;
                state.error = null;
            })
            .addCase(fetchAllMeetings.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            
            // Update Meeting
            .addCase(updateMeetingAction.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateMeetingAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoading = false;
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
                state.isLoading = false;
                state.error = action.payload || action.error.message;
                state.error = action.error.message;
            })
            
            // Add Meeting
            .addCase(addMeetingAction.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
                state.error = null;
            })
             .addCase(addMeetingAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoading = false;
                state.meetings.push(action.payload);
                state.error = null;
            })
              .addCase(addMeetingAction.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })

            
            // Fetch Meeting By ID
            .addCase(fetchMeetingById.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMeetingById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoading = false;
                state.meeting = action.payload;
                state.error = null;
            })
            .addCase(fetchMeetingById.rejected, (state, action) => {
                state.status = 'failed';
                state.isLoading = false;
                state.error = action.payload || action.error.message;
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


export const { clearError, clearMeeting, resetStatus } = meetingSlice.actions;

export default meetingSlice.reducer;


