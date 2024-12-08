import api from "./api";
   


const updateCourse= async (updateCourse) => {
    const response = await api.put(`/Course/UpdateCourse`, updateCourse);
    return response.data;
};

export{updateCourse};