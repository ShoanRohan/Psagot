import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateMeeting } from "../../utils/meetingUtil";

export const updateMeetingAction = createAsyncThunk("meeting/updateMeetingAction", async(updatedMeeting, { rejectWithValue }) => {
    try {
      const data = await updateMeeting(updatedMeeting); 
      return data; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);
