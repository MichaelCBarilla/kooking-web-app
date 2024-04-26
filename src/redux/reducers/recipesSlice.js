import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { RECIPES } from '../../assets/DUMMY_RECIPE_DATA';

const initialState = RECIPES;

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(recipe) {
        recipe.id = nanoid();
        recipe.creator = 'hardcoded';
        return {
          payload: recipe,
        };
      },
    },
    editRecipe(state, action) {
      console.log(action);
      const index = state.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteRecipe(state, action) {
      state = state.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
  },
});

export const { addRecipe, editRecipe, deleteRecipe } = recipesSlice.actions;

export const selectRecipes = (state) => state.recipes;

export default recipesSlice.reducer;
