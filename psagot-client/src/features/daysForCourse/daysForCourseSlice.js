import { createSlice } from '@reduxjs/toolkit';
import { addDaysForCourseAction, fetchDaysForCourseByCourseId, fetchAllDaysForCourse, fetchDaysForCourseById, fetchUpdateDaysForCourseAction } from './daysForCourseActions';

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
            .addCase(fetchUpdateDaysForCourseAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUpdateDaysForCourseAction.fulfilled, (state, action) => {
                const index = state.daysForCourses.findIndex((daysForCourse) => daysForCourse.id === action.payload.id);
                if (index !== -1) {
                    state.daysForCourses[index] = action.payload;
                }
            })
            .addCase(fetchUpdateDaysForCourseAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const {} = daysForCourseSlice.actions;
export default daysForCourseSlice.reducer;
