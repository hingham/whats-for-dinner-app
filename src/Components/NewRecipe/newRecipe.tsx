import React, { ReactElement, useState } from 'react';

interface RecipeData {
    ingredients: string;
    directions: string[];
}

function NewRecipeForm(): ReactElement {
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState(['']);
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredients(e.target.value);
  };

  const handleDirectionChange = (index: number, value: string) => {
    setDirections((prev) => prev.map((dir, i) => (i === index ? value : dir)));
  };

  const handleAddDirection = () => {
    setDirections((prev) => [...prev, '']);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    } else {
      setImageFile(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecipe({
      ingredients,
      directions,
    });

    // Validate the the recipe can be formatted into a Recipe object
    // Upload the image to cloudinary if present
    // Send a POST request to the server to save the recipe
    // Show confirmation and allow user to view the saved recipe
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
      <div>
        <label htmlFor="ingredients"><strong>Ingredients</strong></label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={handleIngredientsChange}
          rows={8}
          style={{ width: '100%', marginBottom: 16 }}
          placeholder="List your ingredients here..."
        />
      </div>
      <div>
        <strong>Directions</strong>
        {directions.map((direction, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <textarea
              value={direction}
              onChange={(e) => handleDirectionChange(idx, e.target.value)}
              rows={6}
              style={{ width: '100%' }}
              placeholder={`Directions set ${idx + 1}`}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddDirection}>
          Add Another Directions Set
        </button>
      </div>
      <button type="submit" style={{ marginTop: 20 }}>
        Submit Recipe
      </button>
      <div style={{ marginTop: 20 }}>
        <label htmlFor="imageUpload"><strong>Upload Image</strong></label>
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
      {recipe && (
        <div style={{ marginTop: 32 }}>
          <h3>Recipe Saved!</h3>
          <pre>{JSON.stringify(recipe, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default NewRecipeForm;
