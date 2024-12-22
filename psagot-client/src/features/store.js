import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import daysForCourseReducer from '../features/daysForCourse/daysForCourseSlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    daysForCourse: daysForCourseReducer, //Slice of daysForCourse
  },
});

export default store;