import api from "./api";

const updateMeeting = async(updateMeeting) => {
    const response = await api.put(`/MeetingType/UpdateMeeting/${updateMeeting.id}`, updateMeeting);
    return response.data;
};

export { updateMeeting }