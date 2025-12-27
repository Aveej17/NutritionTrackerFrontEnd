import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDailyGoals, updateDailyGoals } from '@/api/goalsApi';

export const useDailyGoals = () => {
  const queryClient = useQueryClient();

  const goalsQuery = useQuery({
    queryKey: ['daily-goals'],
    queryFn: fetchDailyGoals,
  });

  const updateGoals = useMutation({
    mutationFn: updateDailyGoals,
    onSuccess: () => {
      queryClient.invalidateQueries(['daily-goals']);
    },
  });

  return {
    goals: goalsQuery.data,
    isLoading: goalsQuery.isLoading,
    updateGoals,
  };
};
