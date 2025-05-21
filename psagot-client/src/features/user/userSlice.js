import {createSlice} from '@reduxjs/toolkit';
import { fetchUserById, addUserAction, updateUserAction, fetchAllUsers, fetchAllCoordinators, fetchAllLecturersAndCoordinators, fetchUsersByPage } from './userAction';

const initialState = {
    coordinators:[],
    users: [],
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
    reducers:{
        setUser: (state, action) =>{

        },
        setPageNumber: (state, action) =>{
            state.pageNumber = action.payload
        },
        setPageSize: (state, action) =>{
            state.pageSize = action.payload
        }
    },
    
    extraReducers: (builder) =>{
        builder.addCase(fetchAllUsers.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) =>{
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
        .addCase(fetchUserById. fulfilled, (state, action)=>{
            state.status ='succeeded';
            state.selectedUser =action.payload;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
            state.status =' failed';
            state.error =action.error.message;
        })
        .addCase(addUserAction.fulfilled, (state, action) =>{
            state.users.puse(action.payload);
        })
        .addCase(updateUserAction.fulfilled, (state, action)=> {
            const index = state.users.findIndex((user)=> user.id===action.payload.id);
            if (index !== -1) {
                state.users[index]=action.payload;
            }
        }).addCase(fetchAllLecturersAndCoordinators.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchAllLecturersAndCoordinators.fulfilled, (state, action) =>{
            state.status ='succeeded';
            state.users =action.payload;
        })
        .addCase(fetchAllLecturersAndCoordinators.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        
        .addCase(fetchUsersByPage.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchUsersByPage.fulfilled, (state, action)=> {
            state.status ='succeeded';
            state.users =action.payload.users;
            state.totalUsers=action.payload.countUsers;
        })
        .addCase(fetchUsersByPage.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        })
        .addCase(fetchAllCoordinators.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.coordinators = action.payload;
        })
        .addCase(fetchAllCoordinators.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchAllCoordinators.pending, (state) =>{
            state.status ='loading';

        });
    },
});

export const { setUser,setPageNumber,setPageSize } = userSlice.actions;
export default userSlice.reducer;