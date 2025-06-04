import api from "./api";

const getCourseById = async (id) => {
    const response = await api.get(`/Course/GetCourseById/${id}`);
    return response.data;
};

const getAllCourses = async () => {
    const response = await api.get('/Course/GetAllCourses');
    return response.data;
};

const addCourse = async (courseDTO) => {
    const response = await api.post('/Course/AddCourse', courseDTO);
    return response.data;
};

const updateCourse = async (courseDTO) => {
    const response = await api.put('/Course/UpdateCourse', courseDTO);
    return response.data;
};
const filterCourses = async (filter) => {
  const response = await api.post('/Course/FilterCourses', filter);
  return response.data;
};
const getExistingCourseYears = async () => {
  const response = await api.get('/Course/GetExistingYears');
  return response.data;
};


export { getCourseById, getAllCourses, addCourse, updateCourse , filterCourses, getExistingCourseYears};
