import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDaysForCourse } from '../../utils/daysForCourseUtil';

export const addDaysForCourseAction = createAsyncThunk('DaysForCourse/addDaysForCourseAction', async (newDayForCourse) => {
  const data = await addDaysForCourse(newDayForCourse);
  return data;
});