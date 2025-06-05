import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDaysForCourse, getDaysForCourseByCourseId, gelAllDaysForCourse, getDaysForCourseById } from '../../utils/daysForCourseUtil';

export const addDaysForCourseAction = createAsyncThunk('DaysForCourse/addDaysForCourseAction', async (newDayForCourse) => {
  const data = await addDaysForCourse(newDayForCourse);
  return data;
});

export const fetchDaysForCourseByCourseId = createAsyncThunk('DaysForCourse/fetchDaysForCourseByCourseId', async (courseId) => {
    const data = await getDaysForCourseByCourseId(courseId);
    return data;
});

export const fetchAllDaysForCourse = createAsyncThunk('/DaysForCourse/fetchAllDaysForCourse', async () => {
    const data = await gelAllDaysForCourse();
    return data;
});

export const fetchDaysForCourseById = createAsyncThunk('DaysForCourse/fetchDaysForCourseById', async (id) => {
    const data = await getDaysForCourseById(id);
    return data;
});

export const updateDaysForCourseAction = createAsyncThunk('DaysForCourse/updateDaysForCourseAction', async (updateDaysForCourse) => {
    const data = await updateDaysForCourse(updateDaysForCourse);
    return data;
});