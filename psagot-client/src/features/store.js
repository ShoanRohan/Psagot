import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import dayReducer from '../features/day/daySlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, 
    day : dayReducer,
  },
});

export default store;