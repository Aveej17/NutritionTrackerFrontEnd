import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nutritiontrackerbackend-production.up.railway.app',
  // baseURL: 'http://localhost:8080',
});

const AUTH_WHITELIST = [
  '/api/auth/login',
  '/api/auth/register',
];


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const url = config.url ?? '';

    const isAuthEndpoint = AUTH_WHITELIST.some((path) =>
      url.includes(path)
    );

    if (!isAuthEndpoint && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;