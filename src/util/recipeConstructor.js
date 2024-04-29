import { convertAmountToDecimal } from "./converters";

const constructIngredientsModel = (ingredients) => {
  const ingredientsModel = [];
  for (let ingredient of ingredients) {
    if (ingredient.note?.trim() === '') {
      delete ingredient.note;
    }
    const ingredientModel = {
      ...ingredient,
      amount: ingredient.amount ? convertAmountToDecimal(ingredient.amount) : undefined,
    }
    ingredientsModel.push(ingredientModel);
  }
  console.log(ingredientsModel);
};

export const constructRecipeModel = (recipe) => {
  const ingredientsModel = constructIngredientsModel(recipe.ingredients)
  const recipeModel = {
    ...recipe,
    servings: recipe.servings ? parseInt(recipe.servings) : undefined,
    caloriesPerServing: recipe.caloriesPerServing ? parseInt(recipe.caloriesPerServing) : undefined,
    totalMinutes: recipe.totalMinutes ? parseInt(recipe.totalMinutes) : undefined,
    rating: recipe.rating ? parseInt(recipe.rating) : undefined,
    ingredients: ingredientsModel,
  };
  return recipeModel;
}