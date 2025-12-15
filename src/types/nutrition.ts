export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodEntry {
  uuid: string;
  name: string;
  imageUrl: string;

  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;

  date?: string;
  time?: string;
  mealType?: MealType ;
}



export interface DailySummary {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  entries: FoodEntry[];
}

export type FilterPeriod = 'today' | 'week' | 'month';
