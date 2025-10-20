/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useEffect, useState } from 'react';
import {
  Box, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
  MenuItem,
  Button,
} from '@mui/material'; import { useSelector } from 'react-redux';
import {
  postRecipe, postRawRecipe,
} from '../../Helpers/recipesRequest';
import {
  FormDirectionsType, FreezerRecipe, FreshFrozenBaseRecipe,
} from '../../Models/recipe';
import { uploadImageToCloudinary } from '../../Helpers/cloudinary';
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
  setRawRecipe: React.Dispatch<React.SetStateAction<{ recipeText: string; imageFile: File | null; publicId: string | '' }>>;
  // eslint-disable-next-line no-unused-vars
  handleFormSubmit: (e: any) => Promise<void>;
};

function ParentRecipeForm({ children, setRawRecipe, handleFormSubmit }: ParentRecipeFormProps): ReactElement {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState<FormDirectionsType[]>([{ directions: '', directionSetTitle: '' }]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [publicId, setPublicId] = useState<string | ''>('');
  useEffect(() => {
    const recipeText = `${title}\n${ingredients}\n${directions.map((d) => `${d.directionSetTitle}\n${d.directions}`).join('\n')}`;
    setRawRecipe({ recipeText, imageFile, publicId });
  }, [title, ingredients, directions, imageFile, publicId]);
  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="w-full p-4 m-2 border rounded">
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
    setExtraRecipeFields((prev) => ({ ...prev, howToFreeze: e.target.value }));
  };

  const handleThawMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThawMethod(e.target.value);
    setExtraRecipeFields((prev) => ({ ...prev, howToThaw: e.target.value }));
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
  const [recipe, setRawRecipe] = useState<{ recipeText: string; imageFile: File | null, publicId: string | '' }>({ recipeText: '', imageFile: null, publicId: '' });
  const [extraRecipeFields, setExtraRecipeFields] = useState<Record<string, any>>({});
  const [fullFormattedRecipe, setFullFormattedRecipe] = useState<FreezerRecipe | FreshFrozenBaseRecipe | null>(null);
  const [collection, setCollection] = useState<CollectionType>('freezer-recipes');
  const [saved, setSaved] = useState(false);
  // const [publicId, setPublicId] = useState<string | ''>('');
  const [formatting, setFormatting] = useState(false);

  const resetFormattingFalse = () => {
    setFormatting(false);
  };
  // Attempts to transform recipe into recipe that can be saved
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormatting(true);
    const recipeText = recipe?.recipeText || '';

    try {
      const formattedRecipe = await postRawRecipe(`${recipeText}.join('\n')${JSON.stringify(extraRecipeFields)}`);
      let cloudinaryRes;
      const parsedRecipe = JSON.parse(formattedRecipe);

      if (recipe && recipe.imageFile) {
        const publicIdFormatted = recipe.imageFile.name.replace(' ', '_');
        cloudinaryRes = await uploadImageToCloudinary(recipe.imageFile, publicIdFormatted);
        setFullFormattedRecipe({ ...parsedRecipe, image: cloudinaryRes.public_id });
      } else {
        setFullFormattedRecipe({ ...parsedRecipe, image: '' });
      }
      setFormatting(false);
      alert('Recipe formatted successfully! You can now save it.');
    } catch (err) {
      setFormatting(false);
      console.error(err);
      alert('Error saving image.');
    }
  };

  // Posts the formatted recipe
  const saveRecipe = async () => {
    try {
      postRecipe(fullFormattedRecipe as FreezerRecipe | FreshFrozenBaseRecipe, collection, '');
      setSaved(true);
      alert('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    }
  };

  return (

    <div className="margin-auto flex flex-col w-full max-w-4xl my-6 items-center">
      <h2 className=" text-blue-400 p-4 text-md">New Recipe</h2>
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

      <ParentRecipeForm setRawRecipe={setRawRecipe} handleFormSubmit={handleFormSubmit}>
        {collection === 'freezer-recipes' && <FreezerRecipeFields setExtraRecipeFields={setExtraRecipeFields} />}
        {collection === 'fresh-freezer-base-recipes' && <FreshFreezerBaseRecipeFields setExtraRecipeFields={setExtraRecipeFields} />}
        {/* Since there aren't special properties here we'll just leave it commented out for now */}
        {/* {collection === 'base-freezer-recipes' && <FreshFrozenBaseRecipe setExtraRecipeFields={setExtraRecipeFields} />} */}
        <Button type="submit" variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit" disabled={formatting}>
          Format Recipe
        </Button>
        <Button onClick={resetFormattingFalse} variant="outlined" color="secondary" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded w-fit">
          Reset Formatting
        </Button>
        {formatting && <p>Formatting recipe, please wait...</p>}
      </ParentRecipeForm>
      {!saved ? (
        <Button type="button" variant="contained" color="primary" onClick={saveRecipe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded w-full m-20">Save Recipe</Button>
      ) : (
        null
      )}
      {fullFormattedRecipe && (
        <div className="m-2 w-full">
          <h3>Recipe Formatted!</h3>
          <pre className="text-wrap p-6">{JSON.stringify(fullFormattedRecipe, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

ParentRecipeForm.defaultProps = {
  children: null,
};

export default NewRecipeForm;
