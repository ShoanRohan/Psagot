import api from './api';

export const getStatusCourse = async () => {
  const response = await api.get('/StatusCourse/GetStatuses');
  return response.data;
};