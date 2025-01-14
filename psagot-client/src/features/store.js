import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import dayReducer from '../features/day/daySlice';
import meetingReducer from '../features/meeting/meetingSlice';
import daysForCourseReducer from '../features/daysForCourse/daysForCourseSlice';
import roomReducer from '../features/room/roomSlice';
import userReduser from './user/userSlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    meeting: meetingReducer, //Slice of meeting
    daysForCourse: daysForCourseReducer, //Slice of daysForCourse
    day : dayReducer, //Slice of day
    room: roomReducer,
    user: userReduser, 
  },
  
});


export default store;