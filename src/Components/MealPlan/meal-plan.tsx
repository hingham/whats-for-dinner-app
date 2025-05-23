/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import RecipeSlider from '../RecipeSlider/recipeSlider.tsx';
import { Recipe } from '../../Models/recipe.ts';
import RecipeRow from '../RecipeRow/recipeRow.tsx';
import './meal-plan.css';

const frozenSubTitleString = 'Recipes that can be frozen ready to go. These easy dinners are best thawed in fridge, then baked for 30 - 45 minutes before serving.';
const frozenBaseSubTitle = 'Easy recipes for simple items that can be built up to make healthy, easy, and fresh meals.';
const freshWithFrozenBaseSubTitle = 'Recipes that use a frozen base to make a quick and enjoyable meal.';

interface MealPlanProps {
  frozenRecipes: Recipe[];
  freshRecipes: Recipe[];
  frozenBaseRecipes: Recipe[];
}

function MealPlan({
  frozenRecipes = [], freshRecipes = [], frozenBaseRecipes = [],
}: MealPlanProps): React.ReactElement {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // width: '80%',
          flexWrap: 'wrap',
        }}
      // eslint-disable-next-line react/jsx-closing-bracket-location
      >
        {frozenRecipes && <RecipeRow title="Weekly Frozen Recipes" subTitle={frozenSubTitleString} quantityToSelect={1} quantityToMake={3} recipes={frozenRecipes} type="frozenRecipes" />}
        <Divider />
        {frozenBaseRecipes && <RecipeRow title="Weekly Frozen Base Recipes" subTitle={frozenBaseSubTitle} quantityToSelect={1} quantityToMake={3} recipes={frozenBaseRecipes} type="frozenBase" />}
        <Divider />
        {freshRecipes && <RecipeRow title="Weekly Fresh Recipes" subTitle={freshWithFrozenBaseSubTitle} quantityToSelect={3} quantityToMake={1} recipes={freshRecipes} type="freshRecipes" />}
      </Box>

    </div>
  );
}

export default MealPlan;
