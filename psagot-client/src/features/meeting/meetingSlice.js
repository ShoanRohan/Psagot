import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
};

const meetingSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    },
});

export const {} = meetingSlice.actions;
export default meetingSlice.reducer;
