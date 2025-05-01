import api from "./api";

const getCourseById = async (id) => {
  const response = await api.get(`/Course/GetCourseById/${id}`);
  return response.data;
};

const getAllCourses = async () => {
  const response = await api.get("/Course/GetAllCourses");
  return response.data;
};

const addCourse = async (courseDTO) => {
  const response = await api.post("/Course/AddCourse", courseDTO);
  return response.data;
};

const updateCourse = async (courseDTO) => {
  const response = await api.put("/Course/UpdateCourse", courseDTO);
  return response.data;
};

const getFilterPaginatedCourses = async (filterObject, page, pageSize) => {
  const params = new URLSearchParams(filterObject).toString();
  const queryString = params ? `?${params}` : "";
  const response = await api.get(`/Course/GetPaginatedFilteredCourses/${page}/${pageSize}${queryString}`);
  return response.data;
};
// const getFilterPaginatedCourses = async (filterObject,page,pageSize) => {
//     const params = new URLSearchParams(filterObject).toString();
//     const response = await api.get(`/Course/GetPaginatedFilteredCourses?${params}/${page}/${pageSize}`);
//     return response.data;
// };

const getFilterPaginatedCourses = async (filterObject, page, pageSize) => {
    console.log(filterObject)
    const params = new URLSearchParams(filterObject).toString();
    console.log(params)
    const queryString = params ? `?${params}` : ''; // ����� ���� ���� �� �� �� �������
    console.log(queryString)
    const response = await api.get(`/Course/GetPaginatedFilteredCourses/${page}/${pageSize}${queryString}`);
    console.log(response.data)
    return response.data;
  };

export { getCourseById, getAllCourses, addCourse, updateCourse, getFilterPaginatedCourses, };
