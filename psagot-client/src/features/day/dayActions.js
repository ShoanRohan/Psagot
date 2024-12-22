import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllDays, getDayById, addDay, updateDay } from '../../utils/dayUtil';

// getting all days
export const fetchAllDays = createAsyncThunk('day/fetchAllDays', async () => {
  const data = await getAllDays();
  return data;
});

// getting day by id
export const fetchDayById = createAsyncThunk('day/fetchDayById', async (id) => {
  const data = await getDayById(id);
  return data;
});

// adding new day
export const addDayAction = createAsyncThunk('day/addDayAction', async (newDay) => {
  const data = await addDay(newDay);
  return data;
});

// updated day
export const updateDayAction = createAsyncThunk('day/updateDayAction', async (updatedDay) => {
  const data = await updateDay(updatedDay);
  return data;
});
