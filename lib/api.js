import axios from 'axios';

const api = axios.create({
  baseURL: 'https://event-server-ogs.onrender.com/api',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
