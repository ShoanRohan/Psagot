import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRooms, getRoomById, addRoom, updateRoom, getRoomsScheduleByDate,getAllRoomsBySearchWithPagination } from '../../utils/roomUtil';
import api from '../../utils/api';



export const fetchAllRooms = createAsyncThunk('room/fetchAllRooms', async () => {
  const data = await getAllRooms();
  return data;
});
export const fetchRoomsScheduleByDate = createAsyncThunk('room/fetchRoomsScheduleByDate', async (dateTime) => {
  const data = await getRoomsScheduleByDate(dateTime);
  return data;
});

export const fetchRoomById = createAsyncThunk('room/fetchRoomById', async (id) => {
  const data = await getRoomById(id);
  return data;
});

export const addRoomAction = createAsyncThunk('room/addRoomAction', async (newRoom) => {
  const data = await addRoom(newRoom);
  return data;
});

export const updateRoomAction = createAsyncThunk('room/updateRoomAction', async (updatedRoom) => {
  const data = await updateRoom(updatedRoom);
  return data;
});

export const fetchAllRoomsBySearchWithPagination = createAsyncThunk(
  'room/fetchAllRoomsBySearchWithPagination',
  async (params, thunkAPI) => {
    try {
      const response = await api.post('/rooms/search', params);
      console.log("params:", params); // לוודא שהפרמטרים מגיעים
      console.log("response:", response.data); // לוודא שהתשובה מהשרת תקינה
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


