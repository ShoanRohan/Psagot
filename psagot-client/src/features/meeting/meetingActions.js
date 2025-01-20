import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMeetings, updateMeeting ,addMeeting} from '../../utils/meetingUtil';

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

export const addMeetingAction = createAsyncThunk(
    "meeting/addMeetingAction",
    async (addNewMeeting) => {
        const data = await addMeeting(addNewMeeting);
        return data;
    }
);