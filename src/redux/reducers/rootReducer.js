import { combineReducers } from 'redux';
import recipesReducer from './recipesSlice';

const rootReducer = combineReducers({
  recipes: recipesReducer,
});

export default rootReducer;
