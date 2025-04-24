import api from "./api";

const getCourseById = async (id) => {
    const response = await api.get(`/Course/GetCourseById/${id}`);
    return response.data;
};

const getAllCourses = async () => {
    const response = await api.get('/Course/GetAllCourses');
    return response.data;
};

const getPaginatedCourses = async (page, pageSize) => {
    const response = await api.get(`/Course/GetPaginatedCourses/${page}/${pageSize}`)
    return response.data;
}

const addCourse = async (courseDTO) => {
    const response = await api.post('/Course/AddCourse', courseDTO);
    return response.data;
};

const updateCourse = async (courseDTO) => {
    const response = await api.put('/Course/UpdateCourse', courseDTO);
    return response.data;
};
const courseFilter = async (filterObject) => {
    const params = new URLSearchParams(filterObject).toString();
    const response = await api.get(`/Course/filtered?${params}`);
    return response.data;

};


export { getCourseById, getAllCourses, getPaginatedCourses, addCourse, updateCourse,courseFilter };
