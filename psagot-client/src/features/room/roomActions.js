import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRooms, getRoomById } from '../../utils/roomUtil';

export const fetchAllRooms = createAsyncThunk('rooms/fetchAllRoom', async () => {
    const data = await getAllRooms();
    return data;
  });
  
  
  export const fetchRoomById = createAsyncThunk('rooms/fetchRoomById', async (id) => {
    const data = await getRoomById(id);
    return data;
  });
