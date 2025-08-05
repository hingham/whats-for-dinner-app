/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// RecipeRow.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import RecipeSlider from '../RecipeSlider/recipeSlider';
import { Recipe } from '../../Models/recipe';

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

  const [slidesToShow, setSlidesToShow] = React.useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    // cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1em 2em',
        maxWidth: {
          lg: '800px', md: '800px', sm: '325px', xs: '300px',
        },
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
      <RecipeSlider recipes={recipes} slidesToShow={slidesToShow} type={type} />
    </Box>
  );
}

export default RecipeRow;
