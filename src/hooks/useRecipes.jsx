import { RECIPES } from '../assets/DUMMY_RECIPE_DATA';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useRecipes = () => {
  const [recipes, setRecipes] = useState(RECIPES);
  const navigate = useNavigate();

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => {
      const updatedRecipes = [...prevRecipes, newRecipe];
      console.log(updatedRecipes);
      navigate(`/recipes/${newRecipe.id}`);
      return updatedRecipes;
    });
  };

  const editRecipe = (editedRecipe) => {
    const index = recipes.findIndex(recipe => recipe.id === editedRecipe.id);

    if (index !== -1) {
      recipes[index] = editedRecipe;
    }
    setRecipes(() => [...recipes]);
    navigate(`/recipes/${editedRecipe.id}`);
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
