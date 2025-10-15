import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  ingredients: [
    {
      item: 'vegetable oil or coconut oil',
      amountUS: 2,
      measurementUS: 'tbsp',
      optional: false,
    },
    {
      item: 'medium onion, sliced',
      amountUS: 1,
      measurementUS: 'whole',
      optional: false,
    },
    {
      item: 'garlic cloves, minced',
      amountUS: 3,
      measurementUS: 'whole',
      optional: false,
    },
    {
      item: 'crushed red pepper flakes',
      amountUS: 0.25,
      measurementUS: 'tsp',
      optional: false,
    },
    {
      item: 'curry powder',
      amountUS: 1,
      measurementUS: 'tbsp',
      optional: false,
    },
    {
      item: 'ground cumin',
      amountUS: 1,
      measurementUS: 'tsp',
      optional: false,
    },
    {
      item: 'crushed tomatoes',
      amountUS: 15,
      measurementUS: 'oz can',
      optional: false,
    },
    {
      item: 'coconut milk',
      amountUS: 13.5,
      measurementUS: 'oz can',
      optional: false,
    },
    {
      item: 'chickpeas, drained and rinsed',
      amountUS: 2,
      measurementUS: '15 oz cans',
      optional: false,
    },
    {
      item: 'salt',
      amountUS: 1,
      measurementUS: 'tsp',
      optional: false,
    },
    {
      item: 'black pepper',
      amountUS: 0.25,
      measurementUS: 'tsp',
      optional: false,
    },
    {
      item: 'fresh cilantro, chopped',
      amountUS: 0.25,
      measurementUS: 'cup',
      optional: true,
    },
    {
      item: 'lime wedges',
      amountUS: 1,
      measurementUS: 'lime cut into wedges',
      optional: true,
    },
    {
      item: 'basmati rice or naan bread',
      amountUS: 1,
      measurementUS: 'serving per person',
      optional: true,
    },
  ],
  directions: [
    {
      directionSetTitle: 'Make Chickpea Curry',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Heat oil in a large, heavy-bottomed pot over medium-low heat. Add sliced onion, minced garlic, and red pepper flakes. Cook, stirring occasionally, until onion is softened and golden, about 15 minutes. Add water a tablespoon at a time if onions become too dry.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Increase heat to medium. Add curry powder and cumin, stirring until fragrant and toasted, about 1 minute. Add crushed tomatoes and scrape bottom of pan with a wooden spoon to release any browned bits.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Pour in coconut milk and add chickpeas to the pot. Stir well and reduce heat to low. Simmer until sauce thickens and chickpeas are heated through, about 10 minutes, stirring occasionally. Season with salt and pepper to taste.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Garnish with chopped cilantro and serve with lime wedges over basmati rice or with naan bread.',
        },
      ],
    },
  ],
  name: 'Chickpea Curry',
  freezer: true,
  nutritionNeeds: [],
  season: [
    'fall',
    'winter',
  ],
  notes: '',
  source: '',
  image: '',
  howToFreeze: 'Allow curry to cool completely before freezing. Transfer to freezer-safe containers or bags, leaving 1 inch headspace for expansion. Remove excess air from bags, label with contents and date, and freeze flat for up to 3 months.',
  howToThaw: 'Thaw overnight in refrigerator for 12-24 hours, or place sealed container in cold water bath for 3-4 hours. Reheat gently over low heat, stirring frequently. Add a splash of coconut milk or water if needed to restore consistency.',
  budget: true,
};

export default recipe;
