import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllMeetings,
  getMeetingById,
  addMeeting,
  updateMeeting,
  deleteMeeting
} from '../../utils/meetingUtil';

export const fetchAllMeetings = createAsyncThunk('meeting/fetchAllMeetings', async () => {
  const data = await getAllMeetings();
  return data;
});

export const fetchMeetingById = createAsyncThunk("meeting/fetchGetMeetingById", async (id) => {
  const data = await getMeetingById(id); // ודא שזה כתוב נכון
  return data;
});


export const addMeetingAction = createAsyncThunk(
  "meeting/addMeetingAction",
  async (addNewMeeting) => {
    const data = await addMeeting(addNewMeeting);
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
