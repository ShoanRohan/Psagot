import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetDaysForCourseByCourseId } from '../../utils/daysForCourseUtil';

export const fetchDaysForCourseByCourseId = createAsyncThunk('DaysForCourse/fetchDaysForCourseByCourseId', async (courseId) => {
    const data = await GetDaysForCourseByCourseId(courseId);
    return data;
  });