import { NutritionCard } from '@/components/NutritionCard';

export const GoalsOverview = ({ totals, goals }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <NutritionCard label="Calories" value={totals.calories} goal={goals.calories} unit="kcal" color="calories" />
      <NutritionCard label="Protein" value={totals.protein} goal={goals.protein} unit="g" color="protein" />
      <NutritionCard label="Carbs" value={totals.carbs} goal={goals.carbs} unit="g" color="carbs" />
      <NutritionCard label="Fat" value={totals.fat} goal={goals.fat} unit="g" color="fat" />
    </div>
  );
};
