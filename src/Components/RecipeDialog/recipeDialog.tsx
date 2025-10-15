import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import { FreezerRecipe, FreshFrozenBaseRecipe, Recipe } from '../../Models/recipe';
import {
  addSelectedRecipe, removeSelectedRecipe, updateMultiple,
} from '../../Store/recipesSlice';
import { RootState } from '../../Store/rootReducer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import RecipeIdeas from '../RecipeCard/RecipeIdeas';
import { castToNumber } from '../../Helpers/number';
import NumberInput from '../NumberField/numberField';

import { getCloundinaryUrl } from '../../Helpers/cloudinary';
import { selectUserRecipe, getBaseRecipe, getRecipeById } from '../../Store/reselect';

interface RecipeDialogContentsProps {
  handleClose: (() => void) | null;
  modalRecipeId: string;
  // eslint-disable-next-line no-unused-vars
  setModalRecipeId: (id: string) => void;
}

function RecipeDialogContents({
  modalRecipeId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  setModalRecipeId,
  handleClose = null,
}: RecipeDialogContentsProps) {
  const recipe = useSelector((state: RootState) => getRecipeById(state, modalRecipeId)) as FreezerRecipe | FreshFrozenBaseRecipe | Recipe;
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
  console.log({ ingredients, base, baseRecipe });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const isBaseSelected = !!userBaseRecipe;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const freshFrozenBaseRecipes = useSelector(
    (state: RootState) => state.recipes.recipes.freshRecipes,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
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

  // const handleAddBaseToMealPlan = () => {
  //   if (!baseRecipe) {
  //     return;
  //   }
  //   if (isBaseSelected) {
  //     dispatch(removeSelectedRecipe(baseRecipe.id));
  //   } else {
  //     dispatch(addSelectedRecipe({ recipe: baseRecipe, multiple: 1 }));
  //     // This doesn't quite work now with the multiple thing...
  //   }
  // };

  return (
    <div className="grid grid-cols-1 p-6">
      <div
        className="flex flex-row justify-between items-center border-b border-gray-300"
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

      </div>

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 sm:grid-cols-2 gap-4 border-b border-gray-300 mb-10">
        {/* image */}
        <CardMedia
          sx={{ }}
          component="img"
          image={image} // TODO: Update default image
          alt="Image of prepared recipe"
        />
        {/* ingredients */}
        <div className="p-4">
          <Typography sx={{ marginBottom: 2 }}>
            Ingredients:
          </Typography>
          <div className="text-sm">
            {ingredients.filter((ingredient) => ingredient.item !== '{base}').map((ingredient) => (
              <div key={ingredient.item} className={`${ingredient.optional ? 'text-gray-500 italic' : 'text-black'}`}>
                {castToNumber(ingredient.amountUS) * multiple}
                {' '}
                {ingredient.measurementUS}
                {' '}
                {ingredient.item}
              </div>
            ))}
            {baseRecipe && ingredients.filter((ingredient) => ingredient.item === '{base}').map((ingredient) => (
              <div key={ingredient.item} className="flex items-center">
                <div className="font-semibold">
                  {ingredient.amountUS}
                  {' '}
                  {ingredient.measurementUS}
                  {' '}
                  {baseRecipe.name}
                  {' '}
                  (Protein Base)
                </div>
                { /* Instead of adding here we should just link out and add from the linked out page */}
                {/* <IconButton aria-label="select recipe" onClick={handleAddBaseToMealPlan}>
                  {isBaseSelected ? <CheckIcon sx={{ color: 'green' }} /> : <AddIcon />}
                </IconButton> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* directions */}
      <div className="p-4 border-b border-gray-300 mb-10">
        <Typography sx={{ marginBottom: 2 }}>Directions:</Typography>
        {directions.map((direction) => (
          <Box marginBottom="10px" key={direction.directionSetTitle}>
            {direction.steps.map((step, i) => {
              const num = i + 1;
              const stepKey = `${direction.directionSetTitle}-${step.step?.slice(0, 20) || num}`;
              return (
                <div key={stepKey} className="flex pb-4">
                  <p className="font-bold pr-2">
                    {num}
                    .
                  </p>
                  <p>
                    {step.step?.replace(/{base}/g, baseRecipe ? baseRecipe.name : '(Opps, base recipe not found)') || ''}
                    {/* {num} */}
                  </p>
                </div>
              );
            })}
          </Box>
        ))}
      </div>
      <div className="p-4">
        <NumberInput defaultValue={multiple} onChange={handleValueChange} />
        {/* TODO: Work on this to make it easier to view ideas
        {recipeIdeas.length > 0 ? (
          <RecipeIdeas
            recipes={recipeIdeas}
            setModalRecipeId={setModalRecipeId}
          />
        ) : null} */}
      </div>
    </div>
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
      <RecipeDialogContents
        handleClose={handleClose}
        modalRecipeId={modalRecipeId}
        setModalRecipeId={setModalRecipeId}
      />
    </Dialog>
  );
}

export default RecipeDialog;
export { RecipeDialogContents };
