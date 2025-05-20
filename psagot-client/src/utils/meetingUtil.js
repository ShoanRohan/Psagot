import { use } from "react";
import api from "./api"

const getAllMeetings = async() => {
    const response = await api.get('/Meeting/GetAllMeetings');
    return response.data;
};

const updateMeeting = async (updateMeeting) => {
    const response = await api.put("/Meeting/UpdateMeeting", updateMeeting);
    return response.data;
};

const addMeeting = async (addNewMeeting) => {
    const response = await api.post("/Meeting/AddMeeting", addNewMeeting);
    return response.data;
};

const getMeetingeById = async (id) => {
    const response = await api.get(`/Meeting/GetMeetingById/${id}`);
    return response.data;


}
const getMeetings = async ({ userName, courseName, subjectName,  date,  page, rows}) => {
    const stringToSend = '/Meeting/GetMeetings/?UserName=' + userName + '&courseName=' + courseName + '&subjectName=' + subjectName + '&date=' + date + '&page=' + page + '&rows=' + rows
    console.log(stringToSend);
    const response = await api.get(stringToSend);   
    return response.data;
};
const deleteMeetingById = async (meetingId) => {
    const response = await api.delete(`/Meeting/DeleteMeeting/${meetingId}`);
    return response.data;
};
   

export { getAllMeetings, updateMeeting, addMeeting, getMeetingeById ,getMeetings ,deleteMeetingById };

