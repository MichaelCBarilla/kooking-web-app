import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe(state, action) {
      state.recipes.push(action.payload);
    },
    editRecipe(state, action) {
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

export default recipesSlice.reducer;
