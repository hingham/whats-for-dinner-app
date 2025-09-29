/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Recipe } from '../../Models/recipe';

interface RecipeIdeasProp {
  recipes: Recipe[],
  setModalRecipeId: (id: string) => void,
}

export default function RecipeIdeas({ recipes, setModalRecipeId }: RecipeIdeasProp) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <div>Recipe Ideas</div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex flex-col relative">
            <img src={recipe.image} alt={recipe.name} className="min-w-20 min-h-20 border-2 border-gray-300" />
            <button onClick={() => setModalRecipeId(recipe.id)} type="button" className="text-md absolute bg-gray-100 w-full p-3">{recipe.name}</button>
          </div>
        ))}
      </div>
    </>
  );
}
