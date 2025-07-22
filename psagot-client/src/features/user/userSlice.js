import {createSlice} from '@reduxjs/toolkit';
import {fetchUserById, addUserAction, updateUserAction, fetchAllUsers,fetchUsersWithPagination  } from './userAction';

const initialState = {
    users: [],
    selectedUser: null,
    status: 'idle',
    error: null,
    currentUser: null,
    total: 0,
};

const userSlice = createSlice( {
    name: 'user',
    initialState,
    reducers:{
        setUser: (state, action) =>{
            state.selectedUser = action.payload;

        }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchAllUsers.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) =>{
            console.log("Users from API:", action.payload);
            state.status ='succeeded';
            state.users =action.payload;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchUserById.pending, (state) =>{
            state.status ='loading';

        })
        .addCase(fetchUserById.fulfilled, (state, action)=>{
            state.status ='succeeded';
            state.selectedUser =action.payload;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
            state.status =' failed';
            state.error =action.error.message;
        })
          .addCase(fetchUsersWithPagination.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersWithPagination.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUsersWithPagination.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
        .addCase(addUserAction.fulfilled, (state, action) =>{
            state.user.push(action.payload);
        })
        
        .addCase(updateUserAction.fulfilled, (state, action)=> {
            const index = state.user.findIndex((user)=> user.userId===action.payload.userId);
            if (index !== -1) {
                state.users[index]=action.payload;
            }
        })
        

    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;