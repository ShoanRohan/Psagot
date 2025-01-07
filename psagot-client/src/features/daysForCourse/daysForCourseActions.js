import { createAsyncThunk } from '@reduxjs/toolkit';
import { gelAllDaysForCourse } from '../../utils/daysForCourseUtil';

export const fetchAllDaysForCourse = createAsyncThunk('/DaysForCourse/GetAllDaysForCourse', async () => {
  const data = await gelAllDaysForCourse();
  return data;
});