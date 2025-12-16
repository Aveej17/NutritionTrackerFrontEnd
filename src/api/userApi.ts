import api from '@/api';


export const logoutUser = async () => {
  try {
    await api.post('/api/auth/logout');
  } catch {
    // ignore backend logout errors
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
