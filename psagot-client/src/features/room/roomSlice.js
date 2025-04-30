import { createSlice } from '@reduxjs/toolkit';
import { fetchAllRooms, fetchRoomById, addRoomAction, updateRoomAction, fetchRoomsScheduleByDate,fetchAllRoomsBySearchWithPagination } from './roomActions';

const initialState = {
    rooms: [],
    selectedRoom: null,
    roomSchedule: [],
    viewMode: 'rooms',
    displayDate:new Date().toLocaleDateString('en-GB'),
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
    searchRoom:{roomName:'',mic:'false',projector:'false',computer:'false',numOfSeats:0},
    roomsWithPagination:[],
    pageNumber:1,
    pageSize:10,
    totalCount:0,
    searchStatus:'false'
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        
        setRoom: (state, action) => {
            
        },
        setDisplayDate: (state, action) => {
            state.displayDate = action.payload;
        },
        setRoomSchedule: (state, action) => {
            state.roomSchedule = action.payload; 
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.rooms = action.payload;
            })
            .addCase(fetchAllRooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchRoomById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRoomById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload;
            })
            .addCase(fetchRoomById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchRoomsScheduleByDate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRoomsScheduleByDate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roomSchedule = action.payload;
            })
            .addCase(fetchRoomsScheduleByDate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
        
            .addCase(fetchAllRoomsBySearchWithPagination.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllRoomsBySearchWithPagination.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.roomsWithPagination = action.payload.rooms;  
                state.totalCount = action.payload.totalCount;  
            })
            .addCase(fetchAllRoomsBySearchWithPagination.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addRoomAction.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
            })
            .addCase(updateRoomAction.fulfilled, (state, action) => {
                const index = state.rooms.findIndex((room) => room.id === action.payload.id);
                if (index !== -1) {
                    state.rooms[index] = action.payload;
                }
                
            });
    },
});

export const { setDisplayDate,setRoom ,setViewMode } = roomSlice.actions;
export default roomSlice.reducer;