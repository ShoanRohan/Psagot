import { createSlice } from '@reduxjs/toolkit';
import { addDaysForCourseAction, fetchDaysForCourseByCourseId } from './daysForCourseActions';


const initialState = {
    daysForCourses: [],
    daysForCourseByCourseId: [],
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
            .addCase(addDaysForCourseAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addDaysForCourseAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.daysForCourses = [...state.daysForCourses, action.payload];
            })
            .addCase(addDaysForCourseAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchDaysForCourseByCourseId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDaysForCourseByCourseId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.daysForCourseByCourseId = action.payload;
            })
            .addCase(fetchDaysForCourseByCourseId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const {} = daysForCourseSlice.actions;
export default daysForCourseSlice.reducer;
