import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nutritiontrackerbackend-production.up.railway.app',
  // baseURL: 'http://localhost:8080',
});

const AUTH_WHITELIST = [
  '/api/auth/login',
  '/api/auth/register',
];

/* ======================
   REQUEST INTERCEPTOR
   attach token
====================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const url = config.url ?? '';

    const isAuthEndpoint = AUTH_WHITELIST.some((path) =>
      url.includes(path)
    );

    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================
   RESPONSE INTERCEPTOR
   handle 401 safely
====================== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? '';
    const method = error.config?.method ?? '';

    // 🔑 Ignore preflight & browser noise
    if (method === 'options') {
      return Promise.reject(error);
    }

    // 🔑 Only logout for REAL protected APIs
    const isProtectedApi =
      url.startsWith('/api/') &&
      !url.startsWith('/api/auth/');

    if (status === 401 && isProtectedApi) {
      console.warn('Logging out due to 401 from:', url);

      localStorage.removeItem('token');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);


export default api;
