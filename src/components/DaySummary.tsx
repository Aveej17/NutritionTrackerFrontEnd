import { FoodEntry } from '@/types/nutrition';
import { FoodEntryCard } from './FoodEntryCard';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DaySummaryProps {
  /** YYYY-MM-DD (IST date key) */
  date: string;
  entries: FoodEntry[];
  isToday?: boolean;
}

/**
 * Convert a YYYY-MM-DD date key into a safe Date object
 * without timezone shifting bugs.
 */
const istDateFromKey = (dateKey: string) => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};


export function DaySummary({ date, entries, isToday }: DaySummaryProps) {
  const [expanded, setExpanded] = useState(isToday ?? false);

  /* =======================
     Totals
  ======================= */
  const totals = entries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  /* =======================
     Date formatting (IST-safe)
  ======================= */
  const istDate = istDateFromKey(date);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(istDate);

  const dayNumber = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
  }).format(istDate);

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between p-4 bg-card rounded-xl shadow-card hover:shadow-lg transition-all duration-300 group"
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg',
              isToday
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            )}
          >
            {dayNumber}
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

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-4 text-sm">
            <span className="text-calories font-medium">
              {totals.calories} cal
            </span>
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

      {/* ENTRIES */}
      {expanded && (
        <div className="mt-3 space-y-3 pl-4 border-l-2 border-border ml-6">
          {entries.map((entry, index) => (
            <FoodEntryCard
              key={entry.uuid}
              entry={entry}
              delay={index * 50}
            />
          ))}
        </div>
      )}
    </div>
  );
}
