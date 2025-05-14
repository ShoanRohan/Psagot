import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMeetings, updateMeeting, addMeeting, getMeetingeById ,GetMeetingsByPage} from '../../utils/meetingUtil';

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

export const addMeetingAction = createAsyncThunk(
    "meeting/addMeetingAction",
    async (addNewMeeting) => {
        const data = await addMeeting(addNewMeeting);
        return data;
    }
);
export const fetchMeetingsByPage = createAsyncThunk(
    'meeting/fetchMeetingsByPage',
    async ({ page, pageSize }) => {
        console.log(`Fetching meetings with page: ${page}, pageSize: ${pageSize}`); // לוג לבדיקת הערכים
        if (page === undefined || pageSize === undefined) {
            throw new Error('Page or pageSize is undefined'); // שגיאה במקרה של ערכים undefined
        }
        const data = await GetMeetingsByPage(page, pageSize);
        return data;
    }
);
