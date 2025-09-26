import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { RecipesState } from './recipesSlice';

export const makeStore = (preloadedState: RecipesState) => configureStore({
  reducer: rootReducer,
  preloadedState: { recipes: preloadedState },
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
