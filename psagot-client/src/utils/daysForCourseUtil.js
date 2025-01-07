import api from "./api";

// CRUD functions
const gelAllDaysForCourse = async () => {
    const response = await api.get('/DaysForCourse/GetAllDaysForCourse');
    return response.data;
};
export {gelAllDaysForCourse}