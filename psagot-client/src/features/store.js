import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import roomReducer from '../features/room/roomSlice';
import userReducer from '../features/user/userSlice';
import scheduleForTopicReducer from '../features/scheduleForTopic/scheduleForTopicSlice';
import meetingReducer from '../features/meeting/meetingSlice';
import daysForCourseReducer from '../features/daysForCourse/daysForCourseSlice';
import topicReducer from '../features/topic/topicSlice';
import courseReducer from '../features/course/courseSlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    room: roomReducer,
    user: userReducer, 
    course: courseReducer,
    scheduleForTopic: scheduleForTopicReducer, //Slice of scheduleForTopic
    meeting: meetingReducer, //Slice of meeting
    daysForCourse: daysForCourseReducer, 
    topic:topicReducer,
  },
});


export default store;
