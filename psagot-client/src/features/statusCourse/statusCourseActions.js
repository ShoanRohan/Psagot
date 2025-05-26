import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStatusCourse } from '../../utils/statusCourseUtil';

export const fetchCourseStatuses = createAsyncThunk(
  'statusCourse/fetchCourseStatuses',
  async () => {
    const data = await getStatusCourse();
    return data;
  }
);