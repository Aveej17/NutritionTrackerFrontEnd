import { cn } from '@/lib/utils';

interface NutritionCardProps {
  label: string;
  value: number;
  goal: number;
  unit: string;
  color: 'calories' | 'protein' | 'carbs' | 'fat';
  delay?: number;
}

const colorMap = {
  calories: 'bg-calories',
  protein: 'bg-protein',
  carbs: 'bg-carbs',
  fat: 'bg-fat',
};

const bgColorMap = {
  calories: 'bg-calories/10',
  protein: 'bg-protein/10',
  carbs: 'bg-carbs/10',
  fat: 'bg-fat/10',
};

export function NutritionCard({ label, value, goal, unit, color, delay = 0 }: NutritionCardProps) {
  const percentage = Math.min((value / goal) * 100, 100);
  
  return (
    <div 
      className="bg-card rounded-xl p-5 shadow-card animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className={cn('w-3 h-3 rounded-full', colorMap[color])} />
      </div>
      
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-display font-bold text-foreground">
          {value.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground">
          / {goal}{unit}
        </span>
      </div>
      
      <div className={cn('h-2 rounded-full overflow-hidden', bgColorMap[color])}>
        <div 
          className={cn('h-full rounded-full transition-all duration-1000 ease-out', colorMap[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        {goal - value > 0 ? `${goal - value}${unit} remaining` : 'Goal reached!'}
      </p>
    </div>
  );
}
