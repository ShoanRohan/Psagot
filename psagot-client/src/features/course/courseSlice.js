import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCourses, fetchCourseById, addCourseAction, updateCourseAction } from './courseActions';

const initialState = {
    courses: [],
    selectedCourse: null,
    status: 'idle',
    error: null,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourse: (state, action) => {
            state.selectedCourse = action.payload;
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
            .addCase(addCourseAction.fulfilled, (state, action) => {
                state.courses.push(action.payload);
            })
            .addCase(updateCourseAction.fulfilled, (state, action) => {
                const index = state.courses.findIndex((course) => course.id === action.payload.id);
                if (index !== -1) {
                    state.courses[index] = action.payload;
                }
            });
    },
});

export const { setCourse } = courseSlice.actions;
export default courseSlice.reducer;
