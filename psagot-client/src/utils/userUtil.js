import api from "./api";

const getAllUsers = async () => {
  const response = await api.get("/User/GetAllUsers");
  return response.data;
};

const getAllCoordinators = async ()=> {
    const response = await api.get('/User/GetAllCoordinators');
    return response.data;
};

const getUserById = async (id) => {
  const response = await api.get(`/User/GetUserById/${id}`);
  return response.data;
};

const getFilteredUsers = async (filteredUsersParamaters) => {
  const response = await api.get(`/User/GetFilteredPagedUsers?username=${filteredUsersParamaters.username}&phone=${filteredUsersParamaters.phone}&role=${filteredUsersParamaters.role}&isActive=${filteredUsersParamaters.isActive}&pageNumber=${filteredUsersParamaters.pageNumber}&pageSize=${filteredUsersParamaters.pageSize}`);
  return response.data;
};

const addUser = async (newUser) => {
  const response = await api.post("/User/AddUser", newUser);
  return response.data;
};
 const updatedUser = async (userData) => {
  const response = await api.put("/User/UpdateUser", userData);
  return response.data;
};
const deleteUser = async(userId) =>{
  const response = await api.delete(`/User/DeleteUser/${userId}`);
  return response.data;
};


const getAllLecturersAndCoordinators = async () => {
  const response = await api.get("/User/GetAllLecturersAndCoordinators");
  return response.data;
};

const getCoordinators = async () => {
    const response = await api.get('/User/GetCoordinators');
    return response.data;
};
const getTeachers = async () => {
    const response = await api.get('/User/GetTeachers');
    return response.data;
};

const getUsersByPage = async (pageNumber, pageSize) => {
    const response = await api.get(`/User/GetUsersByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
};

export { getAllUsers, getAllCoordinators, getUserById, addUser, updatedUser, getAllLecturersAndCoordinators, getCoordinators, getFilteredUsers, getTeachers, getUsersByPage,deleteUser };


