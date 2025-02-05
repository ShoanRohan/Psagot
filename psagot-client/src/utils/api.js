import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44333/api', //your Server IP Address
  headers: {
    'Content-Type': 'application/json',
  },
  
  
});
const getAllUsers = async () => {
  const response = await api.get('/User/GetAllUsers'); 
  return response.data;  
};

export { getAllUsers };

export default api;
