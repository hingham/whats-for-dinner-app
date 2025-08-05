import React from 'react';
import { useSelector } from 'react-redux';
import { getFreshFrozenBaseRecipes, getFrozenRecipes, getFrozenBaseRecipes } from '../../Store/reselect';
import RecipeCard from '../RecipeCard/RecipeCard';
import { RootState } from '../../Store/rootReducer';
import { Recipe } from '../../Models/recipe';
import './weeklyRecipes.css';

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
      <h2 className="header">Your Weekly Recipe Plan</h2>
      <div className="recipe-container">
        <div className="frozen-recipes-container">
          <div>
            <h3>Frozen Recipe</h3>
            <div className="recipe-category-container">
              {selectedFrozen.map((recipe) => (
                <div className="recipe-card-container" key={recipe.id}>
                  <RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>Frozen Base Recipe</h3>
            <div className="recipe-category-container">
              {selectedFrozenBase.map((recipe) => (
                <div className="recipe-card-container" key={recipe.id}>

                  <RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} />
                </div>
              ))}
            </div>
          </div>

        </div>
        <div>
          <h3>Fresh Frozen Base Recipes</h3>
          <div className="recipe-category-container">
            {selectedFreshFrozenBase.map((recipe) => (
              <div className="recipe-card-container" key={recipe.id}>
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
