import api from './api';

const addCourse = async (newCourse) => {
    const response = await api.post('/Course/AddCourse', newCourse);
    return response.data;
 };

export{addCourse};