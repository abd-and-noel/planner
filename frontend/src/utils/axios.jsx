import axios from 'axios';
import { refreshAccessToken } from './token';

const API = axios.create({
  baseURL: `http://${process.env.REACT_APP_ADDRESS}`,
});

// Request interceptor to add token if exists
API.interceptors.request.use((config) => {
  const publicEndpoints = ['/api/signup/', '/api/login/'];

  if (!publicEndpoints.includes(config.url)) {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

// Response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !['/api/login/', '/api/signup/'].includes(originalRequest.url)
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return API(originalRequest); // retry original request
        }
      } catch (refreshError) {
        // refresh token failed, clear storage and redirect to login
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
