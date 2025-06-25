import api from './api';

export const getAllStatusCourse = async () => {
  const response = await api.get('/StatusCourse/GetAllStatusCourses');
  return response.data;
};
