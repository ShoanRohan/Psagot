import api from "./api";

// CRUD functions
const getAllTopics = async () => {
    const response = await api.get('/Topic/GetAllTopics');
    return response.data;
};

const getTopicById = async (id) => {
    const response = await api.get(`/Topic/GetTopicById/${id}`);
    return response.data;
};

const addTopic = async (newTopic) => {
    const response = await api.post('/Topic/AddTopic', newTopic);
    return response.data;
};

const updateTopic = async (updateTopic) => {
    const response = await api.put(`/Topic/UpdateTopic/${updateTopic.id}`, updateTopic);
    return response.data;
};

const deleteTopic = async (id) => {
    const response = await api.delete(`/Topic/DeleteTopic/${id}`);
    return response.data;
};

const getAllTopicsForCourseByCourseId = async (CourseId) => {
    const response = await api.get(`/Topic/GetAllTopicsForCourseByCourseId/${CourseId}`);
    return response.data;
};

export { getAllTopics, getTopicById, addTopic, updateTopic, deleteTopic, getAllTopicsForCourseByCourseId };
