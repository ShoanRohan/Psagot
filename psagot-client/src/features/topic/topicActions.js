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
// export const updateTopicAction = createAsyncThunk('topic/updateTopicAction', async (updatedTopic, { rejectWithValue }) => {
//   console.log(updatedTopic)
//  const data = await updateTopic(updatedTopic);
//   return data; 
// });

export const updateTopicAction = createAsyncThunk(
  'topic/updateTopicAction',
  async (updatedTopic, { rejectWithValue }) => {
    try {
      const data = await updateTopic(updatedTopic);

      // אם השרת מחזיר מחרוזת עם האזהרה - זורקים שגיאה עם ההודעה
      if (typeof data === 'string' && data.includes('לנושא קיימים מפגשים עתידיים')) {
        // מחזירים reject עם הערך הזה כדי לטפל בו בextraReducers
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//delete topic
export const deleteTopicAction = createAsyncThunk('topic/deleteTopic',
  async (deletedTopic) => {
    const data = await deleteTopic(deletedTopic);
    return data;}
);

// getting All Topics For Course By Course Id
export const fetchAllTopicForCourseByCourseId = createAsyncThunk('topic/fetchAllTopicFotCourseByCourseId', async (CourseId) => {
    const data = await getAllTopicsForCourseByCourseId(CourseId);
    return data;
  });

