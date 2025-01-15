import { createSlice } from '@reduxjs/toolkit';
import { fetchAllScheduleForTopics, fetchScheduleForTopicById, fetchAllScheduleForTopicByTopicId, addScheduleForTopicAction, updateScheduleForTopicAction, deleteScheduleForTopicAction } from './scheduleForTopicActions';

const initialState = {
    scheduleForTopics: [],
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
};

const scheduleForTopicSlice = createSlice({
    name: 'scheduleForTopic',
    initialState,
    reducers: {
        setScheduleForTopic: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllScheduleForTopics.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllScheduleForTopics.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userTypes = action.payload;
            })
            .addCase(fetchAllScheduleForTopics.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchScheduleForTopicById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchScheduleForTopicById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload;
            })
            .addCase(fetchScheduleForTopicById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAllScheduleForTopicByTopicId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllScheduleForTopicByTopicId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload;
            })
            .addCase(fetchAllScheduleForTopicByTopicId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addScheduleForTopicAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addScheduleForTopicAction.fulfilled, (state, action) => {
                state.scheduleForTopics.push(action.payload);
            })
            .addCase(addScheduleForTopicAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateScheduleForTopicAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateScheduleForTopicAction.fulfilled, (state, action) => {
                const index = state.scheduleForTopics.findIndex((scheduleForTopic) => scheduleForTopic.id === action.payload.id);
                if (index !== -1) {
                    state.scheduleForTopics[index] = action.payload;
                }
            })
            .addCase(updateScheduleForTopicAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteScheduleForTopicAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteScheduleForTopicAction.fulfilled, (state, action) => {
                state.scheduleForTopics.filter((scheduleForTopic) => scheduleForTopic.id !== action.payload.id)
            })
            .addCase(deleteScheduleForTopicAction.fulfilled, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const { setScheduleForTopic } = scheduleForTopicSlice.actions;
export default scheduleForTopicSlice.reducer;
