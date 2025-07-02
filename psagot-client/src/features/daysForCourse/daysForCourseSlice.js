import { createSlice } from '@reduxjs/toolkit';
import { fetchAllDaysForCourse, fetchDaysForCourseById, fetchDaysForCourseByCourseId, addDaysForCourseAction, updateDaysForCourseAction, deleteDaysForCourseAction, checkTopicsConflictAction } from './daysForCourseActions';

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
            state.status = "loading";
          })
          .addCase(fetchAllDaysForCourse.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.daysForCourses = action.payload;
          })
          .addCase(fetchAllDaysForCourse.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(fetchDaysForCourseById.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchDaysForCourseById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.dayForCourse = action.payload;
          })
          .addCase(fetchDaysForCourseById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
          .addCase(fetchDaysForCourseByCourseId.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchDaysForCourseByCourseId.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.daysForCourseByCourseId = action.payload;
          })
          .addCase(fetchDaysForCourseByCourseId.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(addDaysForCourseAction.pending, (state) => {
            state.status = "loading";
          })
          .addCase(addDaysForCourseAction.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.daysForCourses.push(action.payload);
            state.daysForCourseByCourseId.push(action.payload);
          })
          .addCase(addDaysForCourseAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(updateDaysForCourseAction.pending, (state) => {
            state.status = "loading";
          })
          .addCase(updateDaysForCourseAction.fulfilled, (state, action) => {
            state.status = "succeeded";
            const updatedDay = action.payload;

            const index = state.daysForCourseByCourseId.findIndex( (day) => day.daysForCourseId === updatedDay.daysForCourseId );
            if (index !== -1) {
              state.daysForCourseByCourseId[index] = updatedDay;
            }
          })
          .addCase(updateDaysForCourseAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
          .addCase(deleteDaysForCourseAction.pending, (state) => {
            state.status = "loading";
          })
          .addCase(deleteDaysForCourseAction.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.daysForCourseByCourseId = state.daysForCourseByCourseId.filter( (day) => day.daysForCourseId !== action.payload );
            state.daysForCourses = state.daysForCourses.filter( (day) => day.daysForCourseId !== action.payload );
          })
          .addCase(deleteDaysForCourseAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
          .addCase(checkTopicsConflictAction.pending, (state) => {
            state.status = "loading";
          })
          .addCase(checkTopicsConflictAction.fulfilled, (state, action) => {
            state.status = "succeeded";
          })
          .addCase(checkTopicsConflictAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          });
    },
});

export const {} = daysForCourseSlice.actions;
export default daysForCourseSlice.reducer;
