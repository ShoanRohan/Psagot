import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
  },
});

export default store;