import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  Box, IconButton, TextField, Button,
} from '@mui/material';
import { Directions, Ingredient, Recipe } from '../../Models/recipe';
import { putRecipe } from '../../Helpers/recipesRequest';
import { uploadImageToCloudinary } from '../../Helpers/cloudinary';

interface EditRecipeProps {
  recipe: Recipe;
  // eslint-disable-next-line no-unused-vars
  onSave?: (_: Recipe) => void;
}

function EditRecipe({ recipe, onSave }: EditRecipeProps): React.ReactElement {
  const [title, setTitle] = useState(recipe.name);
  const [publicId, setPublicId] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>(recipe.ingredients);
  const [directions, setDirections] = useState<Directions[]>(recipe.directions);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl] = useState(recipe.image);
  const [saving, setSaving] = useState(false);

  const handleIngredientChange = (value: string, field: string, idx: number) => {
    const updatedIngredient = { ...ingredients[idx] };
    if (field === 'item') {
      updatedIngredient.item = value;
    } else if (field === 'amountUS') {
      updatedIngredient.amountUS = value;
    } else if (field === 'measurementUS') {
      updatedIngredient.measurementUS = value;
    }

    const updatedIngredients = [...ingredients];
    updatedIngredients[idx] = updatedIngredient;

    setIngredients(updatedIngredients);
  };

  const handleDirectionChange = (value: string, field: 'directionSetTitle', idx: number) => {
    const updatedDirection = { ...directions[idx] };
    updatedDirection[field] = value;
    const updatedDirections = [...directions];
    updatedDirections[idx] = updatedDirection;
    setDirections(updatedDirections);
  };

  const handleStepChange = (value: string, directionIdx: number, stepIdx: number) => {
    const updatedSteps = [...directions[directionIdx].steps];
    updatedSteps[stepIdx].step = value;

    const updatedDirections = [...directions];
    updatedDirections[directionIdx].steps = updatedSteps;
    setDirections(updatedDirections);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedRecipe: Recipe = {
        ...recipe,
        name: title,
        ingredients,
        directions,
      };
      let cloundinaryRes;
      const publicIdFormatted = publicId.replace(' ', '_');
      if (imageFile) {
        cloundinaryRes = await uploadImageToCloudinary(imageFile, publicIdFormatted);
        updatedRecipe.image = cloundinaryRes.public_id;
      }

      await putRecipe(recipe.id, updatedRecipe, '');

      if (onSave) onSave(updatedRecipe);
    } catch (err) {
      console.error(err);
      alert('Error saving recipe.');
    }
    setSaving(false);
  };

  function handleRemoveIngredient(idx: number): void {
    const updatedIngredients = ingredients.filter((_, index) => index !== idx);
    setIngredients(updatedIngredients);
  }

  function handleAddIngredient(): void {
    const newIngredient: Ingredient = {
      item: '',
      amountUS: '',
      measurementUS: '',
    };
    setIngredients([...ingredients, newIngredient]);
  }

  function handleRemoveDirection(index: number): void {
    const updatedDirections = directions.filter((_, idx) => idx !== index);
    setDirections(updatedDirections);
  }

  function handleRemoveDirectionStep(directionIdx: number, stepIdx: number): void {
    const updatedDirections = directions.map((direction, idx) => {
      if (idx === directionIdx) {
        const updatedSteps = direction.steps.filter((_, i) => i !== stepIdx);
        return { ...direction, steps: updatedSteps };
      }
      return direction;
    });

    setDirections(updatedDirections);
  }

  return (
    <div className="p-6 grid grid-cols-1 gap-2">
      <TextField
        label="Title"
        value={title || ''}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <h2>Ingredients</h2>
      {ingredients.map((ingredient, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={idx} className="flex items-center mb-2">
          <TextField value={ingredient.item || ''} onChange={(e) => handleIngredientChange(e.target.value, 'item', idx)} />
          <TextField
            value={ingredient.amountUS || ''}
            placeholder="Amount"
            onChange={(e) => handleIngredientChange(e.target.value, 'amountUS', idx)}
          />
          <TextField
            value={ingredient.measurementUS || ''}
            placeholder="Measurement"
            onChange={(e) => handleIngredientChange(e.target.value, 'measurementUS', idx)}
          />
          <IconButton aria-label="remove ingredient" onClick={() => handleRemoveIngredient(idx)}>
            <RemoveIcon />
          </IconButton>
        </div>
      ))}

      <div className="flex justify-start mb-4">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => handleAddIngredient()}
          className="mt-2"
        >
          Add Ingredient
        </Button>
      </div>

      <h3>Directions</h3>
      {directions.map((direction, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={index} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
          <div className="flex">
            <TextField
              value={direction.directionSetTitle || ''}
              placeholder="Direction Set Title"
              sx={{ marginBottom: 6 }}
              onChange={(e) => handleDirectionChange(e.target.value, 'directionSetTitle', index)}
            />
            <IconButton aria-label="remove direction" onClick={() => handleRemoveDirection(index)}>
              <RemoveIcon />
            </IconButton>
          </div>

          {direction.steps.map((step, stepIndex) => (
            // Update the key not to use the index
            // eslint-disable-next-line react/no-array-index-key
            <div key={stepIndex} className="m-4 flex">
              <TextField
                multiline
                minRows={3}
                maxRows={10}
                value={step.step}
                placeholder={`Step ${stepIndex + 1}`}
                onChange={(e) => handleStepChange(e.target.value, index, stepIndex)}
              />
              <IconButton aria-label="remove direction" onClick={() => handleRemoveDirectionStep(index, stepIndex)}>
                <RemoveIcon />
              </IconButton>
            </div>
          ))}

        </Box>
      ))}

      <div className="my-4">
        <h3>Image</h3>
        <TextField onChange={(e) => setPublicId(e.target.value)} placeholder="image title" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageUrl && <img src={imageUrl} alt="Recipe" style={{ maxWidth: 200, marginTop: 8 }} />}
      </div>
      <button type="button" onClick={handleSave} disabled={saving} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {saving ? 'Saving...' : 'Save'}
      </button>
      <hr className="my-4" />
    </div>
  );
}

EditRecipe.defaultProps = {
  onSave: () => { },
};

export default EditRecipe;
