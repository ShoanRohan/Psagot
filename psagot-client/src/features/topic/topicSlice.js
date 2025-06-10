import { createSlice } from '@reduxjs/toolkit';
import { fetchAllTopic, fetchTopicById, addTopicAction, updateTopicAction, fetchAllTopicForCourseByCourseId } from './topicActions';
import { Topic } from '@mui/icons-material';
import { deleteTopicAction } from './topicActions';

const initialState = {
    topics: [],
    selectedTopic: null,
    filtersTopics: [],
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
        },
        setFilterTopic: (state, action)=> {
         const { topicName, teacherName, statusName} = action.payload; 
            state.filtersTopics = state.topics.filter(course => {
           return   ( !topicName || course.name.includes(topicName)) // התאמה לשם הנושא
            && ( !teacherName || course.teacherName.includes(teacherName))// התאמה לשם המרצה
             && ( !statusName || course.status === statusName) // התאמה לסטטוס
              })}
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
                state.filtersTopics = action.payload
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
            .addCase(fetchAllTopicForCourseByCourseId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllTopicForCourseByCourseId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.topics = action.payload;
                state.filtersTopics = action.payload
            })
            .addCase(fetchAllTopicForCourseByCourseId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteTopicAction.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(deleteTopicAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // מוחקים את הנושא מהרשימה
                state.topics = state.topics.filter(topic => topic.id !== action.payload);
                state.filtersTopics = state.filtersTopics.filter(topic => topic.id !== action.payload);
              })
              .addCase(deleteTopicAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              });
    },
});

export const selectFilteredTopics = state => state.topic.filtersTopics;
export const { setTopic,setFilterTopic } = topicSlice.actions;
export default topicSlice.reducer;

