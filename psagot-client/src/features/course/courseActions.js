import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCourses, getCourseById, addCourse, updateCourse, getFilterPaginatedCourses,} from "../../utils/courseUtil";

export const fetchAllCourses = createAsyncThunk("course/fetchAllCourses", async () => {
    const data = await getAllCourses();
    return data;
  });

export const fetchCourseById = createAsyncThunk("course/fetchCourseById", async (id) => {
    const data = await getCourseById(id);
    return data;
  });

export const fetchFilteredPaginatedCourses = createAsyncThunk("course/getFilteredPaginatedCourses", async ({
    courseCode, courseName, courseCoordinator, year, pageNumber, pageSize, }) => {
    const filters = { courseId: courseCode, courseName: courseName,   coordinatorId: courseCoordinator, year: year, };
    const data = await getFilterPaginatedCourses(filters, pageNumber, pageSize);
    return data;
  });

export const addCourseAction = createAsyncThunk("course/addCourseAction", async (newCourse) => {
    const data = await addCourse(newCourse);
    return data;
  });

export const updateCourseAction = createAsyncThunk("course/updateCourseAction", async (updatedCourse) => {
    const data = await updateCourse(updatedCourse);
    return data;
  });
