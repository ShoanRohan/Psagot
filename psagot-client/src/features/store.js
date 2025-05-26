import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from './userType/userTypeSlice';
import dayReducer from './day/daySlice';
import roomReducer from './room/roomSlice';
import userReduser from './user/userSlice';
import scheduleForTopicReducer from './scheduleForTopic/scheduleForTopicSlice';
import meetingReducer from './meeting/meetingSlice';
import daysForCourseReducer from './daysForCourse/daysForCourseSlice';
import topicReducer from './topic/topicSlice';
import courseReducer from './course/courseSlice';
import statusCourseReducer from '../features/statusCourse/statusCourseSlice';
import CoursesGrid from '../components/CoursesGrid';
import CoursesPage from '../pages/CoursesPage';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, 
    room: roomReducer,
    user: userReduser, 
    course: courseReducer,
    scheduleForTopic: scheduleForTopicReducer, //Slice of scheduleForTopic
    meeting: meetingReducer, //Slice of meeting
    daysForCourse: daysForCourseReducer, //Slice of daysForCourse
    topic:topicReducer,
    statusCourse: statusCourseReducer,
    CoursesPage: courseReducer,
    scheduleForTopic: scheduleForTopicReducer, 
    meeting: meetingReducer, 
    daysForCourse: daysForCourseReducer, 
    topic: topicReducer,
  },
});

export default store;


