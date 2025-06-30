import { createSlice } from '@reduxjs/toolkit';
import { fetchAllRooms, fetchRoomById, addRoomAction, updateRoomAction } from './roomActions';

const initialState = {
  rooms: [],
  selectedRoom: null,
  status: 'idle',
  filteredRooms: null,
  loading: false,
  error: null,
  pageIndex: 0,
  pageSize: 10,
  isSearchActive: false,
  filters: {
    roomName: "",
    capacity: "",
    projector: false,
    speakers: false,
    computers: false
  }
};
const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action) => {
      // כרגע ריק
    },
    filterRooms: (state, action) => {
      const {
        roomName = "",
        capacity = "",
        projector = false,
        speakers = false,
        computers = false,
        pageIndex = 0,
        pageSize = 10,
        isNewSearch = false
      } = action.payload;
      const filters = isNewSearch
        ? { roomName, capacity, projector, speakers, computers }
        : state.filters;
      if (isNewSearch) {
        state.filters = filters;
      }
      const allFiltered = state.rooms.filter(room =>
        (filters.roomName ? room.name.includes(filters.roomName) : true) &&
        (filters.capacity ? room.capacity >= filters.capacity : true) &&
        (filters.projector ? room.projector : true) &&
        (filters.speakers ? room.speakers : true) &&
        (filters.computers ? room.computers : true)
      );
      state.isSearchActive = true;
      state.pageIndex = pageIndex;
      state.pageSize = pageSize;
      const start = pageIndex * state.pageSize;
      const end = start + state.pageSize;
      state.filteredRooms = allFiltered.slice(start, end);
    },
    resetFilter: (state) => {
      state.filteredRooms = null;
      state.pageIndex = 0;
      state.isSearchActive = false;
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
  }
});

export const { setRoom, filterRooms } = roomSlice.actions;
export default roomSlice.reducer;