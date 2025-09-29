import { MeasurementUS } from '../Models/enums';
import {
  Directions, FormDirectionsType, FreezerRecipe, Ingredient, Step,
} from '../Models/recipe';

function convertToDecimal(untrimmedInput: string): number {
  // Trim any extra spaces
  const input = untrimmedInput.trim();

  // Split the input into whole number and fraction parts
  const parts = input.split(' ');

  let decimal = 0;

  if (parts.length === 2) {
    // If input contains both whole number and fraction
    const wholeNumber = parseFloat(parts[0]);
    const [numerator, denominator] = parts[1].split('/').map(Number);
    decimal = wholeNumber + numerator / denominator;
  } else if (parts.length === 1) {
    // If input contains only a fraction or a whole number
    if (input.includes('/')) {
      const [numerator, denominator] = input.split('/').map(Number);
      decimal = numerator / denominator;
    } else {
      decimal = parseFloat(input);
    }
  }
  return parseFloat(decimal.toFixed(2));
}

const getQuantity = (line: string): number | null => {
  const regex = /\b\d+(?:\s\d+\/\d+|\/\d+)?\b/g;
  const matches = line.match(regex);
  const match = matches ? matches[0] : null;
  return match ? convertToDecimal(match) : null;
};

const getItem = (line: string) => line.split(' ').splice(2).join(' ');

const getMeasurement = (line: string): MeasurementUS => line.split(' ')[1] as MeasurementUS;

const getDirections = (inputDirections: FormDirectionsType[]): Directions[] => {
  const directionsArrFormatted: Directions[] = [];
  inputDirections.forEach((direction) => {
    const steps: Step[] = [];
    const lines = direction.directions.split('\n');

    lines.forEach((line: string) => {
      const step = {
        preNote: '',
        postNote: '',
        step: line,
      };

      steps.push(step);
    });

    directionsArrFormatted.push(
      {
        steps,
        directionSetTitle: direction.directionSetTitle,
      },
    );
  });

  return directionsArrFormatted;
};

const getIngredients = (inputIngredients: string): Ingredient[] => {
  const lines = inputIngredients.split('\n');
  const ingredients: Ingredient[] = [];
  lines.forEach((line) => {
    const amountUS = getQuantity(line);
    const item = getItem(line);
    const measurementUS = getMeasurement(line);
    const ingredient: Ingredient = {
      item,
      amountUS,
      measurementUS,
      optional: false,
    };

    ingredients.push(ingredient);
  });

  return ingredients;
};

const getFormattedRecipe = (
  name: string,
  source: string,
  directionsInput: FormDirectionsType[],
  ingredientInputs: string,
  howToFreeze: string,
  howToThaw: string,
  budget: boolean,
): Omit<FreezerRecipe, 'id'> => {
  const ingredients = getIngredients(ingredientInputs);
  const directions = getDirections(directionsInput);

  const recipe: Omit<FreezerRecipe, 'id'> = {
    ingredients,
    directions,
    name,
    freezer: true,
    nutritionNeeds: [],
    season: ['fall', 'winter'],
    notes: '',
    source,
    image: '',
    howToFreeze,
    howToThaw,
    budget,
  };

  return recipe;
};

export default getFormattedRecipe;
