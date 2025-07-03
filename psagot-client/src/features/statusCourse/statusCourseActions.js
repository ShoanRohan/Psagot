import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStatusCourse } from '../../utils/statusCourseUtil';

export const fetchCourseStatuses = createAsyncThunk('statusCourse/fetchCourseStatuses', async () => {
    const data = await getAllStatusCourse();
    return data;
  }
);
