import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import { FreezerRecipe, FreshFrozenBaseRecipe, Recipe } from '../../Models/recipe';
import {
  addSelectedRecipe, RecipeTypes, removeSelectedRecipe, updateMultiple,
} from '../../Store/recipesSlice';
import { RootState } from '../../Store/rootReducer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import RecipeIdeas from '../RecipeCard/RecipeIdeas';
import { castToNumber } from '../../Helpers/number';
import NumberInput from '../NumberField/numberField';

import { getCloundinaryUrl } from '../../Helpers/cloudinary';
import { getRecipeTypeFromId } from '../../Helpers/general';
import { selectUserRecipe, getBaseRecipe } from '../../Store/reselect';
// import {fill} from "@cloudinary/url-gen/actions/resize";

interface RecipeDialogContentsProps {
  handleClose: (() => void);
  modalRecipeId: string;
  // eslint-disable-next-line no-unused-vars
  setModalRecipeId: (id: string) => void;
}

function RecipeDialogContents({
  handleClose,
  modalRecipeId,
  setModalRecipeId,
}: RecipeDialogContentsProps) {
  const recipeType = getRecipeTypeFromId(modalRecipeId);

  const recipe = useSelector((state: RootState) => (
    state.recipes.recipes[recipeType as keyof RecipeTypes] || []
  ).find(
    (rec) => rec.id === modalRecipeId,
  )) || {} as FreezerRecipe | FreshFrozenBaseRecipe | Recipe;

  const image = recipe.image ? getCloundinaryUrl(recipe.image) : 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
  const {
    id, ingredients, directions, name,
  } = recipe;

  const userRecipe = useSelector((state: RootState) => selectUserRecipe(state, id));
  const [isSelected, setSelected] = React.useState(!!userRecipe);

  const multiple = castToNumber(userRecipe?.multiple || 1);

  // Question: Should we even show if base is selected -
  // or rather just "link out" to the base recipe?
  // TODO: Change how this is handled so it is more divergent and code isn't running for freezer recipe without
  const base = (recipe as FreshFrozenBaseRecipe).base || '';
  const baseRecipe = useSelector((state: RootState) => getBaseRecipe(state, base));
  const userBaseRecipe = useSelector((state: RootState) => selectUserRecipe(state, base));

  const isBaseSelected = !!userBaseRecipe;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const freshFrozenBaseRecipes = useSelector(
    (state: RootState) => state.recipes.recipes.freshRecipes,
  );

  const recipeIdeas = useMemo(() => freshFrozenBaseRecipes.filter(
    (freshRecipe) => freshRecipe.base === recipe.id.split('#')[1],
  ), [recipe]);

  const dispatch = useDispatch();
  const handleSelectClick = useCallback(() => {
    if (isSelected) {
      setSelected((s) => !s);
      dispatch(removeSelectedRecipe(id));
    } else {
      setSelected((s) => !s);
      dispatch(addSelectedRecipe({ recipe, multiple }));
    }
  }, []);

  const handleValueChange = (value: number | null) => {
    const numberValue = castToNumber(value);
    // setMultiple(numberValue);
    dispatch(updateMultiple({ recipeId: id, multiple: numberValue }));
  };

  const handleAddBaseToMealPlan = () => {
    if (!baseRecipe) {
      return;
    }
    if (isBaseSelected) {
      dispatch(removeSelectedRecipe(baseRecipe.id));
    } else {
      dispatch(addSelectedRecipe({ recipe: baseRecipe, multiple: 1 }));
      // This doesn't quite work now with the multiple thing...
    }
  };

  return (
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
          {handleClose ? <Close onClick={handleClose} /> : null}

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
              <Typography key={ingredient.item} variant="body2" color="text.secondary" sx={{ padding: '0px' }}>
                {castToNumber(ingredient.amountUS) * multiple}
                {' '}
                {ingredient.measurementUS}
                {' '}
                {ingredient.item}
              </Typography>
            ))}
            {baseRecipe && ingredients.filter((ingredient) => ingredient.item === '{base}').map((ingredient) => (
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="body2" color="text.secondary" sx={{ padding: '0px' }}>
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
          <Box color="text.secondary" marginBottom="10px">
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
          setModalRecipeId={setModalRecipeId}
        />
      </Box>
    </CardContent>
  );
}

interface RecipeDialogProps {
  handleClose: (() => void);
  modalRecipeId: string;
  // eslint-disable-next-line no-unused-vars
  setModalRecipeId: (id: string) => void;
  // eslint-disable-next-line react/require-default-props
  open?: boolean;
}

// Break up the recipe card so the modal is it's own component
// This will be rendered with modal recipe id
// When that changes on the "card" then the modal will rerender
// This function will be responsible for fetching data out of the redux store for data details
function RecipeDialog({
  handleClose,
  modalRecipeId,
  setModalRecipeId,
  open = true,
}: RecipeDialogProps) {
  return (
    <Dialog
      // eslint-disable-next-line react/jsx-boolean-value
      fullScreen={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
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
        <RecipeDialogContents
          handleClose={handleClose}
          modalRecipeId={modalRecipeId}
          setModalRecipeId={setModalRecipeId}
        />
        {/* <Box sx={{ padding: '1em' }}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </Box> */}
      </Box>
    </Dialog>
  );
}

export default RecipeDialog;
export { RecipeDialogContents };
