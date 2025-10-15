import React from 'react';
import { useSelector } from 'react-redux';
import { getFreshFrozenBaseRecipes, getFrozenRecipes, getFrozenBaseRecipes } from '../../Store/reselect';
import RecipeCard from '../RecipeCard/RecipeCard';
import { RootState } from '../../Store/rootReducer';
import { Recipe } from '../../Models/recipe';

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function WeeklyRecipes(): React.ReactElement {
  // Replace these selectors with your actual redux state selectors
  const frozenRecipes: Recipe[] = useSelector((state: RootState) => getFrozenRecipes(state));
  const frozenBaseRecipes: Recipe[] = useSelector((state: RootState) => getFrozenBaseRecipes(state));
  const freshFrozenBaseRecipes: Recipe[] = useSelector((state: RootState) => getFreshFrozenBaseRecipes(state));

  const [selectedFrozen, setFrozenRecipes] = React.useState<Recipe[]>(getRandomItems(frozenRecipes, 1));
  const [selectedFrozenBase, setFrozenBaseRecipes] = React.useState<Recipe[]>(getRandomItems(frozenBaseRecipes, 1));
  const [selectedFreshFrozenBase, setFreshFrozenBaseRecipes] = React.useState<Recipe[]>(getRandomItems(freshFrozenBaseRecipes, 3));

  const requestNewRecipe = (type: 'frozen' | 'frozenBase' | 'freshFrozenBase', index?: number) => {
    // Implement your logic to request a new recipe based on the type
    if (type === 'frozen') {
      const newRecipes = getRandomItems(frozenRecipes, 1);
      setFrozenRecipes(newRecipes);
    } else if (type === 'frozenBase') {
      const newRecipes = getRandomItems(frozenBaseRecipes, 1);
      setFrozenBaseRecipes(newRecipes);
    } else if (type === 'freshFrozenBase' && index !== undefined) {
      const availableRecipes = freshFrozenBaseRecipes.filter((recipe) => !selectedFreshFrozenBase.some((selected) => selected.id === recipe.id));

      if (availableRecipes.length === 0) {
        console.warn('All available recipes are already selected');
        return;
      }

      const [newRecipe] = getRandomItems(availableRecipes, 1);
      const updatedRecipes = [...selectedFreshFrozenBase];
      updatedRecipes[index] = newRecipe;

      setFreshFrozenBaseRecipes(updatedRecipes);
    }
  };

  return (
    <>
      <hr />
      <h2 className="text-3xl text-semi-bold my-4 flex justify-center">Your Weekly Recipe Plan</h2>
      <div className="py-4 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-0 justify-items-center max-w-4xl margin-auto">
        <div className="bg-white p-4 rounded shadow-md md:col-span-1">
          <p className="mb-4">
            Each week, we&apos;ll suggest a selection of recipes to help stock your freezer and plan your meals. You can refresh any recipe you&apos;d like to swap out for a new suggestion.
          </p>
          <p className="mb-4">
            Three frozen recipes - eating one and freezing the other two for later in the month.
          </p>
          <p className="mb-4">
            Three servings of one frozen base to use for fresh recipes later in the week or month.
          </p>
          <p className="mb-4">
            Checking your freezer for freezer bases on hand, and choose three fresh recipes to use them up. We&apos;ll offer suggestions!
          </p>
          <p className="mb-4">
            Once you have your recipes, click the card to view your grocery list!
          </p>
        </div>
        <div className="w-60 md:col-2">
          <h3 className="text-center text-2xl">Frozen Recipe</h3>
          <div>
            {selectedFrozen.map((recipe) => (
              <div className="my-4" key={recipe.id}>
                <RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} requestNew={() => { requestNewRecipe('frozen'); }} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-60 md:col-3">
          <h3 className="text-center text-2xl">Frozen Base Recipe</h3>
          <div className="">
            {selectedFrozenBase.map((recipe) => (
              <div className="my-4" key={recipe.id}>

                <RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} requestNew={() => { requestNewRecipe('frozenBase'); }} />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="col-span-1 justify-self-center md:justify-self-end md:mx-6 w-60" /> */}
        <h3 className="text-center text-2xl col-span-3">Fresh Recipes (Frozen Base) </h3>
        {selectedFreshFrozenBase.map((recipe, idx) => (
          <div className="my-4 w-60" key={recipe.id}>
            <RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} requestNew={() => { requestNewRecipe('freshFrozenBase', idx); }} />
          </div>
        ))}
        <div className="" />
        <div className="col-span-1 justify-self-center md:justify-self-start md:mx-6 w-60 mt-10" />
      </div>
    </>
  );
}

export default WeeklyRecipes;
