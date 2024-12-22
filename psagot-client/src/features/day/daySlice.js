import { createSlice } from '@reduxjs/toolkit';
import { fetchAllDays, fetchDayById, addDayAction, updateDayAction } from './dayActions';

const initialState = {
    days: [],
    selectedDay: null,
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
};

const daySlice = createSlice({
    name: 'day',
    initialState,
    reducers: {
        // write functions here - to save data to redux
        setDay: (state, action) => {
            // state.day = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllDays.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllDays.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.days = action.payload;
            })
            .addCase(fetchAllDays.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchDayById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDayById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedDay = action.payload;
            })
            .addCase(fetchDayById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addDayAction.fulfilled, (state, action) => {
                state.days.push(action.payload);
            })
            .addCase(updateDayAction.fulfilled, (state, action) => {
                const index = state.days.findIndex((day) => day.id === action.payload.id);
                if (index !== -1) {
                    state.days[index] = action.payload;
                }
            });
    },
});

export const { setDay } = daySlice.actions;
export default daySlice.reducer;
