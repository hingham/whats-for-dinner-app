/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// RecipeRow.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import RecipeSlider from '../RecipeSlider/recipeSlider.tsx';
import { Recipe } from '../../Models/recipe.ts';

interface RecipeRowProps {
  title: string;
  subTitle: string;
  recipes: Recipe[]; // Replace `any` with the appropriate type for your recipes,
  quantityToSelect: number;
  quantityToMake: number;
  type: 'freshRecipes' | 'frozenRecipes' | 'frozenBase';
}

function RecipeRow({
  title, subTitle, recipes, quantityToMake, quantityToSelect, type,
}: RecipeRowProps): React.ReactElement | null {
  if (!recipes || recipes.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // margin: '2em',
        padding: '1em 2em',
        width: '325px',
        // textAlign: 'center',
      }}
    >
      <Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', width: '85%' }}>
          {title}
        </Typography>
        <Typography variant="body2" component="h2" gutterBottom sx={{ textAlign: 'center', width: '85%' }}>
          {subTitle}
        </Typography>
        {/*
        <Typography
        variant="body1" component="p" gutterBottom sx={{ textAlign: 'center', width: '85%' }}>
          {`select ${quantityToSelect}, prepare ${quantityToMake} serving(s)`}
        </Typography>
        */}
      </Box>
      <RecipeSlider recipes={recipes} slidesToShow={1} type={type} />
    </Box>
  );
}

export default RecipeRow;
