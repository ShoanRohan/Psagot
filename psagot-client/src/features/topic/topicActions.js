import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTopics, getTopicById, addTopic, updateTopic, deleteTopic, getAllTopicsForCourseByCourseId } from '../../utils/topicUtil';

// getting all topics
export const fetchAllTopic = createAsyncThunk('topic/fetchAllTopic', async () => {
  const data = await getAllTopics();
  return data;
});

// getting topic by id
export const fetchTopicById = createAsyncThunk('topic/fetchTopicById', async (id) => {
  const data = await getTopicById(id);
  return data;
});

// adding new topic
export const addTopicAction = createAsyncThunk('topic/addTopicAction', async (newTopic) => {
  const data = await addTopic(newTopic);
  return data;
});

// updated topic
export const updateTopicAction = createAsyncThunk('topic/updateTopicAction', async (updatedTopic) => {
  const data = await updateTopic(updatedTopic);
  return data;
});

//delete topic
export const deleteTopicAction = createAsyncThunk('topic/deleteTopic',
  async ({ topicId, forceDelete }, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:33444/api/Topic/DeleteTopic/${topicId}${forceDelete ? '?forceDelete=true' : ''}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('שגיאה במחיקה');
      }
      // מחזירים את ה-id כדי לעדכן את הסטייט
      return topicId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// getting All Topics For Course By Course Id
export const fetchAllTopicForCourseByCourseId = createAsyncThunk('topic/fetchAllTopicFotCourseByCourseId', async (CourseId) => {
    const data = await getAllTopicsForCourseByCourseId(CourseId);
    return data;
  });

