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
  pageSize: 2,
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
      //כרגע ריק
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
        pageSize = 10,
        isNewSearch = false,
      } = action.payload;
      const filters = isNewSearch
        ? { roomName, capacity, projector, speakers, computers }
        : state.filters;
      if (isNewSearch) {
        state.filters = filters;
      }
      console.log("Filters before filtering:", filters);
      const allFiltered = state.rooms.filter((room) => {
  return (
    (filters.roomName ? room.name.includes(filters.roomName) : true) &&
    (filters.capacity ? room.capacity >= filters.capacity : true) &&
    (filters.projector ? room.projector : true) &&
    (filters.speakers ? room.speakers : true) &&
    (filters.computers ? room.computers : true)
  );
});

    
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
        state.rooms.push(action.payload);
      })
      .addCase(updateRoomAction.fulfilled, (state, action) => {
        const index = state.rooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      });
  },
});

export const {
  setRoom,
  filterRooms,
  resetFilter,
  changePageSize,
  changePageIndex,
  updateFilteredRooms,
} = roomSlice.actions;
export default roomSlice.reducer;