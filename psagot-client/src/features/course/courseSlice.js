import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCourses, fetchCourseById, fetchPaginatedCourses, addCourseAction, updateCourseAction, fetchFilteredCourses } from './courseActions';

const initialState = {
    //courses: [],
    paginatedCourses: [],
    currentPage: 1,
    pageSize: 1,
    totalCount: 0,
    filtersCourses: [],
    selectedCourse: null,
    status: 'idle', // מצב: idle - התחלתי, loading - בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourse: (state, action) => {
            state.selectedCourse = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchAllCourses.pending, (state) => {
            //     state.status = 'loading';
            // })
            // .addCase(fetchAllCourses.fulfilled, (state, action) => {
            //     state.status = 'succeeded';
            //     state.courses = action.payload;
            //     state.filtersCourses = action.payload
            // })
            // .addCase(fetchAllCourses.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.error.message;
            // })
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
            .addCase(fetchPaginatedCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPaginatedCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.paginatedCourses = action.payload.courses;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchPaginatedCourses.rejected, (state, action) => {
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
            })

            .addCase(fetchFilteredCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilteredCourses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.filtersCourses = action.payload;
            })
            .addCase(fetchFilteredCourses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });


    },
});

//export const selectFiltersCourses = state => state.course.filtersCourses;
export const selectPaginatedCourses = state => state.course.paginatedCourses;
export const selectTotalCount = state => state.course.totalCount;
export const selectCurrentPage = state => state.course.currentPage;
export const selectPageSize = state => state.course.pageSize;

export const { setCourse, setCurrentPage, setPageSize } = courseSlice.actions;
export default courseSlice.reducer;
