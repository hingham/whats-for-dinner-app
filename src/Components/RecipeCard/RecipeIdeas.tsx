/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Recipe } from '../../Models/recipe.ts';

interface RecipeIdeasProp {
  recipes: Recipe[],
  setModalRecipeId: (id: string) => void,
}

export default function RecipeIdeas({ recipes, setModalRecipeId }: RecipeIdeasProp) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ImageList sx={{ maxWidth: '400px' }} cols={2}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader sx={{ textAlign: 'center' }} component="div">Recipe Ideas:</ListSubheader>
      </ImageListItem>
      {recipes.map((recipe) => (
        <ImageListItem key={recipe.image}>
          <img
            srcSet={`${recipe.image}` || 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg'}
            src={`${recipe.image}` || 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg'}
            alt={recipe.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={recipe.name}
            subtitle={recipe.id}
            onClick={() => setModalRecipeId(recipe.id)}
            actionIcon={(
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${recipe.name}`}
              >
                <InfoIcon />
              </IconButton>
            )}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
