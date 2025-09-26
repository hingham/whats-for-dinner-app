import { getRecipes } from '../Helpers/userRequest';

export default async function fetchInitialRecipes() {
  const frozenRecipes = await getRecipes('freezer-recipes');
  const freshRecipes = await getRecipes('fresh-freezer-base-recipes');
  const frozenBase = await getRecipes('base-freezer-recipes');
  return {
    recipes: {
      frozenRecipes,
      freshRecipes,
      frozenBase,
    },
    selected: [],
  };
}
