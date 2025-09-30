'use client';

import React, { useEffect } from 'react';
// Have to use useParams with client components
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getRecipeById } from '../../../Store/reselect';
import { RootState } from '../../../Store/rootReducer';
import { Recipe } from '../../../Models/recipe';
import EditRecipe from '../../../Components/EditRecipe/editRecipe';
import { RecipeDialogContents } from '../../../Components/RecipeDialog/recipeDialog';
import { getCurrentUser, getCurrentUserRole } from '../../../Helpers/auth-helpers';

export default function RecipePageView() {
  const [edit, setEdit] = React.useState(false);
  const [isAdminUser, setIsAdminUser] = React.useState(false);

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();
      const userRole = await getCurrentUserRole();
      if (currentUser && userRole === 'admin') {
        setIsAdminUser(true);
      }
    })();
  }, []);

  const params = useParams<{ slug: string }>();
  // const userRecipe = {} as Recipe;
  const userRecipe = useSelector((state: RootState) => getRecipeById(state, params.slug)) as Recipe;
  // Example Route -> /recipes/[slug]
  // Example URL -> /recipes/123

  const onSave = () => {
    console.log('Recipe saved:', userRecipe.id);
  };

  const editRecipe = () => {
    setEdit(!edit);
  };

  if (isAdminUser) {
    return (
      <div>
        {edit
          ? <EditRecipe recipe={userRecipe} onSave={onSave} />
        // eslint-disable-next-line react/jsx-boolean-value
          : <RecipeDialogContents modalRecipeId={userRecipe.id} setModalRecipeId={() => { }} handleClose={() => { }} />}
        <div className="ml-6 mb-4">
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={editRecipe}>
            {!edit ? 'View Recipe' : 'Edit Recipe'}
          </button>
        </div>
      </div>

    );
  }

  return (
    <div>
      <RecipeDialogContents modalRecipeId={userRecipe.id} setModalRecipeId={() => { }} handleClose={() => { }} />
    </div>
  );
}
