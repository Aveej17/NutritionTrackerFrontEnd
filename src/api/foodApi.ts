
import api from '@/api';
import { mapFoodFromBackend } from '@/utils/foodMapper';

export const fetchFoods = async () => {
  const res = await api.get('/api/foods/all-new');

  if (!Array.isArray(res.data)) {
    return [];
  }

  return res.data.map(mapFoodFromBackend);
};


export const fetchDailyGoals = async () => {
//   const res = await api.get('/api/users/goals');
//   return res.data;
return null;
};
