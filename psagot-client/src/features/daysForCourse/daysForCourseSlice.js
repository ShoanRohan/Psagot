import { createSlice } from '@reduxjs/toolkit';
import { fetchAllDaysForCourse } from './daysForCourseActions';

const initialState = {
    daysForCourses: [],
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
            .addCase(fetchAllDaysForCourse.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllDaysForCourse.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.daysForCourses = action.payload;
            })
            .addCase(fetchAllDaysForCourse.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const {} = daysForCourseSlice.actions;
export default daysForCourseSlice.reducer;
