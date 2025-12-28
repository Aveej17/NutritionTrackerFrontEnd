import api from '@/api';
import { mapFoodFromBackend } from '@/utils/foodMapper';

export type FilterPeriod = 'today' | 'week' | 'month';

const FOOD_API_BY_FILTER: Record<FilterPeriod, string> = {
  today: '/api/foods/today',
  week: '/api/foods/last-7-days',
  month: '/api/foods/last-30-days',
};

export const fetchFoods = async (filter: FilterPeriod = 'today') => {
  const res = await api.get(FOOD_API_BY_FILTER[filter]);

  if (!Array.isArray(res.data)) {
    return [];
  }

  return res.data.map(mapFoodFromBackend);
};

export const fetchTodayTotals = async () => {
  const res = await api.get('/api/foods/totals',{
    params: { filter: 'today' },
  });
  return res.data;
};
