import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
};

const daysForCourseSlice = createSlice({
    name: 'daysForCourse',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    },
});

export const {} = daysForCourseSlice.actions;
export default daysForCourseSlice.reducer;