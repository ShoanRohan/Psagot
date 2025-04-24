import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCourses, getCourseById, getPaginatedCourses, addCourse, updateCourse, courseFilter} from '../../utils/courseUtil';

export const fetchAllCourses = createAsyncThunk('course/fetchAllCourses', async () => {
  const data = await getAllCourses();
  return data;
});

export const fetchCourseById = createAsyncThunk('course/fetchCourseById', async (id) => {
  const data = await getCourseById(id);
  return data;
});

export const fetchPaginatedCourses = createAsyncThunk('course/fetchPaginatedCourses', async({pageNumber, pageSize}) => {
  const data = await getPaginatedCourses(pageNumber, pageSize);
  return data;
})

export const addCourseAction = createAsyncThunk('course/addCourseAction', async (newCourse) => {
  const data = await addCourse(newCourse);
  return data;
});

export const updateCourseAction = createAsyncThunk('course/updateCourseAction', async (updatedCourse) => {
  const data = await updateCourse(updatedCourse);
  return data;
});

export const fetchFilteredCourses = createAsyncThunk('course/getFilteredCourses', async (filterObject) => {
  const data = await courseFilter(filterObject);
  return data;
});
