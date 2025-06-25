import { createSlice } from '@reduxjs/toolkit';
import { fetchUserById, addUserAction, updateUserAction, fetchAllUsers, fetchAllCoordinators, fetchAllLecturersAndCoordinators, loginAction } from './userAction';

const initialState = {
    coordinators: [],
    user: [],
    selectedUser: null,
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'failed';
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
                state.status = 'succeeded';
                state.selectedUser = action.payload;
                state.user.push(action.payload);
            })
            .addCase(addUserAction.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message.includes('400'))
                    state.error = 'פרטי ההזנה שגויים. יש לבדוק ולנסות שוב.';
                if (action.error.message.includes('409'))
                    state.error = 'משתמש זה כבר קיים במערכת.';
                else
                    state.error = 'אירעה שגיאה בלתי צפויה. יש לנסות שוב מאוחר יותר.';
            })
            .addCase(updateUserAction.fulfilled, (state, action) => {
                const index = state.user.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.user[index] = action.payload;
                }
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.status = 'succeeded';                
                state.selectedUser = action.payload?.data?.user;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message.includes('400' || '401'))
                    state.error = 'פרטי ההזנה שגויים. יש לבדוק ולנסות שוב.';
                else
                    state.error = 'אירעה שגיאה בלתי צפויה. יש לנסות שוב מאוחר יותר.';
            }).addCase(fetchAllLecturersAndCoordinators.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllLecturersAndCoordinators.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchAllLecturersAndCoordinators.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAllCoordinators.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.coordinators = action.payload;
            })
            .addCase(fetchAllCoordinators.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAllCoordinators.pending, (state) => {
                state.status = 'loading';

            })
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;