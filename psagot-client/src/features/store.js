import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import meetingReducer from '../features/meeting/meetingSlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    meeting: meetingReducer, //Slice of meeting
  },
});

export default store;