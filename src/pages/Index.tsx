import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { NutritionCard } from '@/components/NutritionCard';
import { FilterTabs } from '@/components/FilterTabs';
import { AddFoodDialog } from '@/components/AddFoodDialog';
import { DaySummary } from '@/components/DaySummary';
import { mockFoodEntries, dailyGoals } from '@/data/mockData';
import { FilterPeriod, FoodEntry } from '@/types/nutrition';
import { TrendingUp, Flame } from 'lucide-react';

const Index = () => {
  const [filter, setFilter] = useState<FilterPeriod>('today');
  const [entries, setEntries] = useState<FoodEntry[]>(mockFoodEntries);

  const today = new Date().toISOString().split('T')[0];

  const filteredEntries = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (filter) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
    }

    return entries.filter((entry) => new Date(entry.date) >= startDate);
  }, [entries, filter]);

  const todayEntries = entries.filter((e) => e.date === today);
  const todayTotals = todayEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const groupedByDate = useMemo(() => {
    const groups: Record<string, FoodEntry[]> = {};
    filteredEntries.forEach((entry) => {
      if (!groups[entry.date]) {
        groups[entry.date] = [];
      }
      groups[entry.date].push(entry);
    });
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [filteredEntries]);

  const handleAddFood = (newEntry: Omit<FoodEntry, 'id'>) => {
    const entry: FoodEntry = {
      ...newEntry,
      id: Date.now().toString(),
      // Simulating backend analysis with placeholder values
      calories: Math.floor(Math.random() * 300) + 100,
      protein: Math.floor(Math.random() * 30) + 5,
      carbs: Math.floor(Math.random() * 40) + 10,
      fat: Math.floor(Math.random() * 20) + 2,
    };
    setEntries((prev) => [entry, ...prev]);
  };

  const streak = 7; // Mock streak data

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Welcome Section */}
        <section className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Good morning! 👋</h2>
              <p className="text-muted-foreground">Track your nutrition, reach your goals</p>
            </div>
            <div className="flex items-center gap-2 bg-warning/10 text-warning px-3 py-2 rounded-xl">
              <Flame className="w-5 h-5" />
              <span className="font-semibold">{streak} day streak</span>
            </div>
          </div>
        </section>

        {/* Today's Summary */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-lg">Today's Progress</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <NutritionCard
              label="Calories"
              value={todayTotals.calories}
              goal={dailyGoals.calories}
              unit=" kcal"
              color="calories"
              delay={0}
            />
            <NutritionCard
              label="Protein"
              value={todayTotals.protein}
              goal={dailyGoals.protein}
              unit="g"
              color="protein"
              delay={100}
            />
            <NutritionCard
              label="Carbs"
              value={todayTotals.carbs}
              goal={dailyGoals.carbs}
              unit="g"
              color="carbs"
              delay={200}
            />
            <NutritionCard
              label="Fat"
              value={todayTotals.fat}
              goal={dailyGoals.fat}
              unit="g"
              color="fat"
              delay={300}
            />
          </div>
        </section>

        {/* Food Log */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-display font-semibold text-lg">Food Log</h3>
            <div className="flex items-center gap-3">
              <FilterTabs activeFilter={filter} onFilterChange={setFilter} />
              <AddFoodDialog onAddFood={handleAddFood} />
            </div>
          </div>

          <div className="space-y-4">
            {groupedByDate.length > 0 ? (
              groupedByDate.map(([date, dayEntries]) => (
                <DaySummary
                  key={date}
                  date={date}
                  entries={dayEntries}
                  isToday={date === today}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-xl shadow-card">
                <p className="text-muted-foreground">No entries for this period</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
