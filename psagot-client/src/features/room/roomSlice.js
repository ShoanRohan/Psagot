import { createSlice } from '@reduxjs/toolkit';
import { fetchAllRooms, fetchRoomById, addRoomAction, updateRoomAction } from './roomActions';

const initialState = {
    rooms: [],
    selectedRoom: null,
    status: 'idle', 
    filteredRooms: [],
    loading: false,
    error: null,
    pageIndex: 1, 
    pageSize: 10,  
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom: (state, action) => {

        },
        filterRooms: (state, action) => {
  const { roomName, capacity, projector, speakers, computers, pageIndex = 0 } = action.payload;
  
  const allFiltered = state.rooms.filter(room =>
    (roomName ? room.name.includes(roomName) : true) &&
    (capacity ? room.capacity >= capacity : true) &&
    (projector ? room.projector : true) &&
    (speakers ? room.speakers : true) &&
    (computers ? room.computers : true)
  );

  state.pageIndex = pageIndex; // 🔹 שומר את העמוד הנוכחי ב־state

  const start = pageIndex * state.pageSize; // 🔹 חישוב התחלה
  const end = start + state.pageSize;       // 🔹 חישוב סוף

  state.filteredRooms = allFiltered.slice(start, end); // 🔹 שמירה רק של העמוד הנוכחי
}
,
        resetFilter: (state) => {
  state.filteredRooms = null;
  state.pageIndex = 0; // ✨ מאפס גם את העמוד הנוכחי
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

export const { setRoom, filterRooms } = roomSlice.actions;
export default roomSlice.reducer;