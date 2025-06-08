import { createSlice } from '@reduxjs/toolkit';
import { fetchAllRooms, fetchRoomById, addRoomAction, updateRoomAction,fetchAllRoomsBySearchWithPagination, 
    fetchRoomsScheduleByDate  } from './roomActions';

const initialState = {
    rooms: [],
    roomsStatus:'idle',
    selectedRoom: null,
    roomSchedule: [],
    viewMode: 'rooms',
    displayDate:new Date().toLocaleDateString('en-GB'),
    // displayDate: new Date().toISOString().split('T')[0],
    roomSchedule: [],
    viewMode: 'rooms',
    displayDate:new Date().toLocaleDateString('en-GB'),
    // displayDate: new Date().toISOString().split('T')[0],
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    error: null,
     searchRoom:{roomName:'',mic:'false',projector:'false',computer:'false',numOfSeats:0},
    roomsWithPagination:[],
    pageNumber:1,
    pageSize:10,
    totalCount:0,
    searchStatus:'false'
};
    console.log(initialState.displayDate)

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
        setDisplayDate: (state, action) => {
            state.displayDate = action.payload;
        },
        setRoomSchedule: (state, action) => {
            state.roomSchedule = action.payload; 
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        },
        
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload;
            const start = (state.pageNumber - 1) * state.pageSize;
            const end = start + state.pageSize;
            state.roomsWithPagination = state.rooms.slice(start, end);
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.pageNumber = 1; // חזרה לעמוד ראשון
            const start = 0;
            const end = start + state.pageSize;
            state.roomsWithPagination = state.rooms.slice(start, end);
        }
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRooms.pending, (state) => {
                state.roomsStatus = 'loading';
                state.roomsStatus = 'loading';
            })
            .addCase(fetchAllRooms.fulfilled, (state, action) => {
                console.log(action.payload)
                state.roomsStatus = 'succeeded';
                console.log(action.payload)
                state.roomsStatus = 'succeeded';
                state.rooms = action.payload;
                state.totalCount = action.payload.length;
                state.roomsWithPagination = state.rooms.slice(state.pageSize*(state.pageNumber-1),state.pageSize*state.pageNumber);
                console.log(state.roomsWithPagination)
            })
            .addCase(fetchAllRooms.rejected, (state, action) => {
                state.roomsStatus = 'failed';
                state.roomsStatus = 'failed';
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
                // console.log('payload:', action.payload);
                // console.log('payload:', action.payload);
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

export const { setRoom, setRoomSchedule, setPageNumber, setPageSize, setViewMode, setDisplayDate } = roomSlice.actions;
export default roomSlice.reducer;

