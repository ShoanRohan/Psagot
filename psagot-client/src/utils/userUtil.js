import api from "./api";

const getAllUsers = async () => {
  const response = await api.get("/User/GetAllUsers");
  return response.data;
};

const getUserById = async (id) => {
  const response = await api.get(`/User/GetUserById/${id}`);
  return response.data;
};

const getFilteredUsers = async (filteredUsersParamaters) => {
  const response =
    await api.get(`/User/GetFilteredPagedUsers?username=${filteredUsersParamaters.username}
        &phone=${filteredUsersParamaters.phone}&role=${filteredUsersParamaters.role}&isActive=${filteredUsersParamaters.isActive}
        &pageNumber=${filteredUsersParamaters.pageNumber}&pageSize=${filteredUsersParamaters.pageSize}`);
  return response.data;
};

const addUser = async (newUser) => {
  const response = await api.post("/User/AddUser", newUser);
  return response.data;
};

const updatedUser = async (updateUser) => {
  const response = await api.put("/User/UpdateUser", updateUser);
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

const register = async (newUser) => {
    const response = await api.post('/User/Register', newUser);
    return response.data;
};

const login = async (loginUser) => {
    const response = await api.post('/User/login', loginUser);
    return response.data; // רק .data כדי לא להעביר headers
};

export {
  getAllUsers,
  getFilteredUsers,
  getUserById,
  addUser,
  updatedUser,
  getAllLecturersAndCoordinators,
  getCoordinators,
  login,
  getTeachers,
  register,
};
