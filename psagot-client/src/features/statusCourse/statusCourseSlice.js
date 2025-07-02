import { createSlice } from '@reduxjs/toolkit';
import { fetchCourseStatuses } from './statusCourseActions';

const initialState = {
  statuses: [],
  selectedStatus: null,
  status: 'idle',
  error: null,
};

const statusCourseSlice = createSlice({
  name: 'statusCourse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseStatuses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseStatuses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.statuses = action.payload;
        console.log('state', state.statuses)
      })
      .addCase(fetchCourseStatuses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default statusCourseSlice.reducer;