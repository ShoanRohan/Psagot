import api from "./api";

const addDaysForCourse = async (newDayForCourse) => {
    const response = await api.post('/DaysForCourse/AddDaysForCourse', newDayForCourse);
    return response.data;
};

const GetDaysForCourseByCourseId = async (courseId) => {
    const response = await api.get(`/DaysForCourse/GetDaysForCourseByCourseId/${courseId}`);
    return response.data;
};

const gelAllDaysForCourse = async () => {
    const response = await api.get('/DaysForCourse/GetAllDaysForCourse');
    return response.data;
};

const getDaysForCourseById = async (id) => {
    try {
        const response = await api.get(`/daysForCourse/GetDaysForCourseById/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { addDaysForCourse, GetDaysForCourseByCourseId, gelAllDaysForCourse, getDaysForCourseById };