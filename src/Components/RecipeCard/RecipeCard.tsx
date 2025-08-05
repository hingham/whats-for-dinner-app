/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
// eslint-disable no-unused-vars
/* eslint-disable max-len */
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import { Recipe, Recipes, UserRecipe } from '../../Models/recipe';
import { addSelectedRecipe, removeSelectedRecipe, updateMultiple } from '../../Store/recipesSlice';
import { RootState } from '../../Store/rootReducer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import RecipeIdeas from './RecipeIdeas';
import { castToNumber } from '../../Helpers/number';
import NumberInput from '../NumberField/numberField';

import { getCloundinaryUrl, cld } from '../../Helpers/cloudinary';
import { getRecipeTypeFromId } from '../../Helpers/general';
import { selectUserRecipe } from '../../Store/reselect';
import RecipeDialog from '../RecipeDialog/recipeDialog';
// import {fill} from "@cloudinary/url-gen/actions/resize";

interface RecipeReviewCardProps {
  key: string;
  recipe: Recipe;
  recipeId: string;
}

export default function RecipeReviewCard({
  key,
  recipe,
  recipeId,
}: RecipeReviewCardProps) {
  const {
    name, ingredients, directions, id, base,
  } = recipe;

  const [open, setOpen] = React.useState(false);

  const [modalRecipeId, setModalRecipeId] = React.useState(recipeId);

  let image = recipe.image ? getCloundinaryUrl(recipe.image) : 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
  let description = recipe.broadCategory;

  let userRecipe = useSelector((state: RootState) => selectUserRecipe(state, id));
  const [isSelected, setSelected] = React.useState(!!userRecipe);
  React.useEffect(() => {
    setSelected(!!userRecipe);
  }, [userRecipe]);

  const multiple = userRecipe?.multiple || 1;

  const dispatch = useDispatch();
  const handleSelectClick = () => {
    if (isSelected) {
      setSelected(false);
      dispatch(removeSelectedRecipe(id));
    } else {
      setSelected(true);
      dispatch(addSelectedRecipe({ recipe, multiple }));
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // Update this parts
    setModalRecipeId(recipeId);
    if (recipeId === modalRecipeId) {
      setOpen(false);
    }
  };

  return (
    <Card sx={{
      borderRadius: '0px',
    }}
    >
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: green[400] }} aria-label="recipe">
            R
          </Avatar>
        )}
        title={name}
        subheader={description}
      />
      <CardMedia
        component="img"
        height="194"
        image={image} // TODO: Update default image
        alt="Image of prepared recipe"
      />
      {/* <AdvancedImage cldImg={image} /> */}

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="select recipe" onClick={handleSelectClick}>
          {isSelected ? <CheckIcon sx={{ color: 'green' }} /> : <AddIcon />}
        </IconButton>
        <Button onClick={handleOpen}>Open</Button>
      </CardActions>
      {open ? (
        <RecipeDialog
          modalRecipeId={modalRecipeId}
          open={open}
          handleClose={handleClose}
          setModalRecipeId={setModalRecipeId}
        />
      )
        : null}
    </Card>
  );
}
