import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCoursesStatuses } from '../../utils/statusCourseUtil';

export const fetchAllStatuses = createAsyncThunk('statusCourse/fetchAllStatusCourses', async () => {
  const data = await getAllCoursesStatuses();
  return data;
});