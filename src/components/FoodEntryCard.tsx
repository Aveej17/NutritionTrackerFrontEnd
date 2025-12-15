import { FoodEntry } from '@/types/nutrition';
import { Utensils, Coffee, Sun, Moon, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodEntryCardProps {
  entry: FoodEntry;
  delay?: number;
}

const mealIcons = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snack: Cookie,
};

const mealColors = {
  breakfast: 'bg-warning/10 text-warning',
  lunch: 'bg-accent/10 text-accent',
  dinner: 'bg-info/10 text-info',
  snack: 'bg-fat/10 text-fat',
};

export function FoodEntryCard({ entry, delay = 0 }: FoodEntryCardProps) {
  const Icon = mealIcons[entry.mealType];
  
  return (
    <div 
      className="bg-card rounded-xl p-4 shadow-card hover:shadow-lg transition-all duration-300 animate-slide-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110',
          mealColors[entry.mealType]
        )}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">{entry.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{entry.mealType} • {entry.time}</p>
            </div>
            <span className="text-lg font-display font-bold text-calories shrink-0">
              {entry.calories} cal
            </span>
          </div>
          
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-protein" />
              <span className="text-xs text-muted-foreground">{entry.protein}g protein</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-carbs" />
              <span className="text-xs text-muted-foreground">{entry.carbs}g carbs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-fat" />
              <span className="text-xs text-muted-foreground">{entry.fat}g fat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
