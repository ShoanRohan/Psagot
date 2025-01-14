import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import topicReducer from '../features/topic/topicSlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    topic:topicReducer,
  },
});

export default store;