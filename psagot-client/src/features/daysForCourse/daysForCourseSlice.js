import { createSlice } from '@reduxjs/toolkit';
import { fetchDaysForCourseByCourseId } from './daysForCourseActions';

const initialState = {
    daysForCourse: null,
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
};

const daysForCourseSlice = createSlice({
    name: 'daysForCourse',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDaysForCourseByCourseId.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchDaysForCourseByCourseId.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.daysForCourse = action.payload;
        })
        .addCase(fetchDaysForCourseByCourseId.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    },
});

export const {} = daysForCourseSlice.actions;
export default daysForCourseSlice.reducer;
