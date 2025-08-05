/* eslint-disable react/jsx-boolean-value */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import { v4 as uuidv4 } from 'uuid';
import BasicRecipeCard from '../RecipeCard/RecipeCard';
import { Recipe } from '../../Models/recipe';
import './recipeSlider.css';

interface RecipeSliderProps {
  recipes: Recipe[];
  slidesToShow: number;
  startIndex?: number;
  type: 'freshRecipes' | 'frozenRecipes' | 'frozenBase';
}

function RecipeSlider({
  recipes, slidesToShow, type, startIndex = 0,
}: RecipeSliderProps):
React.ReactElement {
  return (
    // eslint-disable-next-line indent
    // <Box sx={{
    //   display: 'flex',
    //   flexWrap: 'nowrap', // Ensure cards are in a single row
    //   width,
    //   maxWidth: '1200px',
    //   // margin: '5em',
    //   // alignContent: 'center',
    //   // alignItems: 'center',
    //   justifyContent: 'center',
    //   gap: '2em',
    //   marginBottom: '2em',
    // }}
    // >

    <Slider
      speed={500}
      slidesToScroll={1}
      slidesToShow={slidesToShow}
      arrows={true}
      initialSlide={startIndex}
    >
      {recipes.map((recipe) => (
        <BasicRecipeCard
          key={recipe.id}
          recipe={recipe}
          recipeId={recipe.id}
        />
      ))}
    </Slider>

    // </Box>
  );
}

RecipeSlider.defaultProps = {
  startIndex: 0,
};

export default RecipeSlider;
