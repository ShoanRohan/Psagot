import { createSlice } from '@reduxjs/toolkit';
import { fetchAllRooms, fetchRoomById, addRoomAction, updateRoomAction } from './roomActions';

const initialState = {
    rooms: [],
    selectedRoom: null,
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    filteredRooms: null,
    loading: false,
    error: null,
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom: (state, action) => {

        },
        filterRooms: (state, action) => {
            const { roomName, capacity, projector, speakers, computers, array } = action.payload;
            state.filteredRooms = state.rooms.filter(room =>
                (roomName ? room.name.includes(roomName) : true) &&
                (capacity ? room.capacity >= capacity : true) &&
                (projector ? room.projector : true) &&
                (speakers ? room.speakers : true) &&
                (computers ? room.computers : true)
            );
        },
        resetFilter: (state) => {
            state.filteredRooms = null;
        }, 
        setSelectedRoom: (state, action) => {
            state.selectedRoom=null
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
                state.selectedRoom = action.payload;
            })
            .addCase(fetchRoomById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
          .addCase(addRoomAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                let _rooms = [...state.rooms];
                _rooms.push(action.payload);
                state.rooms = _rooms;
            })
            .addCase(updateRoomAction.fulfilled, (state, action) => {
              state.status = 'succeeded';
              let _rooms = [...state.rooms];
                const index = _rooms.findIndex((room) => room.id === action.payload.id);
                if (index !== -1) {
                    _rooms[index] = action.payload;
                }
                state.rooms = _rooms;
            });
    },
});

export const { setRoom, filterRooms,setSelectedRoom } = roomSlice.actions;
export default roomSlice.reducer;