// src/utils/foodMapper.js
export const mapFoodFromBackend = (food) => {
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

    // 🔑 REQUIRED FALLBACKS
    date: new Date().toISOString().split('T')[0],
    time: '--:--',
    mealType: 'snack',             // default until backend sends it
  };
};
