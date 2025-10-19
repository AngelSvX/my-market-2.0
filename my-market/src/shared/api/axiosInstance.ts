import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/user", // o tu constante API_URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
