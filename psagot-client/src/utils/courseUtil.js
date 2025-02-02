import api from "./api";

const getCourseById = async (id) => {
    const response = await api.get(`/Course/GetCourseById/${id}`);
    return response.data;
};


const addCourse = async (newCourse) => {
    const response = await api.post('/Course/AddCourse', newCourse);
    return response.data;
 };

export{addCourse, getCourseById};