import { FoodEntry } from '@/types/nutrition';
import { FoodEntryCard } from './FoodEntryCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DaySummaryProps {
  date: string;
  entries: FoodEntry[];
  isToday?: boolean;
}

export function DaySummary({ date, entries, isToday }: DaySummaryProps) {
  const [expanded, setExpanded] = useState(isToday ?? false);
  
  const totals = entries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-card rounded-xl shadow-card hover:shadow-lg transition-all duration-300 group"
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg',
            isToday ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          )}>
            {new Date(date).getDate()}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">
              {isToday ? 'Today' : formattedDate}
            </h3>
            <p className="text-sm text-muted-foreground">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-4 text-sm">
            <span className="text-calories font-medium">{totals.calories} cal</span>
            <span className="text-muted-foreground">
              P: {totals.protein}g • C: {totals.carbs}g • F: {totals.fat}g
            </span>
          </div>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          )}
        </div>
      </button>
      
      {expanded && (
        <div className="mt-3 space-y-3 pl-4 border-l-2 border-border ml-6">
          {entries.map((entry, index) => (
            <FoodEntryCard key={entry.id} entry={entry} delay={index * 50} />
          ))}
        </div>
      )}
    </div>
  );
}
