import { createSlice } from '@reduxjs/toolkit';
import { fetchUserById, addUserAction, updateUserAction, fetchAllUsers, fetchCoordinators } from './userAction';

const initialState = {
    user: [],
    selectedUser: null,
    coordinators: [],
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        clearUser: (state) => {
            state.selectedUser = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                console.error("fetchUserById failed:", action.payload || action.error);
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                console.log("fetchUserById fulfilled with:", action.payload);
                state.error = action.error.message;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';

            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = ' failed';
                state.error = action.error.message;
            })
            .addCase(addUserAction.fulfilled, (state, action) => {
                state.user.push(action.payload);
                state.selectedUser = action.payload;
            })
            .addCase(updateUserAction.fulfilled, (state, action) => {
                const index = state.user.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.user[index] = action.payload;
                }
            })
            .addCase(fetchCoordinators.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCoordinators.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.coordinators = action.payload;
            })
            .addCase(fetchCoordinators.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
