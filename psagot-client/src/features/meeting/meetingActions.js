import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMeetings, updateMeeting, addMeeting, getMeetingeById, getMeetingeByDate } from '../../utils/meetingUtil';

export const fetchAllMeetings = createAsyncThunk('meeting/fetchAllMeetings', async() => {
    const data = await getAllMeetings();
    return data;
});

export const updateMeetingAction = createAsyncThunk(
    "Meeting/updateMeetingAction",
    async (updatedMeeting) => {
        try {
            const data = await updateMeeting(updatedMeeting);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchMeetingById = createAsyncThunk("meeting/fetchGetMeetingById", async (id) => {
    const data = await getMeetingeById(id);
    return data;
});



export const fetchMeetingByDate = createAsyncThunk("meeting/fetchGetMeetingsByDate",
  async ({ viewType, from, to }, { rejectWithValue }) => {
    try {
      const data = await getMeetingeByDate({viewType, from, to});
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

export const addMeetingAction = createAsyncThunk(
    "meeting/addMeetingAction",
    async (addNewMeeting) => {
        const data = await addMeeting(addNewMeeting);
        return data;
    }
);
