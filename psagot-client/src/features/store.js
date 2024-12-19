import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import roomReducer from '../features/room/roomSlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    rooms: roomReducer,
  },
});

export default store;