import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGoals, updateGoals } from '@/api/goalApi';

export const useGoals = () => {
  return useQuery({
    queryKey: ['goals'],
    queryFn: fetchGoals,
  });
};

export const useUpdateGoals = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGoals,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
};
