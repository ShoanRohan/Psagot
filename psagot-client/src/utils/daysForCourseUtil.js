import api from "./api";

const gelAllDaysForCourse = async () => {
    const response = await api.get('/DaysForCourse/GetAllDaysForCourse');
    return response.data;
};

const getDaysForCourseById = async (id) => {
    const response = await api.get(`/DaysForCourse/GetDaysForCourseById/${id}`);
    return response.data;
};

const getDaysForCourseByCourseId = async (courseId) => {
    const response = await api.get(`/DaysForCourse/GetDaysForCourseByCourseId/${courseId}`);
    return response.data;
};

const addDaysForCourse = async (newDayForCourse) => {
    const response = await api.post('/DaysForCourse/AddDaysForCourse', newDayForCourse);
    return response.data;
};

const updateDaysForCourse = async (updateDaysForCourse) => {
    const response = await api.put('/DaysForCourse/UpdateDaysForCourse', updateDaysForCourse);
    return response.data;
};

export { gelAllDaysForCourse, getDaysForCourseById, getDaysForCourseByCourseId, addDaysForCourse, updateDaysForCourse };