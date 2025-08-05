/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import RecipeSlider from '../RecipeSlider/recipeSlider';
import { Recipe } from '../../Models/recipe';
import './recipeCollection.css';

interface RecipeCollectionProps {
  recipes: Recipe[];
  title: string;
  type: 'freshRecipes' | 'frozenRecipes' | 'frozenBase';
}

const cardWidth = 400;
const getRecipesPerRow = () => Math.min(3, Math.floor((window.innerWidth * 0.75) / cardWidth));

function RecipeCollectionRow({ recipes, title, type }: RecipeCollectionProps): React.ReactElement {
  console.log({ type });
  const [startIndex, setStartIndex] = React.useState(0);
  const [recipesPerRow, setRecipesPerRow] = React.useState(getRecipesPerRow());

  React.useEffect(() => {
    const handleResize = () => {
      setRecipesPerRow(getRecipesPerRow());
    };
    window.addEventListener('resize', handleResize);

    // Cleanup event listenser on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    console.log(recipesPerRow);
    setStartIndex((prev) => Math.min(prev + 1, recipes.length - recipesPerRow));
  };

  const visibleRecipes = recipes.slice(startIndex, startIndex + recipesPerRow);

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom sx={{ width: '90%' }}>
        {title}
      </Typography>
      <RecipeSlider recipes={visibleRecipes} slidesToShow={recipesPerRow} type={type} />

      {/* <div className="recipe-slider">
        <IconButton
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={startIndex + recipesPerRow >= recipes.length}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div> */}
    </div>
  );
}

interface MealPlanProps {
  frozenRecipes: Recipe[];
  freshRecipes: Recipe[];
  frozenBaseRecipes: Recipe[];
}

function RecipeCollection({
  frozenRecipes = [], freshRecipes = [], frozenBaseRecipes = [],
}: MealPlanProps): React.ReactElement {
  return (
    <div>
      <RecipeCollectionRow
        recipes={frozenRecipes}
        type="frozenRecipes"
        title="Weekly Frozen Recipes"
      />

      <RecipeCollectionRow
        recipes={freshRecipes}
        type="freshRecipes"
        title="Weekly Fresh Recipes"
      />
      <RecipeCollectionRow
        recipes={frozenBaseRecipes}
        type="frozenBase"
        title="Weekly Frozen Base Recipes"
      />
    </div>
  );
}

export default RecipeCollection;
