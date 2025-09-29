/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Box, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
  MenuItem,
  Button,
} from '@mui/material'; import { useSelector } from 'react-redux';
import { postRecipe } from '../../Helpers/recipesRequest';
import {
  FormDirectionsType, FreezerRecipe, FreshFrozenBaseRecipe, Recipe,
} from '../../Models/recipe';
import { uploadImageToCloundinary } from '../../Helpers/cloudinary';
import getFormattedRecipe from '../../Data/transformer';
import { CollectionType } from '../../Models/enums';
import { RootState } from '../../Store/rootReducer';

type IngredientsProps = {
  ingredients: string;
  setIngredients: React.Dispatch<React.SetStateAction<string>>;
};

function Ingredients({ ingredients, setIngredients }: IngredientsProps): ReactElement {
  return (
    <Box sx={{ '& .MuiTextField-root': { width: '100%' } }}>
      <TextField
        label="ingredients"
        multiline
        rows={10}
        value={ingredients}
        placeholder={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
    </Box>
  );
}

type DirectionsProps = {
  directions: FormDirectionsType[];
  setDirections: React.Dispatch<React.SetStateAction<FormDirectionsType[]>>;
};

function DirectionsComponent({ directions, setDirections }: DirectionsProps): ReactElement {
  const handleDirectionChange = (index: number, value: string) => {
    const updatedDirections = [...directions];
    updatedDirections[index].directions = value;
    setDirections(updatedDirections);
  };

  const handleDirectionTitleChange = (index: number, value: string) => {
    const updatedDirections = [...directions];
    updatedDirections[index].directionSetTitle = value;
    setDirections(updatedDirections);
  };

  const handleAddDirection = () => {
    setDirections((prev) => [...prev, { directionSetTitle: '', directions: '' }]);
  };

  return (
    <div>
      {directions.map((direction, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={idx} sx={{ '& .MuiTextField-root': { width: '100%' } }}>
          <TextField
            onChange={(e) => handleDirectionTitleChange(idx, e.target.value)}
            label="direction set title"
            value={direction.directionSetTitle}
            sx={{ marginBottom: 1 }}
          />
          <TextField
            onChange={(e) => handleDirectionChange(idx, e.target.value)}
            label="directions"
            multiline
            rows={10}
            value={direction.directions}
            placeholder={direction.directions}
          />
        </Box>
      ))}
      <button type="button" onClick={handleAddDirection}>
        Add Direction
      </button>
    </div>
  );
}

type ImageProps = {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
};

function Image({ imageFile, setImageFile, setPublicId }: ImageProps): ReactElement {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <TextField
        onChange={(e) => setPublicId(e.target.value)}
        label="image name"
      />
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'block', marginTop: 8 }}
      />
      {imageFile && (
        <div style={{ marginTop: 8 }}>
          <em>Selected file:</em>
          {' '}
          {imageFile.name}
        </div>
      )}
    </div>
  );
}

type ParentRecipeFormProps = {
  children?: React.ReactNode | null;
  setRecipe: React.Dispatch<React.SetStateAction<Omit<Recipe, 'id'> | null>>;
};

function ParentRecipeForm({ children, setRecipe }: ParentRecipeFormProps): ReactElement {
  console.log('ParentRecipeForm rendered');
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState<FormDirectionsType[]>([{ directions: '', directionSetTitle: '' }]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [publicId, setPublicId] = useState<string | ''>('');

  // Attempts to transform recipe into recipe that can be saved
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedRecipe = getFormattedRecipe(
      title,
      '',
      directions, // Update this to support accepting multiple types of directions
      ingredients,
      '',
      '',
      true,
    );

    console.log({ formattedRecipe });
    try {
      let cloundinaryRes;
      const publicIdFormatted = publicId.replace(' ', '_');
      if (imageFile) {
        cloundinaryRes = await uploadImageToCloundinary(imageFile, publicIdFormatted);
        setRecipe({ ...formattedRecipe, image: cloundinaryRes.public_id });
      } else {
        setRecipe(formattedRecipe);
      }
      alert('Recipe formatted successfully! You can now save it.');
    } catch (err) {
      console.error(err);
      alert('Error saving image.');
    }
    // Validate the the recipe can be formatted into a Recipe object
    // Upload the image to cloudinary if present
    // Send a POST request to the server to save the recipe
    // Show confirmation and allow user to view the saved recipe
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full max-w-lg p-4 m-2 border rounded">
      <div className="grid grid-cols-1 gap-4 w-full">

        <TextField
          label="Recipe Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Ingredients setIngredients={setIngredients} ingredients={ingredients} />
        <DirectionsComponent setDirections={setDirections} directions={directions} />
        <Image setImageFile={setImageFile} imageFile={imageFile} setPublicId={setPublicId} />
        {children}
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
          Submit Recipe
        </Button>
      </div>

    </form>

  );
}

type FreezerRecipeFieldsProps = {
  setExtraRecipeFields: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

function FreezerRecipeFields({ setExtraRecipeFields }: FreezerRecipeFieldsProps): ReactElement {
  const [freezeMethod, setFreezeMethod] = useState('freeze');
  const [thawMethod, setThawMethod] = useState('thaw');

  const handleFreezeMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFreezeMethod(e.target.value);
    setExtraRecipeFields((prev) => ({ ...prev, freezeMethod: e.target.value }));
  };

  const handleThawMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThawMethod(e.target.value);
    setExtraRecipeFields((prev) => ({ ...prev, thawMethod: e.target.value }));
  };

  return (
    <>
      <TextField
        label="Freeze Method"
        value={freezeMethod}
        onChange={handleFreezeMethodChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Thaw Method"
        value={thawMethod}
        onChange={handleThawMethodChange}
        fullWidth
        margin="normal"
      />
    </>
  );
}

type FreshFreezerBaseRecipeFieldsProps = {
  setExtraRecipeFields: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

function FreshFreezerBaseRecipeFields({ setExtraRecipeFields }: FreshFreezerBaseRecipeFieldsProps): React.ReactElement {
  // Get all base recipes from the redux store
  const baseRecipes = useSelector((state: RootState) => state.recipes.recipes.frozenBase || []);
  const [base, setBase] = useState('');

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBase(e.target.value);
    setExtraRecipeFields((prev) => ({ ...prev, base: e.target.value }));
  };

  return (
    <TextField
      select
      label="Base Recipe"
      value={base}
      onChange={handleBaseChange}
      fullWidth
      margin="normal"
    >
      {baseRecipes.map((recipe: { id: string; name: string }) => (
        <MenuItem key={recipe.id} value={recipe.id}>
          {recipe.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

function NewRecipeForm(): ReactElement {
  console.log('new form rendered');
  const [recipe, setRecipe] = useState<Omit<Recipe, 'id'> | null>(null);
  const [extraRecipeFields, setExtraRecipeFields] = useState<Record<string, any>>({});
  const [fullFormattedRecipe, setFullFormattedRecipe] = useState<FreezerRecipe | FreshFrozenBaseRecipe | any | null>(null);
  const [collection, setCollection] = useState<CollectionType>('freezer-recipes');
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setFullFormattedRecipe({
      ...recipe,
      ...extraRecipeFields,
    });
  }, [recipe]);

  // Posts the formatted recipe
  const saveRecipe = async () => {
    try {
      postRecipe(fullFormattedRecipe, collection, '');
      setSaved(true);
      alert('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    }
  };

  return (
    <div className="margin-auto flex flex-col items-center">
      <FormControl component="fieldset" sx={{ m: 2 }}>
        <FormLabel component="legend">Recipe Type</FormLabel>
        <RadioGroup
          row
          aria-label="recipe-type"
          name="recipe-type"
          value={collection}
          onChange={(e) => setCollection(e.target.value as CollectionType)}
        >
          <FormControlLabel value="freezer-recipes" control={<Radio />} label="Freezer Recipe" />
          <FormControlLabel value="base-freezer-recipes" control={<Radio />} label="Freezer Base Recipe" />
          <FormControlLabel value="fresh-freezer-base-recipes" control={<Radio />} label="Fresh (Frozen Base) Recipe" />
        </RadioGroup>
      </FormControl>

      <ParentRecipeForm setRecipe={setRecipe}>
        {collection === 'freezer-recipes' && <FreezerRecipeFields setExtraRecipeFields={setExtraRecipeFields} />}
        {collection === 'fresh-freezer-base-recipes' && <FreshFreezerBaseRecipeFields setExtraRecipeFields={setExtraRecipeFields} />}
        {/* Since there aren't special properties here we'll just leave it commented out for now */}
        {/* {collection === 'base-freezer-recipes' && <FreshFrozenBaseRecipe setExtraRecipeFields={setExtraRecipeFields} />} */}

      </ParentRecipeForm>
      {recipe && (
        <div className="m-2 w-full">
          <h3>Recipe Formatted!</h3>
          <pre className="text-wrap p-6">{JSON.stringify(recipe, null, 2)}</pre>
        </div>
      )}
      {saved ? (
        null
      ) : (
        <button type="button" onClick={saveRecipe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Recipe</button>
      )}
    </div>
  );
}

ParentRecipeForm.defaultProps = {
  children: null,
};

export default NewRecipeForm;
