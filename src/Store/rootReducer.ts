import { combineReducers } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice.ts';

const rootReducer = combineReducers({
  recipes: recipesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
