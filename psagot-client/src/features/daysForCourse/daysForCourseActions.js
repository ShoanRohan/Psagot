import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDaysForCourse, GetDaysForCourseByCourseId } from '../../utils/daysForCourseUtil';

export const addDaysForCourseAction = createAsyncThunk('DaysForCourse/addDaysForCourseAction', async (newDayForCourse) => {
  const data = await addDaysForCourse(newDayForCourse);
  return data;
});

export const fetchDaysForCourseByCourseId = createAsyncThunk('DaysForCourse/fetchDaysForCourseByCourseId', async (courseId) => {
    const data = await GetDaysForCourseByCourseId(courseId);
    return data;
});