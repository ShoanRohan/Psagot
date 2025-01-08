import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDaysForCourseById } from '../../utils/daysForCourseUtil';

export const fetchDaysForCourseById = createAsyncThunk('daysForCourse/fetchDaysForCourseById', async (id) => {
  const data = await getDaysForCourseById(id);
  return data;
});