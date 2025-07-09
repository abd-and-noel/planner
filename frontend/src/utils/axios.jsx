import axios from 'axios';
import { refreshAccessToken } from './token';

const API = axios.create({
    baseURL: `http://${process.env.REACT_APP_ADDRESS}:8000`,
});

API.interceptors.request.use(async (config) => {
  const publicEndpoints = ['/api/signup/', '/api/login/'];

  if (!publicEndpoints.includes(config.url)) {
    let token = localStorage.getItem('access');
    if (!token) {
      token = await refreshAccessToken();
    }
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;