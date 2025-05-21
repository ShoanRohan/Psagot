import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCoursesStatuses,getAllStatusesTopics } from '../../utils/statusCourseUtil';

export const fetchAllStatuses = createAsyncThunk('statusCourse/fetchAllStatusCourses', async () => {
  const data = await getAllCoursesStatuses();
  return data;
});
export const fetchAllStatusesTopics = createAsyncThunk('statusTopic/fetchAllStatusTopics', async () => {
  const data = await getAllStatusesTopics();
  return data;
});