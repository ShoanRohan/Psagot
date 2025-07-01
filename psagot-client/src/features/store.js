import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from './userType/userTypeSlice';
import roomReducer from './room/roomSlice';
import userReducer from './user/userSlice';
import scheduleForTopicReducer from './scheduleForTopic/scheduleForTopicSlice';
import meetingReducer from './meeting/meetingSlice';
import daysForCourseReducer from './daysForCourse/daysForCourseSlice';
import topicReducer from './topic/topicSlice';
import courseReducer from './course/courseSlice';
import statusCourseReducer from '../features/statusCourse/statusCourseSlice';
import dayReducer from '../features/day/daySlice'

const store = configureStore({
  reducer: {
    userType: userTypeReducer, 
    room: roomReducer,
    user: userReducer, 
    course: courseReducer,
    CoursesPage: courseReducer,
    scheduleForTopic: scheduleForTopicReducer, //Slice of scheduleForTopic
    meeting: meetingReducer, //Slice of meeting
    daysForCourse: daysForCourseReducer, //Slice of daysForCourse
    topic:topicReducer,
    statusCourse: statusCourseReducer,
    day: dayReducer,
  },
});

export default store;


