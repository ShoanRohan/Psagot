import { createSlice } from '@reduxjs/toolkit';
import { fetchAllDaysForCourse, fetchDaysForCourseById, fetchDaysForCourseByCourseId, addDaysForCourseAction, updateDaysForCourseAction } from './daysForCourseActions';

const initialState = {
    daysForCourses: [],
    daysForCourseByCourseId: [],
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
            .addCase(updateDaysForCourseAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateDaysForCourseAction.fulfilled, (state, action) => {
                const index = state.daysForCourses.findIndex((daysForCourse) => daysForCourse.id === action.payload.id);
                if (index !== -1) {
                    state.daysForCourses[index] = action.payload;
                }
            })
            .addCase(updateDaysForCourseAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = daysForCourseSlice.actions;
export default daysForCourseSlice.reducer;
