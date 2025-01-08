import api from "./api"

const getAllMeetings = async() => {
    const response = await api.get('/Meeting/GetAllMeetings');
    return response.data;
};

export { getAllMeetings };