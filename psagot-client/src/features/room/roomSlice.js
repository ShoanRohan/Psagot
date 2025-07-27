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

const applyFilters = (rooms, filters) => {
  return rooms.filter(
    (room) =>
      (filters.roomName ? room.name.includes(filters.roomName) : true) &&
      (filters.capacity ? room.capacity >= filters.capacity : true) &&
      (filters.projector ? room.projector : true) &&
      (filters.speakers ? room.speakers : true) &&
      (filters.computers ? room.computers : true)
  );
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      // כרגע ריק
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = null;
    },
    updateFilteredRooms: (state) => {
      const allFiltered = state.isSearchActive
        ? applyFilters(state.rooms, state.filters)
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
      const allFiltered = state.isSearchActive
        ? applyFilters(state.rooms, state.filters)
        : state.rooms;
      const start = state.pageIndex * state.pageSize;
      const end = start + state.pageSize;
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
      const allFiltered = applyFilters(state.rooms, filters);
      state.isSearchActive = true;
      state.pageIndex = pageIndex;
      state.pageSize = pageSize;
      const start = pageIndex * state.pageSize;
      const end = start + state.pageSize;
      state.filteredRooms = allFiltered.slice(start, end);
      state.totalFilteredCount = allFiltered.length;
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
      state.filteredRooms = state.rooms.slice(start, end);
      state.totalFilteredCount = state.rooms.length;
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
        state.totalFilteredCount = state.rooms.length;
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
        state.status = "succeeded";
        // אם יש fetchAllRooms אחרי הוספה, אפשר להסיר את השורה הבאה
        state.rooms.push(action.payload);
        // עדכון filteredRooms
        const allFiltered = state.isSearchActive
          ? applyFilters(state.rooms, state.filters)
          : state.rooms;
        state.totalFilteredCount = allFiltered.length;
        const start = state.pageIndex * state.pageSize;
        const end = start + state.pageSize;
        state.filteredRooms = allFiltered.slice(start, end);
      })
      .addCase(updateRoomAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.rooms.findIndex(
          (room) => room.roomId === action.payload.roomId // או 'id' לפי המודל שלך
        );
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
        // עדכון filteredRooms
        const allFiltered = state.isSearchActive
          ? applyFilters(state.rooms, state.filters)
          : state.rooms;
        state.totalFilteredCount = allFiltered.length;
        const start = state.pageIndex * state.pageSize;
        const end = start + state.pageSize;
        state.filteredRooms = allFiltered.slice(start, end);
      });
  },
});

export const {
  setRooms,
  setSelectedRoom,
  filterRooms,
  changePageSize,
  changePageIndex,
  updateFilteredRooms,
  resetFilter,
} = roomSlice.actions;
export default roomSlice.reducer;
