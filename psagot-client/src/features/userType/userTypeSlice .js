import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: null,
  isAuthenticated: false,
  user: null,
  status: 'idle',
  error: null
};

const userTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.userType = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setUserType, 
  setAuthenticated, 
  setUser, 
  logout, 
  setStatus, 
  setError 
} = userTypeSlice.actions;

export default userTypeSlice.reducer;
