/* eslint-disable no-unused-vars */
export type MealCategory = 'keto' | 'vegetarian' | 'vegan'

export type Season = 'summer' | 'fall' | 'winter' | 'spring'

export type MeasurementUS = 'cup' | 'gallon' | 'teaspoon' | 'unit' | 'tablespoon' | 'oz'

export type MeasurementEU = 'oz' | 'pint' | 'unit'

export type BudgetCategory = 'budget' | 'midBudget' | 'splurge'

export type PreparationMethod = 'instapot' | 'slow cooker' | 'oven'

export type Region = 'northwest' | 'southwest'

export enum PantryCategoryEnum {
    DryGoodsGrains = 'Dry Goods & Grains',
    CannedJarred = 'Canned & Jarred Goods',
    BakingEssentials = 'Baking Essentials',
    OilsFats = 'Oils & Fats',
    VinegarsSauces = 'Vinegars & Sauces',
    SpicesSeasonings = 'Spices & Seasonings',
    BreadcrumbsCoating = 'Breadcrumbs & Coating',
}

export type CollectionType = 'base-freezer-recipes' | 'freezer-recipes' | 'fresh-freezer-base-recipes'
