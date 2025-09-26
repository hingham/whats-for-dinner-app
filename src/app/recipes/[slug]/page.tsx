'use client';

import React from 'react';
// Have to use useParams with client components
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
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
        : <RecipeDialogContents open={true} modalRecipeId={userRecipe.id} setModalRecipeId={() => {}} handleClose={null} />}

      <Button variant="contained" color="primary" onClick={editRecipe}>
        {edit ? 'View Recipe' : 'Edit Recipe'}
      </Button>
    </div>
  );
}
