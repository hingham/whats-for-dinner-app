import React from 'react';
import {
  Box, Typography, Button,
} from '@mui/material';
import Link from 'next/link';
import './header.css';

function Header() {
  return (
    <Box sx={{ paddingTop: '1em' }}>
      <Link href="/" className="header-link">
        <Typography variant="h2" component="h1" gutterBottom sx={{ textAlign: 'center', margin: '1em .25em .25em .25em' }}>
          What&apos;s For Dinner?
        </Typography>
      </Link>
    </Box>
  );
}

interface RecipeButtonProps {
  onGetMealPlanClick: () => void;
  onViewAllRecipesClick: () => void;
  showMealPlan: boolean;
}

function RecipeViewButton({ onGetMealPlanClick, onViewAllRecipesClick, showMealPlan }:
  RecipeButtonProps) {
  return (
    <Box sx={{
      display: 'flex', gap: '1em', margin: '.5em', justifyContent: 'center',
    }}
    >
      {showMealPlan
        ? (
          <Button className="textButton" variant="text" color="primary" onClick={onViewAllRecipesClick}>
            View All Recipes
          </Button>
        )
        : (
          <Button className="textButton" variant="text" onClick={onGetMealPlanClick}>
            Get Meal Plan
          </Button>
        )}
    </Box>
  );
}

export { Header, RecipeViewButton };
