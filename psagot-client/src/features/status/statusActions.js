import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCoursesStatuses,getAllStatusesTopics } from '../../utils/statusUtil';

export const fetchAllStatuses = createAsyncThunk('status/fetchAllStatusCourses', async () => {
  const data = await getAllCoursesStatuses();
  return data;
});
export const fetchAllStatusesTopics = createAsyncThunk('status/fetchAllStatusTopics', async () => {
  const data = await getAllStatusesTopics();
  return data;
});