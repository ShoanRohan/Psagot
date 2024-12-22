

import api from './api'

const deleteCourse = async (id) => {
    const response = await api.delete(`/Course/DeleteCourse/${id}`);
    return response.data;
};