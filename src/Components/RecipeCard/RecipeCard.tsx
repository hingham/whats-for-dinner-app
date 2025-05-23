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
import { Recipe, Recipes, UserRecipe } from '../../Models/recipe.ts';
import { addSelectedRecipe, removeSelectedRecipe, updateMultiple } from '../../Store/recipesSlice.ts';
import { RootState } from '../../Store/rootReducer.ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import RecipeIdeas from './RecipeIdeas.tsx';
import { castToNumber } from '../../Helpers/number.ts';
import NumberInput from '../NumberField/numberField.tsx';

import { getCloundinaryUrl, cld } from '../../Helpers/cloudinary.ts';
import { getRecipeTypeFromId } from '../../Helpers/general.ts';
import { selectUserRecipe } from '../../Store/reselect.ts';
import RecipeDialog from '../RecipeDialog/recipeDialog.tsx';
// import {fill} from "@cloudinary/url-gen/actions/resize";

interface RecipeReviewCardProps {
  key: string;
  recipe: Recipe;
  recipeId: string;
  recipeType: 'freshRecipes' | 'frozenRecipes' | 'frozenBase';
}

export default function RecipeReviewCard({
  key,
  recipe,
  recipeId,
  recipeType,
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
      // flex: '0 0 20em',
      // maxWidth: '25em',
      borderRadius: '0px',
      // width: '300px',
      // minWidth: '25em',
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
      {/* <Dialog
        // eslint-disable-next-line react/jsx-boolean-value
        fullScreen={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflow: 'scroll',
          padding: '0px',
        }}
        >
          <CardContent sx={{ padding: '0px' }}>
            <Box>
              <Box
                sx={{
                  padding: '.5em',
                  position: 'absolute',
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <IconButton aria-label="select recipe" onClick={handleSelectClick}>
                  {isSelected ? <CheckIcon sx={{ color: 'green', padding: '0px' }} /> : <AddIcon />}
                </IconButton>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    padding: '.5em',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {name}
                </Typography>
                <Close onClick={handleClose} />

              </Box>
              <CardMedia
                component="img"
                height="250"
                image={image} // TODO: Update default image
                alt="Image of prepared recipe"
              />
            </Box>
            <Box sx={{ margin: '15px' }}>
              <Box marginBottom="10px">
                <Typography sx={{ marginBottom: 2 }} variant="body1">
                  Ingredients:
                </Typography>
                <Box>
                  {ingredients.filter((ingredient) => ingredient.item !== '{base}').map((ingredient) => (
                    <Typography key={key} variant="body2" color="text.secondary" sx={{ padding: '0px' }}>
                      {castToNumber(ingredient.amountUS) * multiple}
                      {' '}
                      {ingredient.measurementUS}
                      {' '}
                      {ingredient.item}
                    </Typography>
                  ))}
                  {baseRecipe && ingredients.filter((ingredient) => ingredient.item === '{base}').map((ingredient) => (
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Typography key={key} variant="body2" color="text.secondary" sx={{ padding: '0px' }}>
                        {ingredient.amountUS}
                        {' '}
                        {ingredient.measurementUS}
                        {' '}
                        {baseRecipe.name}
                        {' '}
                        (Protein Base)
                      </Typography>
                      <IconButton aria-label="select recipe" onClick={handleAddBaseToMealPlan}>
                        {isBaseSelected ? <CheckIcon sx={{ color: 'green' }} /> : <AddIcon />}
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Typography sx={{ marginBottom: 2 }}>Directions:</Typography>
              {directions.map((direction) => (
                <Box key={key} color="text.secondary" marginBottom="10px">
                  {direction.steps.map((step, i) => {
                    const num = i + 1;
                    return (
                      <Typography key={uuidv4()} variant="body2" color="text.secondary" marginBottom="10px">
                        {num}
                        .
                        {step.preNote}
                        {' '}
                        {step.step}
                        {' '}
                        {step.postNote}
                      </Typography>
                    );
                  })}
                </Box>
              ))}
              <NumberInput defaultValue={multiple} onChange={handleValueChange} />
              <RecipeIdeas
                recipes={recipeIdeas}
              />
            </Box>
          </CardContent>
        </Box>
      </Dialog> */}
    </Card>
  );
}
