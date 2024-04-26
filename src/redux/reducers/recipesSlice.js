import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { RECIPES } from '../../assets/DUMMY_RECIPE_DATA';

const initialState = {
  recipes: RECIPES,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe(state, action) {
      action.payload.id = nanoid();
      action.payload.creator = 'hardcoded';
      state.recipes.push(action.payload);
    },
    editRecipe(state, action) {
      console.log(action);
      const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
    },
    deleteRecipe(state, action) {
      state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload);
    },
  },
});

export const { addRecipe, editRecipe, deleteRecipe } = recipesSlice.actions;

export const selectRecipes = (state) => state.recipesState.recipes;

export default recipesSlice.reducer;
