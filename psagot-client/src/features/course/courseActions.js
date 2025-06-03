import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCourses, getCourseById, addCourse, updateCourse } from '../../utils/courseUtil';
import { filterCourses as filterCoursesApi } from '../../utils/courseUtil';


export const fetchAllCourses = createAsyncThunk('course/fetchAllCourses', async () => {
  const data = await getAllCourses();
  return data;
});

export const fetchCourseById = createAsyncThunk('course/fetchCourseById', async (id) => {
  const data = await getCourseById(id);
  return data;
});

export const addCourseAction = createAsyncThunk('course/addCourseAction', async (newCourse) => {
  console.log('actions', newCourse)
  const data = await addCourse(newCourse);
  return data;
});

export const updateCourseAction = createAsyncThunk('course/updateCourseAction', async (updatedCourse) => {
  const data = await updateCourse(updatedCourse);
  return data;
});

export const filterCourses = createAsyncThunk('courses/filterCourses', async (filters, { rejectWithValue }) => {
  try {
    const data = await filterCoursesApi(filters);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'שגיאה בסינון הקורסים');
  }
});

