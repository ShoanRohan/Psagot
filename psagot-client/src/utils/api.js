import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7270/api', //your Server IP Address
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
