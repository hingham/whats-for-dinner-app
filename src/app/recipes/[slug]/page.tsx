'use client';

import React from 'react';
// Have to use useParams with client components
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getFreshFrozenBaseRecipes, getRecipeById } from '../../../Store/reselect';
import { RootState } from '../../../Store/rootReducer';
import { Recipe } from '../../../Models/recipe';
import EditRecipe from '../../../Components/EditRecipe/editRecipe';
import { RecipeDialogContents } from '../../../Components/RecipeDialog/recipeDialog';

export default function RecipePageView() {
  const [edit, setEdit] = React.useState(false);
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

  const editRecipe = () => {
    setEdit(!edit);
  };

  return (
    <div>
      {edit
        ? <EditRecipe recipe={userRecipe} onSave={onSave} />
        // eslint-disable-next-line react/jsx-boolean-value
        : <RecipeDialogContents modalRecipeId={userRecipe.id} setModalRecipeId={() => { }} handleClose={() => { }} />}
      <div className="ml-6 mb-4">
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={editRecipe}>
          {edit ? 'View Recipe' : 'Edit Recipe'}
        </button>
      </div>
    </div>
  );
}
