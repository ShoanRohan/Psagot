import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import dayReducer from '../features/day/daySlice';
import roomReducer from '../features/room/roomSlice';
import userReduser from './user/userSlice';  // השאר רק את זה
import scheduleForTopicReducer from '../features/scheduleForTopic/scheduleForTopicSlice';
import meetingReducer from '../features/meeting/meetingSlice';
import daysForCourseReducer from '../features/daysForCourse/daysForCourseSlice';
import topicReducer from '../features/topic/topicSlice';
import courseReducer from './course/courseSlice';


const store = configureStore({
  reducer: {
    userType: userTypeReducer, 
    room: roomReducer,
    user: userReduser, 
    course: courseReducer,
    scheduleForTopic: scheduleForTopicReducer, 
    meeting: meetingReducer, 
    daysForCourse: daysForCourseReducer, 
    topic: topicReducer,
  },
});

export default store;
