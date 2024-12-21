import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';
import userReduser from './user/userSlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    user: userReduser, 
  },
  
});


export default store;