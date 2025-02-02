import api from "./api";

const getCourseById = async (id) => {
    const response = await api.get(`/Course/GetCourseById/${id}`);
    return response.data;
};
export { getCourseById}

import api from "./api";
   


const updateCourse= async (updateCourse) => {
    const response = await api.put(`/Course/UpdateCourse`, updateCourse);
    return response.data;
};

export{updateCourse};