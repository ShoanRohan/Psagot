import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRooms, getRoomById, addRoom, updateRoom,getAllRoomsBySearchWithPagination ,getRoomsScheduleByDate, deleteRoom,  } from '../../utils/roomUtil';


export const fetchAllRooms = createAsyncThunk('room/fetchAllRooms', async () => {
  const data = await getAllRooms();
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

///Pagination /א
export const fetchAllRoomsBySearchWithPagination = createAsyncThunk(
  'room/GethAllRoomsBySearchWithPagination',
  async ({ searchRoom, pageNumber, pageSize, searchStatus }) => {
    const data = await getAllRoomsBySearchWithPagination(searchRoom, pageNumber, pageSize, searchStatus);
    return data;
  }
);

export const fetchRoomsScheduleByDate = createAsyncThunk('room/GetRoomsScheduleByDate',
  async (dateTime) => {
    const data = await getRoomsScheduleByDate(dateTime);
    return data;
  }
);
export const deleteRoomAction = createAsyncThunk(
  'room/deleteRoomAction',
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoom(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);