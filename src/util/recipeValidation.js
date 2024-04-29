import { isInteger } from "mathjs";

export const isRecipeInvalid = (recipe) => {
  if (!recipe.title || recipe.title.trim() === '') {
    return true;
  }
  if (
    recipe.servings &&
    isNaN(recipe.servings) &&
    recipe.servings <= 0
  ) {
    return true;
  }
  if (
    recipe.caloriesPerServings &&
    isNaN(recipe.caloriesPerServings) &&
    recipe.caloriesPerServings <= 0
  ) {
    return true;
  }
  if (
    recipe.totalMinutes &&
    isNaN(recipe.totalMinutes) &&
    recipe.totalMinutes <= 0
  ) {
    return true;
  }
  if (recipe.ingredients.length == 0) {
    return true;
  }
  if (recipe.directions.length == 0) {
    return true;
  }

  return false;
};

export const isIngredientInvalid = (ingredient) => {
  if (!ingredient.name || ingredient.name.trim() === '') {
    return true;
  }
  if (!ingredient.amount || ingredient.amount?.trim() === '') {
    return true;
  }
  if (!ingredient.amountLabel || ingredient.amountLabel?.trim() === '') {
    return true;
  }

  return false;
}

export const isDirectionInvalid = (direction, directionsLength) => {
  if (!direction.directionText || direction.directionText.trim() === '') {
    return true;
  }
  if (!direction.order || direction.order.trim() === '') {
    return true;
  }
  if (!isInteger(direction.order)) {
    return true;
  }
  const orderAsNumber = parseInt(direction.order);
  if (isNaN(orderAsNumber) || orderAsNumber <= 0 || orderAsNumber > directionsLength + 1) {
    return true;
  }
  return false;
}  