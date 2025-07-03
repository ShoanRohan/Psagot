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
    registerAction,
    fetchUsersByPage
} from './userAction';

const initialState = {
    coordinators: [],
    users: [],
    teachers: [],
    selectedUser: null,
    status: 'idle',
    error: null,
    pageNumber: 1,
    pageSize: 10,
    totalUsers: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action) => {

        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchAllUsers
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
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
                state.users.push(action.payload);
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
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            }).addCase(updateUserAction.pending, (state) => {
                state.status = 'loading';
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
                state.teachers = action.payload.teachers;
                 state.coordinators = action.payload.coordinators;
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
                state.users = action.payload.users;
            })
            .addCase(fetchFilteredUseres.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(registerAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload;
                state.users.push(action.payload);
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message.includes('400'))
                    state.error = '���� ����� ������. �� ����� ������ ���.';
                else if (action.error.message.includes('409'))
                    state.error = '����� �� ��� ���� ������.';
                else
                    state.error = '����� ����� ���� �����. �� ����� ��� ����� ����.';
            })

            .addCase(fetchUsersByPage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsersByPage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload.users;
                state.totalUsers = action.payload.countUsers;
            })
            .addCase(fetchUsersByPage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setUsers, setPageNumber, setPageSize } = userSlice.actions;
export default userSlice.reducer;