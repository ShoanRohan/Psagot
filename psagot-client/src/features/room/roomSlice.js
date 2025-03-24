import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllRooms, fetchRoomById, addRoomAction, updateRoomAction } from './roomActions';
import axios from 'axios';

const initialState = {
    rooms: [],
    selectedRoom: null,
    status: 'idle', // state connected: idle - מצב התחלתי, loading- בטעינה, succeeded - הצלחה, failed - נכשל
    allRooms: [], // רשימה מקורית מהשרת
    filteredRooms: [], // רשימה לאחר סינון
    loading: false,
    error: null,
      
};

// // שליפת רשימת חדרים מהשרת
// export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
//     const response = await axios.get("http://localhost:5000/api/rooms");
//     return response.data;
//   });

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        
        setRoom: (state, action) => {
            
        },
        filterRooms: (state, action) => {
            const { roomName, capacity, equipment } = action.payload;
            state.filteredRooms = state.allRooms.filter(room =>
              (roomName ? room.name.includes(roomName) : true) &&
              (capacity ? room.capacity >= capacity : true) &&
              (equipment ? room.equipment.includes(equipment) : true)
            );
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllRooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allRooms = action.payload;
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
                state.allRooms.push(action.payload);
            })
            .addCase(updateRoomAction.fulfilled, (state, action) => {
                const index = state.allRooms.findIndex((room) => room.id === action.payload.id);
                if (index !== -1) {
                    state.allRooms[index] = action.payload;
                }
            });
    },
});

export const { setRoom, filterRooms } = roomSlice.actions;
export default roomSlice.reducer;