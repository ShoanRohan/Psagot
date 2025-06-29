import api from "./api";

const getAllDaysForCourse = async () => {
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

const updateDaysForCourse = async (dayForCourse ) => {
    const response = await api.put('/DaysForCourse/UpdateDaysForCourse', dayForCourse );
    return response.data;
};

const deleteDaysForCourse = async (id) => {
    const response = await api.delete(`/DaysForCourse/DeleteDaysForCourse/${id}`); // נניח שיש נקודת קצה כזו
    return response.data;
};

const checkTopicsConflicts = async (request) => {
    const response = await api.post(`/DaysForCourse/CheckTopicsConflicts`, request)
    return response.data;
}

export { getAllDaysForCourse, getDaysForCourseById, getDaysForCourseByCourseId, addDaysForCourse, updateDaysForCourse, deleteDaysForCourse, checkTopicsConflicts };