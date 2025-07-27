import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRooms, getRoomById, addRoom, updateRoom } from '../../utils/roomUtil';

export const fetchAllRooms = createAsyncThunk('room/fetchAllRooms', async () => {
  const data = await getAllRooms();
  return data;
});

export const fetchRoomById = createAsyncThunk('room/fetchRoomById', async (id) => {
  const data = await getRoomById(id);
  return data;
});

export const addRoomAction = createAsyncThunk('room/addRoomAction', async (newRoom, { dispatch }) => {
  const data = await addRoom(newRoom);
  // לאחר הוספה טען מחדש את החדרים
  dispatch(fetchAllRooms());
  return data;
});

export const updateRoomAction = createAsyncThunk('room/updateRoomAction', async (updatedRoom, { dispatch }) => {
  const data = await updateRoom(updatedRoom);
  // לאחר עדכון טען מחדש את החדרים
  dispatch(fetchAllRooms());
  return data;
});
