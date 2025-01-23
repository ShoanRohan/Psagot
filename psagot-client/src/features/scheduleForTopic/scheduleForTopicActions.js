import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllScheduleForTopics, getScheduleForTopicById, getAllScheduleForTopicByTopicId, addScheduleForTopic, updateScheduleForTopic, deleteScheduleForTopic } from '../../utils/scheduleForTopicUtil';

export const fetchAllScheduleForTopics = createAsyncThunk('scheduleForTopic/fetchAllScheduleForTopics', async () => {
  const data = await getAllScheduleForTopics();
  return data;
});

export const fetchScheduleForTopicById = createAsyncThunk('scheduleForTopic/fetchScheduleForTopicById', async (id) => {
  const data = await getScheduleForTopicById(id);
  return data;
});

export const fetchAllScheduleForTopicByTopicId = createAsyncThunk('scheduleForTopic/fetchAllScheduleForTopicByTopicId', async (topicId) => {
    const data = await getAllScheduleForTopicByTopicId(topicId);
    return data;
  });

  export const addScheduleForTopicAction = createAsyncThunk('scheduleForTopic/addScheduleForTopicAction', async (newScheduleForTopic) => {
  const data = await addScheduleForTopic(newScheduleForTopic);
  return data;
});

export const updateScheduleForTopicAction = createAsyncThunk('scheduleForTopic/updateScheduleForTopicAction', async (updatedScheduleForTopic) => {
  const data = await updateScheduleForTopic(updatedScheduleForTopic);
  return data;
});

export const deleteScheduleForTopicAction = createAsyncThunk('scheduleForTopic/deleteScheduleForTopicAction', async (id) => {
    const data = await deleteScheduleForTopic(id);
    return data;
  });
