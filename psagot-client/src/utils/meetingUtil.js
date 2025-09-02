import api from "./api";

const getAllMeetings = async () => {
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

const getMeetingsByDate = async (viewType, from, to) => {
    const response = await api.post('/Meeting/GetMeetingsByDate', {
        viewType,
        from,
        to
    });
    return response.data;
};

export {
    getAllMeetings,
    updateMeeting,
    addMeeting,
    getMeetingeById,
    getMeetingsByDate
};
