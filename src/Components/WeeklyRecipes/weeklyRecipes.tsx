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

  const selectedFrozen = getRandomItems(frozenRecipes, 1);
  const selectedFrozenBase = getRandomItems(frozenBaseRecipes, 1);
  const selectedFreshFrozenBase = getRandomItems(freshFrozenBaseRecipes, 3);

  return (
    <>
      <hr />
      <h2 className="text-3xl text-semi-bold my-4 flex justify-center">Your Weekly Recipe Plan</h2>
      <div className="py-4 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 justify-self-center md:justify-self-end md:mx-6 w-60">
          <div className="">
            <h3 className="text-center text-2xl">Frozen Recipe</h3>
            <div>
              {selectedFrozen.map((recipe) => (
                <div className="my-4" key={recipe.id}>
                  <RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-center text-2xl">Frozen Base Recipe</h3>
            <div className="">
              {selectedFrozenBase.map((recipe) => (
                <div className="my-4" key={recipe.id}>

                  <RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} />
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="col-span-1 justify-self-center md:justify-self-start md:mx-6 w-60">
          <h3 className="text-center text-2xl">Fresh Frozen Base Recipes</h3>
          <div className="">
            {selectedFreshFrozenBase.map((recipe) => (
              <div className="justify-self-center my-4" key={recipe.id}>
                <RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeeklyRecipes;
