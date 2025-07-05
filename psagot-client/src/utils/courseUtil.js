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

const updateCourse = async (courseDTO, confirmDeleteFutureMeetings = false) => {
  try {
    const url = confirmDeleteFutureMeetings ? `/Course/UpdateCourse?confirmDeleteFutureMeetings=true` : `/Course/UpdateCourse`;
    const response = await api.put(url, courseDTO);
    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      throw({ isConflict: true, message: error.response.data.message, statusCode: 409 });
    }
    throw(error.response?.data?.message || error.message);
  }
};

const getFilterPaginatedCourses = async (filterObject, page, pageSize) => {
  const params = new URLSearchParams(filterObject).toString();
  const queryString = params ? `?${params}` : "";
  const response = await api.get(
    `/Course/GetPaginatedFilteredCourses/${page}/${pageSize}${queryString}`
  );
  return response.data;
};

export { getCourseById, getAllCourses, addCourse, updateCourse, getFilterPaginatedCourses };
