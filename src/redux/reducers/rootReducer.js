import { combineReducers } from 'redux';
import recipesReducer from './recipesSlice';

const rootReducer = combineReducers({
  recipesState: recipesReducer,
});

export default rootReducer;
