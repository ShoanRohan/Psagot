import { createSlice } from '@reduxjs/toolkit';
import { fetchAllTopic, fetchTopicById, addTopicAction, updateTopicAction, fetchAllTopicFotCourseByCourseId } from './topicActions';


const initialState = {
    topics: [],
    selectedTopic: null,
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
};

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        //write functions here - to save data to redux
        setTopic: (state, action) => {
            // state.topic = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchAllTopic
            .addCase(fetchAllTopic.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllTopic.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.topics = action.payload;
            })
            .addCase(fetchAllTopic.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            // Handle fetchTopicById
            .addCase(fetchTopicById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTopicById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedTopic = action.payload;
            })
            .addCase(fetchTopicById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle addTopicAction
            .addCase(addTopicAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTopicAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.topics.push(action.payload);
            })
            .addCase(addTopicAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle updateTopicAction
            .addCase(updateTopicAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTopicAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.topics.findIndex((topic) => topic.id === action.payload.id);
                if (index !== -1) {
                    state.topics[index] = action.payload;
                }
            })
            .addCase(updateTopicAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Handle fetchAllTopicFotCourseByCourseId
            .addCase(fetchAllTopicFotCourseByCourseId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllTopicFotCourseByCourseId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.topics = action.payload;
            })
            .addCase(fetchAllTopicFotCourseByCourseId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setTopic } = topicSlice.actions;
export default topicSlice.reducer;

