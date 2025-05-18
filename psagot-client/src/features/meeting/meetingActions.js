import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMeetings, updateMeeting, addMeeting, getMeetingeById, deleteMeetingById } from '../../utils/meetingUtil';

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
    });

export const fetchMeetingById = createAsyncThunk("meeting/fetchGetMeetingById", async (id) => {
    const data = await getMeetingeById(id);
    return data;
});

export const addMeetingAction = createAsyncThunk(
    "meeting/addMeetingAction",
    async (addNewMeeting) => {
        const data = await addMeeting(addNewMeeting);
        return data;
    });

// הוספת פעולה חדשה למחיקת מפגש
export const deleteMeetingAction = createAsyncThunk(
    "meeting/deleteMeetingAction",
    async (meetingId) => {
        const data = await deleteMeetingById(meetingId);
        return data; // מחזיר את ה-ID של המפגש שנמחק
    }
);
