import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Directions, Ingredient, Recipe } from '../../Models/recipe';
import { putRecipe } from '../../Helpers/recipesRequest';
import { uploadImageToCloundinary } from '../../Helpers/cloudinary';

interface EditRecipeProps {
  recipe: Recipe;
  onSave?: (updatedRecipe: Recipe) => void;
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

  const handleDirectionChange = (value: string, field: 'method' | 'methodSettings' | 'methodNote' | 'serve', idx: number) => {
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
      let cloundinaryRes;
      const publicIdFormatted = publicId.replace(' ', '_');
      if (imageFile) {
        cloundinaryRes = await uploadImageToCloundinary(imageFile, publicIdFormatted);
      }

      const updatedRecipe: Recipe = {
        ...recipe,
        name: title,
        ingredients,
        directions,
        image: cloundinaryRes.public_id,
      };

      console.log({ image: recipe.image });

      await putRecipe(recipe.id, updatedRecipe, '');

      if (onSave) onSave(updatedRecipe);
    } catch (err) {
      console.error(err);
      alert('Error saving recipe.');
    }
    setSaving(false);
  };

  return (
    <Box>
      <h2>Edit Recipe</h2>
      <label htmlFor="recipe-title">
        Title:
        <input id="recipe-title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient, idx) => (
        <Box key={ingredient.item} style={{ display: 'flex', marginBottom: 8 }}>
          <TextField value={ingredient.item || ''} onChange={(e) => handleIngredientChange(e.target.value, 'item', idx)} />
          <TextField
            value={ingredient.amountUS || ''}
            placeholder="Amount"
            onChange={(e) => handleIngredientChange(e.target.value, 'amountUS', idx)}
          />
          <TextField
            value={ingredient.measurementUS || ''}
            placeholder="Measurement"
            style={{ marginLeft: 8 }}
            onChange={(e) => handleIngredientChange(e.target.value, 'measurementUS', idx)}
          />
        </Box>
      ))}
      ;

      <h3>Directions</h3>
      {directions.map((direction, index) => (
        <Box key={index} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
          <TextField
            value={direction.method || ''}
            placeholder="Preparation Method"
            style={{ marginBottom: 4 }}
            label="Preparation Method"
            onChange={(e) => handleDirectionChange(e.target.value, 'method', index)}
          />
          <TextField
            value={direction.methodSettings || ''}
            placeholder="Method Settings"
            onChange={(e) => handleDirectionChange(e.target.value, 'methodSettings', index)}
          />
          <TextField
            value={direction.methodNote || ''}
            placeholder="Method Note"
            style={{ marginLeft: 8 }}
            onChange={(e) => handleDirectionChange(e.target.value, 'methodNote', index)}
          />
          {direction.steps.map((step, stepIndex) => (
            // Update the key not to use the index
            // eslint-disable-next-line react/no-array-index-key
            <div key={stepIndex} style={{ marginTop: 4 }}>
              <TextField
                multiline
                rows={3}
                value={step.step}
                placeholder={`Step ${stepIndex + 1}`}
                onChange={(e) => handleStepChange(e.target.value, index, stepIndex)}
              />
            </div>
          ))}
        </Box>
      ))}

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Image</h3>
        <TextField onChange={(e) => setPublicId(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageUrl && <img src={imageUrl} alt="Recipe" style={{ maxWidth: 200, marginTop: 8 }} />}
      </Box>
      <br />
      <button type="button" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save'}
      </button>
    </Box>
  );
}

export default EditRecipe;
