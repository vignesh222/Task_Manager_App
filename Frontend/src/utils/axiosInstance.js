import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/reducers/authReducer';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth?.token;
    if (token) {                                                                         
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for handling token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // If 401 error occurs, log the user out (token expired or invalid)
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
