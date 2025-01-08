import api from "./api";

const getDaysForCourseById = async (id) => {
    try {
        const response = await api.get(`/daysForCourse/GetDaysForCourseById/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getDaysForCourseById };
