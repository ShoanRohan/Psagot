import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateMeeting } from "../../utils/meetingUtil";

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
