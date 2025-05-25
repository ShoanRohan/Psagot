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
};

const getAllMeetingsBySubject = async(subject) => {
    const response = await api.get(`/Meeting/GetAllMeetingsBySubject/${subject}`);
    return response.data;
};
export { getAllMeetings, updateMeeting, addMeeting, getMeetingeById, getAllMeetingsBySubject };
