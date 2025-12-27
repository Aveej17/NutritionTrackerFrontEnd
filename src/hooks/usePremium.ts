import { useAuth } from '@/context/AuthContext';

export const usePremium = () => {
  const { user } = useAuth();

  return {
    isPremium: Boolean(user?.isPremium),
  };
};
