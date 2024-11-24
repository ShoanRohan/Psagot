import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUserTypes, fetchUserTypeById, addUserTypeAction, updateUserTypeAction } from './userTypeActions';

const initialState = {
    userTypes: [],
    selectedUser: null,
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
};

const userSlice = createSlice({
    name: 'userType',
    initialState,
    reducers: {
        //write functions here - to save data to redux
        setUser: (state, action) => {
            // state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUserTypes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllUserTypes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userTypes = action.payload;
            })
            .addCase(fetchAllUserTypes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUserTypeById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserTypeById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserTypeById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addUserTypeAction.fulfilled, (state, action) => {
                state.userTypes.push(action.payload);
            })
            .addCase(updateUserTypeAction.fulfilled, (state, action) => {
                const index = state.userTypes.findIndex((userType) => userType.id === action.payload.id);
                if (index !== -1) {
                    state.userTypes[index] = action.payload;
                }
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
