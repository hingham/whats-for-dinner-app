'use client';

import React from 'react';
import NewRecipeForm from '../../Components/NewRecipe/newRecipe';

export default function NewRecipePage() {
  return (
    <div>
      <p className=" text-blue-400">New Recipe</p>
      <NewRecipeForm />
    </div>
  );
}
