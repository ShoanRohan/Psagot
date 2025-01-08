import { createAsyncThunk } from '@reduxjs/toolkit';
import { gelAllDaysForCourse } from '../../utils/daysForCourseUtil';

export const fetchAllDaysForCourse = createAsyncThunk('/DaysForCourse/fetchAllDaysForCourse', async () => {
  const data = await gelAllDaysForCourse();
  return data;
});