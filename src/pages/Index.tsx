import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Header } from '@/components/Header';
import { NutritionCard } from '@/components/NutritionCard';
import { FilterTabs } from '@/components/FilterTabs';
import { AddFoodDialog } from '@/components/AddFoodDialog';
import { DaySummary } from '@/components/DaySummary';

import { fetchFoods } from '@/api/foodApi';
import { TrendingUp, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const Index = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('today');

  /* =======================
     Fetch foods from backend
  ======================== */
  const {
  data: entries = [],
  isFetching,
  isError,
} = useQuery({
  queryKey: ['foods', filter],
  queryFn: () => fetchFoods(filter),
  keepPreviousData: true,
  refetchOnWindowFocus: false,
});


const groupedByDate = useMemo(() => {
  const map = new Map<string, typeof entries>();

  entries.forEach((e) => {
    const date = e.date; // must be yyyy-mm-dd
    if (!map.has(date)) map.set(date, []);
    map.get(date)!.push(e);
  });

  const today = new Date().toISOString().slice(0, 10);

  return Array.from(map.entries()).map(([date, entries]) => ({
    date,
    entries,
    isToday: date === today,
  }));
}, [entries]);


  /* =======================
     Temporary Daily Goals
     (until backend exists)
  ======================== */
  const dailyGoals = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fat: 70,
  };

  /* =======================
     Totals
  ======================== */
  const totals = useMemo(() => {
    return entries.reduce(
      (acc, e) => ({
        calories: acc.calories + (e.calories || 0),
        protein: acc.protein + (e.protein || 0),
        carbs: acc.carbs + (e.carbs || 0),
        fat: acc.fat + (e.fat || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [entries]);

  const streak = 7;

  /* =======================
     Loading / Error
  ======================== */
  

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-destructive">
        Failed to load foods. Please try again.
      </p>

      <button
        onClick={() => navigate('/login')}
        className="text-primary underline hover:opacity-80"
      >
        Go to Login
      </button>
    </div>
    );
  }

  /* =======================
     UI
  ======================== */
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* HEADER */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold">Welcome Cheif</h2>
              <p className="text-muted-foreground">
                Track your meals and stay consistent
              </p>
            </div>

            <div className="flex items-center gap-2 bg-orange-500/10 text-orange-600 px-4 py-2 rounded-xl">
              <Flame className="w-5 h-5" />
              <span className="font-semibold">{streak} day streak</span>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Nutrition Overview</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <NutritionCard
              label="Calories"
              value={totals.calories}
              goal={dailyGoals.calories}
              unit="kcal"
              color="calories"
            />
            <NutritionCard
              label="Protein"
              value={totals.protein}
              goal={dailyGoals.protein}
              unit="g"
              color="protein"
            />
            <NutritionCard
              label="Carbs"
              value={totals.carbs}
              goal={dailyGoals.carbs}
              unit="g"
              color="carbs"
            />
            <NutritionCard
              label="Fat"
              value={totals.fat}
              goal={dailyGoals.fat}
              unit="g"
              color="fat"
            />
          </div>
        </section>

        {/* FOOD LOG */}
        <section className="bg-background rounded-2xl shadow-card p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold">Food Log</h3>

            <div className="flex items-center gap-3">
              <FilterTabs activeFilter={filter} onFilterChange={setFilter} />
              <AddFoodDialog />
            </div>
          </div>

          {/* Small loading indicator */}
          {isFetching && (
            <p className="text-sm text-muted-foreground mb-3">
              Updating entries…
            </p>
          )}

          


          <div className="space-y-4">
              {groupedByDate.length > 0 ? (
                    groupedByDate.map((day) => (
                      <DaySummary
                        key={day.date}
                        date={day.date}
                        entries={day.entries}
                        isToday={day.isToday}
                      />
                    ))
                  ) : (
                    <div className="text-center py-16 border border-dashed rounded-xl">
                      <p className="text-muted-foreground">No food entries yet 🍽️</p>
                    </div>
                  )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
