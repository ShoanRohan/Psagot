import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDaysForCourse, getDaysForCourseByCourseId, gelAllDaysForCourse, getDaysForCourseById, updateDaysForCourse , deleteDaysForCourse, checkTopicsConflicts } from '../../utils/daysForCourseUtil';

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

export const updateDaysForCourseAction = createAsyncThunk('DaysForCourse/updateDaysForCourseAction', async (daysForCourse) => {
    const data = await updateDaysForCourse(daysForCourse);
    return data;
});

export const deleteDaysForCourseAction = createAsyncThunk('daysForCourse/deleteDaysForCourseAction', async (daysForCourseId, { rejectWithValue }) => {
    try {
        await deleteDaysForCourse(daysForCourseId);
        return daysForCourseId;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const checkTopicsConflictAction = createAsyncThunk(
    'daysForCourse/checkTopicsConflict',
    async ({ courseId, newDays }, { rejectWithValue }) => {
        try {
            const response = await checkTopicsConflicts({ courseId, newDays });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
