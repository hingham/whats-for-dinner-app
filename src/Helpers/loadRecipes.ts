/* eslint-disable max-len */
import { Recipe } from '../Models/recipe.ts';

// Not currently using this function...
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getWeeklyFrozenRecipeIdeas = (recipes: Recipe[], size = 1) => {
  // TODO: Break out this piece to be reusable when moving to database
  const len = recipes.length;

  const recipeResult: Array<Recipe> = [];

  const recipeIndexMap: Record<number, boolean> = {};
  let recipesSelected = 0;

  while (recipesSelected < size) {
    const randomIndex = Math.floor(Math.random() * len);

    if (!recipeIndexMap[randomIndex]) {
      recipeIndexMap[randomIndex] = true;
      const recipe = recipes[randomIndex];
      recipeResult.push(recipe);

      recipesSelected += 1;
    }
  }

  return recipeResult;
};

const getRandomStartIndex = (recipes: Recipe[]): number => Math.floor(Math.random() * recipes.length);

export default getRandomStartIndex;
