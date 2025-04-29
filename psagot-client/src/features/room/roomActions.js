import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRooms, getRoomById, addRoom, updateRoom, getRoomScheduleByDate } from '../../utils/roomUtil';


export const fetchAllRooms = createAsyncThunk('room/fetchAllRooms', async () => {
  const data = await getAllRooms();
  return data;
});


export const fetchRoomScheduleByDate = createAsyncThunk('room/fetchRoomScheduleByDate', async () => {
  const data = await getRoomScheduleByDate();
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

//   export const updateDisplayDateAction = createAsyncThunk('room/updateDisplayDateAction', async (updateDisplayDate) => {
//     const data = await updateDisplayDate(updateDisplayDate);
//     return data;
  
// });
