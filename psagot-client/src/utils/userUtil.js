import api from "./api"

const getAllUsers = async ()=> {
    const response = await api.get('/User/GetAllUsers');
    return response.data;
};

const getUserById = async (id) => {
    if (!id) {
        console.log("Calling getUserById with id:", id);
        console.error("userId is undefined or null");
        return null;
    }

    try {
        const response = await api.get(`/User/GetUserById/${id}`);  
        return response.data;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};


const addUser = async (newUser) => {
    try {
        const response = await api.post('/User/AddUser', newUser);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        }
        throw error; 
    }
};


const updatedUser = async (updateUser) => {
    const response = await api.put('/User/UpdateUser',updateUser);
    return response.data;
};

const getCoordinators = async (userTypeId = 3) => {
  const response = await api.get(`/User/GetUserNamesByUserTypeId/${userTypeId}`);
  return response.data;
};


export { getAllUsers, getUserById, addUser, updatedUser, getCoordinators };


