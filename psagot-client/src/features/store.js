import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from "../features/userType/userTypeSlice";
import roomReducer from "../features/room/roomSlice";
import userReduser from "./user/userSlice";
import scheduleForTopicReducer from "../features/scheduleForTopic/scheduleForTopicSlice";
import meetingReducer from "../features/meeting/meetingSlice";
import daysForCourseReducer from "../features/daysForCourse/daysForCourseSlice";
import topicReducer from "../features/topic/topicSlice";
import courseReducer from "./course/courseSlice";
import statusReducer from "./status/statusSlice";
import dayReducer from "./day/daySlice";

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    room: roomReducer,
    user: userReduser,
    course: courseReducer,
    scheduleForTopic: scheduleForTopicReducer, //Slice of scheduleForTopic
    meeting: meetingReducer, //Slice of meeting
    daysForCourse: daysForCourseReducer, //Slice of daysForCourse
    topic: topicReducer,
    status: statusReducer,
    day: dayReducer,
  },
});

export default store;
