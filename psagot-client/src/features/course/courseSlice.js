import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCourses, fetchCourseById, addCourseAction, updateCourseAction, fetchFilteredPaginatedCourses } from './courseActions';

const initialState = {
    courses: [],
    filterPaginatedCourses: [],
    currentPage: 1,
    pageSize: 1,
    totalCount: 0,
    selectedCourse: null,
    status: 'idle', // מצב: idle - התחלתי, loading - בטעינה, succeeded - הצלחה, failed - נכשל
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
        }
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
            .addCase(fetchFilteredPaginatedCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilteredPaginatedCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.filterPaginatedCourses = action.payload.courses;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchFilteredPaginatedCourses.rejected, (state, action) => {
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

export const selectCourses = state => state.course.filterPaginatedCourses;
export const selectTotalCount = state => state.course.totalCount;
export const selectCurrentPage = state => state.course.currentPage;
export const selectPageSize = state => state.course.pageSize;
export const selectSelectedCourse = (state) => state.course.selectedCourse;

export const { setCourse, setCurrentPage, setPageSize } = courseSlice.actions;
export default courseSlice.reducer;
