import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from './userType/userTypeSlice';
import roomReducer from './room/roomSlice';
import dayReducer from './day/daySlice';
import userReduser from './user/userSlice';
import scheduleForTopicReducer from './scheduleForTopic/scheduleForTopicSlice';
import meetingReducer from './meeting/meetingSlice';
import daysForCourseReducer from './daysForCourse/daysForCourseSlice';
import topicReducer from './topic/topicSlice';
import courseReducer from './course/courseSlice';
import CoursesGrid from '../components/CoursesGrid';
import CoursesPage from '../pages/CoursesPage';


const store = configureStore({
  reducer: {
    userType: userTypeReducer, 
    room: roomReducer,
    user: userReduser, 
    course: courseReducer,
    CoursesPage: courseReducer,
    scheduleForTopic: scheduleForTopicReducer, 
    meeting: meetingReducer, 
    daysForCourse: daysForCourseReducer, 
    topic: topicReducer,
  },
});

export default store;




