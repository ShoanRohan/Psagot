import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMeetings } from '../../utils/meetingUtil';

export const fetchAllMeetings = createAsyncThunk('meeting/fetchAllMeetings', async() => {
    const data = await getAllMeetings();
    return data;
});