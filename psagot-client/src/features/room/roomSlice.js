import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllRooms,
  fetchRoomById,
  addRoomAction,
  updateRoomAction,
} from "./roomActions";

const initialState = {
  rooms: [],
  selectedRoom: null,
  status: "idle",
  filteredRooms: [],
  loading: false,
  error: null,
  pageIndex: 0,
  pageSize: 5,
  isSearchActive: false,
  totalFilteredCount: 0,
  filters: {
    roomName: "",
    capacity: "",
    projector: false,
    speakers: false,
    computers: false,
  },
};
const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action) => {
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = null
    },
    updateFilteredRooms: (state) => {
      const allFiltered = state.isSearchActive
        ? state.rooms.filter(
          (room) =>
            (state.filters.roomName
              ? room.name.includes(state.filters.roomName)
              : true) &&
            (state.filters.capacity
              ? room.capacity >= state.filters.capacity
              : true) &&
            (state.filters.projector ? room.projector : true) &&
            (state.filters.speakers ? room.speakers : true) &&
            (state.filters.computers ? room.computers : true)
        )
        : state.rooms;
      state.totalFilteredCount = allFiltered.length;
      const start = state.pageIndex * state.pageSize;
      const end = start + state.pageSize;
      state.filteredRooms = allFiltered.slice(start, end);
    },
    changePageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    changePageIndex: (state, action) => {
      state.pageIndex = action.payload;
      const start = state.pageIndex * state.pageSize;
      const end = start + state.pageSize;
      const allFiltered = state.isSearchActive
        ? state.rooms.filter(
          (room) =>
            (state.filters.roomName
              ? room.name.includes(state.filters.roomName)
              : true) &&
            (state.filters.capacity
              ? room.capacity >= state.filters.capacity
              : true) &&
            (state.filters.projector ? room.projector : true) &&
            (state.filters.speakers ? room.speakers : true) &&
            (state.filters.computers ? room.computers : true)
        )
        : state.rooms;

      state.filteredRooms = allFiltered.slice(start, end);
    },
    filterRooms: (state, action) => {
      const {
        roomName = "",
        capacity = "",
        projector = false,
        speakers = false,
        computers = false,
        pageIndex = 0,
        pageSize = 5,
        isNewSearch = false,
      } = action.payload;
      const filters = isNewSearch
        ? { roomName, capacity, projector, speakers, computers }
        : state.filters;
      if (isNewSearch) {
        state.filters = filters;
      }
      const allFiltered = state.rooms.filter(
        (room) =>
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
      state.filters = {
        roomName: "",
        capacity: "",
        projector: false,
        speakers: false,
        computers: false,
      };
      state.pageIndex = 0;
      state.isSearchActive = false;
      const start = 0;
      const end = state.pageSize;
      state.filteredRooms = state.rooms.slice(start, end); // תצוגה רגילה
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
        const start = state.pageIndex * state.pageSize;
        const end = start + state.pageSize;
        state.filteredRooms = state.rooms.slice(start, end);
      })
      .addCase(fetchAllRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRoomById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedRoom = action.payload;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.status = "failed";
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

export const {
  setRoom,
  setSelectedRoom,
  filterRooms,
  changePageSize,
  changePageIndex,
  updateFilteredRooms,
  resetFilter,
} = roomSlice.actions;
export default roomSlice.reducer;