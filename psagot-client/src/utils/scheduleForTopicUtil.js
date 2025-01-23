import api from "./api";

const getAllScheduleForTopics = async () => {
    const response = await api.get('/ScheduleForTopic/GetAllScheduleForTopics');
    return response.data;
};

const getScheduleForTopicById = async (id) => {
    const response = await api.get(`/ScheduleForTopic/GetScheduleForTopicById/${id}`);
    return response.data;
};

const getAllScheduleForTopicByTopicId = async (topicId) => {
    const response = await api.get(`/ScheduleForTopic/GetAllScheduleForTopicByTopicId/${topicId}`);
    return response.data;
};

const addScheduleForTopic = async (scheduleForTopic) => {
    const response = await api.post('/ScheduleForTopic/AddScheduleForTopic', scheduleForTopic);
    return response.data;
};

const updateScheduleForTopic = async (scheduleForTopic) => {
    const response = await api.put('/ScheduleForTopic/UpdateScheduleForTopic', scheduleForTopic);
    return response.data;
};

const deleteScheduleForTopic = async (id) => {
    const response = await api.delete(`/ScheduleForTopic/DeleteScheduleForTopic/${id}`);
    return response.data;
};

export { getAllScheduleForTopics, getScheduleForTopicById, getAllScheduleForTopicByTopicId, addScheduleForTopic, updateScheduleForTopic, deleteScheduleForTopic };
