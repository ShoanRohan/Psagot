import { configureStore } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userType/userTypeSlice';

const store = configureStore({
  reducer: {
    userType: userTypeReducer, //Slice of userType
    //nothing nothing nothing
    aa
  },
});

export default store;