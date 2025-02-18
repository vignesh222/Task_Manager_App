import axiosInstance from "../utils/axiosInstance";



export const getTasks = async () => {
  const response = await axiosInstance.get('/tasks');
  return response.data;
};

export const addTask = async (taskData) => {
  const response = await axiosInstance.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (taskId, updatedData) => {
  const response = await axiosInstance.put(`/tasks/${taskId}`, updatedData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axiosInstance.delete(`/tasks/${taskId}`);
  return response.data;
};
