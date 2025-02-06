import api from "./api";

const getCourseById = async (id) => {
    const response = await api.get(`/Course/GetCourseById/${id}`);
    return response.data;
};


const addCourse = async (newCourse) => {
    const response = await api.post('/Course/AddCourse', newCourse);
    return response.data;
 };


const updateCourse= async (updateCourse) => {
    const response = await api.put(`/Course/UpdateCourse`, updateCourse);
    return response.data;
};

export{updateCourse,getCourseById,addCourse};
