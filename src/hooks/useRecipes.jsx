import { RECIPES } from '../assets/DUMMY_RECIPE_DATA';

import { useState } from 'react';


const useRecipes = () => {
  const [recipes, setRecipes] = useState(RECIPES);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const editRecipe = (editedRecipe) => {
    const index = recipes.findIndex(recipe => recipe.id === editedRecipe.id);

    if (index !== -1) {
      // Update the object at the found index
      recipes[index] = editedRecipe;
    }
    setRecipes(() => [...recipes]);
  };

  const deleteRecipe = (recipeId) => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
  };

  return {
    recipes,
    addRecipe,
    editRecipe,
    deleteRecipe
  };
};

export default useRecipes;
