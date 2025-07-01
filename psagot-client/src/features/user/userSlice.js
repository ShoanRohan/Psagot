import { createSlice } from '@reduxjs/toolkit';
import {
    fetchUserById,
    addUserAction,
    updateUserAction,
    fetchAllUsers,
    fetchCoordinators,
    fetchTeachers,
    fetchAllLecturersAndCoordinators,
    fetchFilteredUseres,
    loginAction,
    registerAction
} from './userAction';

const initialState = {
    coordinators: [],
    teachers: [],
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
            // ניתן להוסיף לוגיקה אם נדרש
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchAllUsers
            .addCase(fetchAllUsers.pending, (state) => {
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

            // fetchUserById
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // addUserAction
            .addCase(addUserAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload;
                state.user.push(action.payload);
            })
            .addCase(addUserAction.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message.includes('400'))
                    state.error = 'פרטי ההזנה שגויים. יש לבדוק ולנסות שוב.';
                else if (action.error.message.includes('409'))
                    state.error = 'משתמש זה כבר קיים במערכת.';
                else
                    state.error = 'אירעה שגיאה בלתי צפויה. יש לנסות שוב מאוחר יותר.';
            })

            // updateUserAction
            .addCase(updateUserAction.fulfilled, (state, action) => {
                const index = state.user.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.user[index] = action.payload;
                }
            })

            // loginAction
            .addCase(loginAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload.user; // לא action.payload.data.user
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message.includes('400') || action.error.message.includes('401'))
                    state.error = 'פרטי ההזנה שגויים. יש לבדוק ולנסות שוב.';
                else
                    state.error = 'אירעה שגיאה בלתי צפויה. יש לנסות שוב מאוחר יותר.';
            })

            // fetchCoordinators
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

            // fetchTeachers
            .addCase(fetchTeachers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.teachers = action.payload;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // fetchAllLecturersAndCoordinators
            .addCase(fetchAllLecturersAndCoordinators.pending, (state) => {
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

            // fetchFilteredUseres
            .addCase(fetchFilteredUseres.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilteredUseres.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.users;
            })
            .addCase(fetchFilteredUseres.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(registerAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload;
                state.user.push(action.payload);
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message.includes('400'))
                    state.error = 'פרטי ההזנה שגויים. יש לבדוק ולנסות שוב.';
                else if (action.error.message.includes('409'))
                    state.error = 'משתמש זה כבר קיים במערכת.';
                else
                    state.error = 'אירעה שגיאה בלתי צפויה. יש לנסות שוב מאוחר יותר.';
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
