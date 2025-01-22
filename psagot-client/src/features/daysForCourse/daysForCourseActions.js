import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDaysForCourse, GetDaysForCourseByCourseId, gelAllDaysForCourse, getDaysForCourseById, updateDaysForCourse } from '../../utils/daysForCourseUtil';

export const addDaysForCourseAction = createAsyncThunk('DaysForCourse/addDaysForCourseAction', async (newDayForCourse) => {
  const data = await addDaysForCourse(newDayForCourse);
  return data;
});

export const fetchDaysForCourseByCourseId = createAsyncThunk('DaysForCourse/fetchDaysForCourseByCourseId', async (courseId) => {
    const data = await GetDaysForCourseByCourseId(courseId);
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

export const fetchUpdateDaysForCourseAction = createAsyncThunk('daysForCourse/updateDaysForCourseAction', async (updateDaysForCourseId) => {
    const data = await updateDaysForCourse(updateDaysForCourseId);
    return data;
});