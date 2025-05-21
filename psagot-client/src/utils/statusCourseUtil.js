import api from "./api"

const getAllCoursesStatuses = async ()=> {
    const response = await api.get('/StatusCourse/GetAllStatusCourses');
    return response.data;
};
const getAllStatusesTopics = async ()=> {
    const response = await api.get('/StatusCourse/GetAllStatusTopics');
    return response.data;
};

export {getAllCoursesStatuses,getAllStatusesTopics};