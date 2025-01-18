import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import roomReducer from '../features/room/roomSlice';
import userReducer from './user/userSlice';


const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    room: roomReducer,
    user: userReducer, 
  },
  
});


export default store;