import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMeetingeById } from "../../utils/meetingUtil";  

export const fetchMeetingById = createAsyncThunk("meeting/fetchGetMeetingById", async (id) =>  {
  const data = await getMeetingeById(id);  
  return data;
});
