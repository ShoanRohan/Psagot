import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDaysForCourse, getDaysForCourseByCourseId, gelAllDaysForCourse, getDaysForCourseById, updateDaysForCourse } from '../../utils/daysForCourseUtil';

export const fetchAllDaysForCourse = createAsyncThunk('/daysForCourse/fetchAllDaysForCourse', async () => {
    const data = await gelAllDaysForCourse();
    return data;
});

export const fetchDaysForCourseById = createAsyncThunk('daysForCourse/fetchDaysForCourseById', async (id) => {
    const data = await getDaysForCourseById(id);
    return data;
});

export const fetchDaysForCourseByCourseId = createAsyncThunk('daysForCourse/fetchDaysForCourseByCourseId', async (courseId) => {
    const data = await getDaysForCourseByCourseId(courseId);
    return data;
});

export const addDaysForCourseAction = createAsyncThunk('daysForCourse/addDaysForCourseAction', async (newDayForCourse) => {
    const data = await addDaysForCourse(newDayForCourse);
    return data;
});

export const updateDaysForCourseAction = createAsyncThunk('daysForCourse/updateDaysForCourseAction', async (updateDaysForCourse) => {
    const data = await updateDaysForCourse(updateDaysForCourse);
    return data;
});