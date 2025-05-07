import api from "./api"

const getAllUsers = async ()=> {
    const response = await api.get('/User/GetAllUsers');
    return response.data;
};

const getUserById = async (id) => {
    const response = await api.get(`/User/GetUserById/${id}`);
    return response.data;
};
const addUser = async (newUser) => {
  console.log("Adding new user:", newUser);
  const response = await api.post('/User/AddUser', newUser);  
  console.log("Response from addUser:", response.data);
    return response.data;
};

const updatedUser = async (updateUser) => {
    const response = await api.put('/User/UpdateUser',updateUser);
    return response.data;
};



export{getAllUsers, getUserById, addUser, updatedUser};