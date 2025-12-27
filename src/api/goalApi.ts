import api from '@/api';

export type GoalResponse = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  editable: boolean;
};

export type UpdateGoalRequest = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export const fetchGoals = async (): Promise<GoalResponse> => {
  const res = await api.get('/api/goals');
  return res.data;
};

export const updateGoals = async (goals: UpdateGoalRequest) => {
  const res = await api.put('/api/goals', goals);
  return res.data;
};
