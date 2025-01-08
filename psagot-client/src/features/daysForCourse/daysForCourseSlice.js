import { createSlice } from '@reduxjs/toolkit';
import { fetchDaysForCourseById } from './daysForCourseActions';

const initialState = {
    dayForCourse: null,
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
        .addCase(fetchDaysForCourseById.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchDaysForCourseById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.dayForCourse = action.payload;
        })
        .addCase(fetchDaysForCourseById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const {} = daysForCourseSlice.actions;
export default daysForCourseSlice.reducer;
