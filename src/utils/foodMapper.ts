// src/utils/foodMapper.js
export const mapFoodFromBackend = (food) => {
  const backendDate = food.date ? new Date(food.date) : null;
  return {
    id: food.uuid,                // frontend expects id
    uuid: food.uuid,

    name: food.name ?? 'Unknown Food',
    imageUrl: food.imageUrl,

    calories: Number(food.calories ?? 0),
    protein: Number(food.protein ?? 0),
    carbs: Number(food.carbs ?? 0),
    fat: Number(food.fat ?? 0),
    fiber: Number(food.fiber ?? 0),

    
    
    date: backendDate
      ? backendDate.toISOString().split('T')[0]   // YYYY-MM-DD
      : null,

    time: backendDate
      ? backendDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '--:--',

    mealType: food.mealType??'FoodItem', 
  };
};
