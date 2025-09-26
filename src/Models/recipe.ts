import {
  MealCategory,
  Season,
  MeasurementEU,
  MeasurementUS,
  BudgetCategory,
} from './enums';

export type FormDirectionsType = {
  directionSetTitle: string;
  directions: string;
}

export type Ingredient = {
  item: string,
  amountUS: number | string | null,
  measurementUS?: MeasurementUS | string | undefined | null,
  amountEU?: number,
  measurementEU?: MeasurementEU
  preparation?: string,
  optional?: boolean
}

export type LocalIngredient = Ingredient & {
  stocked: boolean,
  userAmountUS: number,
};

export type Step = {
  preNote?: string,
  postNote?: string,
  step: string
}

export type Directions = {
  directionSetTitle: string,
  steps: Array<Step>,
}

/*
This models needs to be updated to reflect recipes with multiple internal recipes...
Not sure the best way to encapsulate this...
Maybe
Array<ingredients, directions, subrecipe (i.e. topping / filling / other)>

*/
export type Recipe = {
  name: string,
  id: string,
  ingredients: Array<Ingredient>,
  directions: Array<Directions>,
  nutritionNeeds: Array<MealCategory> | Array<string>,
  budget: BudgetCategory | string | boolean, // make this a boolean value
  /** Season when the dish is best. No season means dish can be made year round */
  season: Array<Season> | Array<string>,
  notes?: string,
  source?: string,
  image: string,
  description?: string,
}

export interface FreezerRecipe extends Recipe {
  freezer: true,
  howToFreeze: string,
  howToThaw: string
}
export interface FreshFrozenBaseRecipe extends Recipe {
  // stores the id of the base recipe to look up
  freezer: true,
  base: string, // id that points to the base recipe associated with this recipe
  howToFreeze: string,
  howToThaw: string
}

export type UserRecipe = Omit<Recipe, 'ingredients'> & {
  ingredients: Array<LocalIngredient>,
  multiple: number,
}

export interface Recipes {
  frozenRecipes: FreezerRecipe[];
  freshRecipes: FreshFrozenBaseRecipe[];
  frozenBase: FreezerRecipe[];
}
