import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCourses, fetchCourseById, addCourseAction, updateCourseAction, fetchFilteredPaginatedCourses } from './courseActions';

const initialState = {
    courses: [],
    filterPaginatedCourses: [],
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    selectedCourse: null,
    status: 'idle', 
    selectedCourseStatus: 'idle',
    error: null,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        // setCourse: (state, action) => {
        //     state.selectedCourse = action.payload;
        // },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        resetSelectedCourseStatus: (state) => {
            state.selectedCourseStatus = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchAllCourses.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchAllCourses.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.courses = action.payload;
          })
          .addCase(fetchAllCourses.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(fetchCourseById.pending, (state) => {
            state.selectedCourseStatus = "loading";
          })
          .addCase(fetchCourseById.fulfilled, (state, action) => {
            state.selectedCourseStatus = "succeeded";
            state.selectedCourse = action.payload;
          })
          .addCase(fetchCourseById.rejected, (state, action) => {
            state.selectedCourseStatus = "failed";
            state.error = action.error.message;
          })
          .addCase(fetchFilteredPaginatedCourses.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchFilteredPaginatedCourses.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.filterPaginatedCourses = action.payload.courses;
            state.totalCount = action.payload.totalCount;
          })
          .addCase(fetchFilteredPaginatedCourses.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(addCourseAction.fulfilled, (state, action) => {
            state.courses.push(action.payload);
          })
          .addCase(updateCourseAction.pending, (state) => {
            state.status = "loading";
          })
          .addCase(updateCourseAction.fulfilled, (state, action) => {
            state.status = "succeeded";
            const index = state.courses.findIndex(
              (course) => course.courseId === action.payload.courseId
            );
            if (index !== -1) {
              state.courses[index] = action.payload;
            }
            if (
              state.selectedCourse &&
              state.selectedCourse.courseId === action.payload.courseId
            ) {
              state.selectedCourse = action.payload;
            }
            state.selectedCourseStatus = "succeeded";
            state.error = null;
          })
          .addCase(updateCourseAction.rejected, (state, action) => {
            state.selectedCourseStatus = "failed";
            if (
              action.payload &&
              typeof action.payload === "object" &&
              action.payload.isConflict
            ) {
              state.error = null;
            } else {
              state.error = action.payload || action.error.message;
            }
          });       
    },
});

export const selectCourses = state => state.course.filterPaginatedCourses;
export const selectCourseStatus = (state) => state.course.status;
export const selectSelectedCourseStatus = (state) => state.course.selectedCourseStatus;
export const selectTotalCount = state => state.course.totalCount;
export const selectCurrentPage = state => state.course.currentPage;
export const selectPageSize = state => state.course.pageSize;
export const selectSelectedCourse = (state) => state.course.selectedCourse;

export const { setCourse, setCurrentPage, setPageSize, resetSelectedCourseStatus  } = courseSlice.actions;
export default courseSlice.reducer;
