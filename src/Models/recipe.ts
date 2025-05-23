import {
  MealCategory,
  Season,
  Region,
  MeasurementEU,
  MeasurementUS,
  PreparationMethod,
  BudgetCategory,
} from './enums.ts';

type Variation = {
  serveWith: '' // Could point to another recipe, or just a list of ingredients
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

type Step = {
  preNote?: string,
  postNote?: string,
  step: string
}

export type Directions = {
  method: PreparationMethod | string,
  methodSettings: string,
  methodNote: string,
  steps: Array<Step>,
  serve: string,
}

/*
This models needs to be updated to reflect recipes with multiple internal recipes...
Not sure the best way to encapsulate this...
Maybe
Array<ingredients, directions, subrecipe (i.e. topping / filling / other)>

*/
export type Recipe = {
  variations?: Array<Variation>,
  link?: string,
  freezer: boolean,
  name: string,
  id: string,
  broadCategory: string,
  ingredients: Array<Ingredient>,
  directions: Array<Directions>,
  nutritionNeeds: Array<MealCategory> | Array<string>,
  budget: BudgetCategory | string,
  /** Season when the dish is best. No season means dish can be made year round */
  season: Array<Season> | Array<string>,
  leftOverNotes?: string,
  notes?: string,
  comments?: Array<string>,
  neighbors?: Array<string>,
  region?: Region | string,
  nutrition?: Record<string, string>,
  source?: string,
  image: string,
  base?: string,
}

export type UserRecipe = Omit<Recipe, 'ingredients'> & {
  ingredients: Array<LocalIngredient>,
  multiple: number,
}

export interface Recipes {
  frozenRecipes: Recipe[];
  freshRecipes: Recipe[];
  frozenBase: Recipe[];
}
