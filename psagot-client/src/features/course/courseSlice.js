import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCourses,
  fetchCourseById,
  addCourseAction,
  updateCourseAction,
  filterCourses,
  fetchAvailableYears,
  fetchCourseStatuses,
} from './courseActions';

const initialState = {
  courses: [],
  selectedCourse: null,
  status: 'idle',
  saveStatus: 'idle',
  error: null,
  availableYears: [],
  courseStatuses: [],
   savedCourse: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    resetCourseSaveStatus: (state) => {
    state.saveStatus = 'idle';
    state.error = null;
    state.savedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCourseAction.pending, (state) => {
        state.saveStatus = 'loading';
      })
      .addCase(addCourseAction.fulfilled, (state, action) => {
        state.saveStatus = 'succeeded';
        state.savedCourse = action.payload;
        state.courses.push(action.payload);
      })
      .addCase(addCourseAction.rejected, (state, action) => {
        state.saveStatus = 'failed';
        state.error = action.error.message;
      })      
      .addCase(updateCourseAction.fulfilled, (state, action) => {
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(filterCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(fetchAvailableYears.fulfilled, (state, action) => {
        state.availableYears = action.payload;
      })
      .addCase(fetchCourseStatuses.fulfilled, (state, action) => {
        state.courseStatuses = action.payload;
      });
  },
});

export const { setCourse, resetCourseSaveStatus } = courseSlice.actions;
export default courseSlice.reducer;
