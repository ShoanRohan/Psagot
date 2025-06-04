import api from "./api"

const getAllCoursesStatuses = async ()=> {
    const response = await api.get('/Status/GetAllStatusCourses');
    return response.data;
};
const getAllStatusesTopics = async ()=> {
    const response = await api.get('/Status/GetAllStatusTopics');
    return response.data;
};

export {getAllCoursesStatuses,getAllStatusesTopics};