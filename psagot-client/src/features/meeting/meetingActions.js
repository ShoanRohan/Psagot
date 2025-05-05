import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMeetings, updateMeeting, addMeeting, getMeetingeById } from '../../utils/meetingUtil';

export const fetchAllMeetings = createAsyncThunk('meeting/fetchAllMeetings', async () => {
    const data = await getAllMeetings();
    return data;
});

export const fetchMeetingById = createAsyncThunk('meeting/fetchGetMeetingById', async (id) => {
    const data = await getMeetingeById(id);
    return data;
});

export const addMeetingAction = createAsyncThunk('meeting/addMeetingAction', async (addNewMeeting) => {
    const data = await addMeeting(addNewMeeting);
    return data;
});

export const updateMeetingAction = createAsyncThunk('meeting/updateMeetingAction', async (updatedMeeting) => {
    const data = await updateMeeting(updatedMeeting);
    return data;
});