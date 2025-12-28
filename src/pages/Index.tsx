import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Header } from '@/components/Header';
import { NutritionCard } from '@/components/NutritionCard';
import { ErrorState } from "@/components/ErrorState";
import { FilterTabs } from '@/components/FilterTabs';
import { AddFoodDialog } from '@/components/AddFoodDialog';
import { DaySummary } from '@/components/DaySummary';
import { ConfigureGoalsDialog } from '@/components/ConfigureGoalsDialog';

import { fetchFoods,fetchTodayTotals } from '@/api/foodApi';
import { useGoals } from '@/hooks/useDailyGoals';
import { GoalsOverview } from '@/components/GoalsOverview';
import { useAuth } from '@/context/AuthContext';
import { getDateKey } from '@/utils/date';


import { TrendingUp, Flame } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'today' | 'week' | 'month'>('today');
  const { user } = useAuth();

  /* =======================
     Fetch foods
  ======================= */
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

  /* =======================
     Fetch goals
  ======================= */
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const [open, setOpen] = useState(false);

  /* =======================
     Group entries by date
  ======================= */

  // const getDateKey = (date: string) =>
  // new Intl.DateTimeFormat("en-CA", {
  //   timeZone: "Asia/Kolkata",
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // }).format(new Date(date)); // yyyy-mm-dd

  const groupedByDate = useMemo(() => {
  const map = new Map<string, typeof entries>();

  entries.forEach((e) => {
    const dateKey = getDateKey(e.date);
    if (!map.has(dateKey)) map.set(dateKey, []);
    map.get(dateKey)!.push(e);
  });

  const todayKey = getDateKey(new Date());

  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a)) // newest first
    .map(([date, entries]) => ({
      date,
      entries,
      isToday: date === todayKey,
    }));
}, [entries]);



  /* =======================
     Totals
  ======================= */
  const { data: totals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      }} = useQuery({
        queryKey: ['today-totals'],
        queryFn: fetchTodayTotals,
        enabled: filter === 'today',
      });

  const streak = 7;

  /* =======================
     Error handling
  ======================= */
  if (isError) {
  return (
    <ErrorState
      title="Failed to load data"
      message="Something went wrong while fetching your foods."
      actionLabel="Go to Login"
      onAction={() => navigate("/login")}
    />
  );
}
  /* =======================
     UI
  ======================= */
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* HEADER */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold">Welcome {user?.name ?? 'Chief'}</h2>
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
        {filter === 'today' && (
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Nutrition Overview</h3>
            </div>

            {!goalsLoading && goals && (
              goals.editable ? (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-muted-foreground">
                    Customize your daily nutrition goals
                  </p>
                  <button
                    onClick={() => setOpen(true)}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Customize
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-muted-foreground">
                    Upgrade to unlock advanced goal customization
                  </p>
                  <button
                    onClick={() => navigate('/upgrade')}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Upgrade
                  </button>
                </div>
              )
            )}
          </div>

          {/* Goals content */}
          {goalsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-muted animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : goals ? (
            <>
              <GoalsOverview totals={totals} goals={goals} />
              <ConfigureGoalsDialog
                open={open}
                onClose={() => setOpen(false)}
                goals={goals}
              />
            </>
          ) : null}
        </section>)}
        {/* FOOD LOG */}
        <section className="bg-background rounded-2xl shadow-card p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold">Food Log</h3>

            <div className="flex items-center gap-3">
              <FilterTabs
                activeFilter={filter}
                onFilterChange={setFilter}
              />
              <AddFoodDialog />
            </div>
          </div>

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
                <p className="text-muted-foreground">
                  No food entries yet 🍽️
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
