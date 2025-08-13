'use client';

import React from 'react';
// Have to use useParams with client components
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getFreshFrozenBaseRecipes, getRecipeById } from '../../../Store/reselect';
import { RootState } from '../../../Store/rootReducer';
import { Recipe } from '../../../Models/recipe';
import EditRecipe from '../../../Components/EditRecipe/editRecipe';

export default function ExampleClientComponent() {
  const params = useParams<{ slug: string }>();
  // const userRecipe = {} as Recipe;
  const recipes = useSelector((state: RootState) => getFreshFrozenBaseRecipes(state));
  const userRecipe = useSelector((state: RootState) => getRecipeById(state, params.slug)) as Recipe;
  // Example Route -> /recipes/[slug]
  // Example URL -> /recipes/123
  console.log(params, userRecipe, recipes);

  const onSave = () => {
    console.log('Recipe saved:', userRecipe.id);
  };

  return (
    <div>
      <h1>
        Recipe Slug:
        {params.slug}
      </h1>
      {userRecipe ? <EditRecipe recipe={userRecipe} onSave={onSave} /> : null}
      {/* <RecipeCard key="temp" recipe={userRecipe} recipeId={params.slug} /> */}
      {/* Example of using the slug in a component */}

    </div>
  );
}
