import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllDays } from '../../utils/dayUtil';

export const fetchAllDays = createAsyncThunk('day/fetchAllDays', async () => {
  const data = await getAllDays();
  return data;
});