import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  recipes: [],
  status: 'idle',
  error: null
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: {
      reducer(state, action) {
        state.recipes.push(action.payload);
      },
      prepare(recipe) {
        recipe._id = nanoid();
        recipe.creator = 'hardcoded';
        return {
          payload: recipe,
        };
      },
    },
    editRecipe(state, action) {
      console.log(action);
      const index = state.recipes.findIndex(recipe => recipe._id === action.payload._id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
    },
    deleteRecipe(state, action) {
      state.recipes = state.recipes.filter(
        (recipe) => recipe._id !== action.payload
      );
    },
  },
});

export const getRecipes = createAsyncThunk('recipes/getRecipes', async () => {
  const response = await fetch('http://localhost:5555/recipes');
  console.log(response);
  return response.data;
})

export const { addRecipe, editRecipe, deleteRecipe } = recipesSlice.actions;

export const selectAllRecipes = (state) => state.recipes.recipes;

export const selectRecipeById = (state, recipeId) =>
  state.recipes.recipes.find(recipe => recipe._id === recipeId)

export default recipesSlice.reducer;
