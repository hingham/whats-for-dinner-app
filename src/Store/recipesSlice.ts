import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FreezerRecipe, FreshFrozenBaseRecipe, Recipe, Recipes, UserRecipe,
} from '../Models/recipe';
import pantryItems from '../Data/Ingredients/pantryItems.json';
import { castToNumber } from '../Helpers/number';

const pantryItemsParsed = JSON.parse(JSON.stringify(pantryItems));
export interface RecipeTypes {
  frozenRecipes: FreezerRecipe[];
  freshRecipes: FreshFrozenBaseRecipe[];
  frozenBase: FreezerRecipe[];
}

export interface RecipesState {
  selected: UserRecipe[];
  recipes: RecipeTypes
}

const initialState: RecipesState = {
  selected: [],
  recipes: {
    frozenRecipes: [],
    freshRecipes: [],
    frozenBase: [],
  },
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    // This should be populated as soon as the app loads...
    // then this can be more easily swapped with backends
    addRecipes(state, action: PayloadAction<Recipes>) {
      return {
        ...state,
        recipes: action.payload,
      };
    },
    updateMultiple(state, action: PayloadAction<{ recipeId: string; multiple: number }>) {
      const { recipeId, multiple } = action.payload;
      const updatedSelected = state.selected.map((recipe) => {
        if (recipe.id === recipeId) {
          return {
            ...recipe,
            multiple,
            ingredients: recipe.ingredients.map((ingredient) => ({
              ...ingredient,
              userAmountUS: castToNumber(ingredient.amountUS) * multiple,
            })),
          };
        }
        return recipe;
      });
      return {
        ...state,
        selected: updatedSelected,
      };
    },
    addSelectedRecipe(state, action: PayloadAction<{ recipe: Recipe, multiple: number }>) {
      const { recipe: selectedRecipe, multiple } = action.payload;
      const updatedUserIngredients = selectedRecipe.ingredients.map((ingredient) => ({
        ...ingredient,
        userAmountUS: castToNumber(ingredient.amountUS) * multiple,
        // Default to stocked if it is a common pantry item
        stocked: !!pantryItemsParsed[ingredient.item],
      }));

      const userRecipe: UserRecipe = {
        multiple,
        ...selectedRecipe,
        ingredients: updatedUserIngredients,
      };

      return {
        ...state,
        selected: [...state.selected, userRecipe],
      };
    },
    removeSelectedRecipe(state, action: PayloadAction<string>) {
      return {
        ...state,
        selected: state.selected.filter((recipe) => action.payload !== recipe.id),
      };
    },
    updateIngredientStocked(state, action:
      PayloadAction<{ recipeIds: string[]; item: string; stocked: boolean }>) {
      const { recipeIds, item, stocked } = action.payload;

      return {
        ...state,
        selected: state.selected.map((recipe) => {
          if (recipeIds.includes(recipe.id)) {
            return {
              ...recipe,
              ingredients: recipe.ingredients.map((ingredient) => {
                if (ingredient.item === item) {
                  return {
                    ...ingredient,
                    stocked,
                  };
                }
                return ingredient;
              }),
            };
          }
          return recipe;
        }),
      };
    },
  },
});

export const {
  addSelectedRecipe, removeSelectedRecipe, updateIngredientStocked, addRecipes, updateMultiple,
} = recipesSlice.actions;
export default recipesSlice.reducer;
