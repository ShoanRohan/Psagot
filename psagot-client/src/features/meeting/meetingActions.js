import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getAllMeetings, 
  getMeetingById,  // ודא שזה כתוב נכון ללא 'e' מיותרת
  addMeeting, 
  updateMeeting, 
  deleteMeeting 
} from '../../utils/meetingUtil';

export const fetchAllMeetings = createAsyncThunk('meeting/fetchAllMeetings', async() => {
    const data = await getAllMeetings();
    return data;
});

export const fetchMeetingById = createAsyncThunk("meeting/fetchGetMeetingById", async (id) => {
    const data = await getMeetingById(id); // ודא שזה כתוב נכון
    return data;
});

export const addMeetingAction = createAsyncThunk(
  'meeting/addMeeting',
  async (meetingData) => {
    const data = await addMeeting(meetingData);
    return data;
  }
);

export const updateMeetingAction = createAsyncThunk(
  'meeting/updateMeeting',
  async (meetingData) => {
    const data = await updateMeeting(meetingData);
    return data;
  }
);

export const deleteMeetingAction = createAsyncThunk(
  'meeting/deleteMeeting',
  async (meetingId) => {
    const data = await deleteMeeting(meetingId);
    return data;
  }
);
