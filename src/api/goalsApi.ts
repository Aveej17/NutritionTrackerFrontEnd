// api/goalsApi.ts
import api from '@/api';

export const fetchDailyGoals = async () => {
  const res = await api.get('/api/users/goals');
  return res.data;
};

export const updateDailyGoals = async (goals) => {
  const res = await api.put('/api/users/goals', goals);
  return res.data;
};
