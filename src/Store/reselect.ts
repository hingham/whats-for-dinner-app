import { createSelector } from 'reselect';
import { RootState } from './rootReducer.ts'; // Adjust the path to your RootState
import { getUuidFromId } from '../Helpers/general.ts';

// Input selectors
export const getSelectedRecipes = (state: RootState) => state.recipes.selected;
const getFrozenBaseRecipes = (state: RootState) => state.recipes.recipes.frozenBase;
// const selectRecipeId = (_: RootState, id: string) => id;
// eslint-disable-next-line max-len
const uuidFromId = (_: RootState, id: string) => (getUuidFromId(id));

// Memoized selector
// eslint-disable-next-line import/prefer-default-export
export const selectUserRecipe = createSelector(
  [getSelectedRecipes, uuidFromId],
  (selectedRecipes, id) => selectedRecipes.find((recipe) => getUuidFromId(recipe.id) === id),
);

export const getBaseRecipe = createSelector(
  [getFrozenBaseRecipes, uuidFromId],
  (baseRecipes, baseId) => baseRecipes.find((recipe) => getUuidFromId(recipe.id) === baseId),
);
