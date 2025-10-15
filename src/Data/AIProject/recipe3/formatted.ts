import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  ingredients: [
    {
      item: 'yellow onion, diced',
      amountUS: 1,
      measurementUS: 'small',
      optional: false,
    },
    {
      item: 'olive oil',
      amountUS: 1,
      measurementUS: 'tablespoon',
      optional: false,
    },
    {
      item: 'garlic, finely minced',
      amountUS: 2,
      measurementUS: 'cloves',
      optional: false,
    },
    {
      item: 'carrots, peeled and chopped',
      amountUS: 3,
      measurementUS: '',
      optional: false,
    },
    {
      item: 'low-sodium chicken broth',
      amountUS: 2,
      measurementUS: 'cans (14.5 oz)',
      optional: false,
    },
    {
      item: 'diced green chilies',
      amountUS: 1,
      measurementUS: 'can (7 oz)',
      optional: false,
    },
    {
      item: 'cumin',
      amountUS: 0.5,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'paprika',
      amountUS: 1,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'dried oregano',
      amountUS: 1,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'ground coriander',
      amountUS: 1,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'cayenne pepper',
      amountUS: 0.25,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'salt and freshly ground black pepper',
      amountUS: null,
      measurementUS: '',
      optional: false,
    },
    {
      item: 'Neufchatel cheese, cut into small cubes',
      amountUS: 1,
      measurementUS: 'package (8 oz)',
      optional: false,
    },
    {
      item: 'frozen or fresh corn',
      amountUS: 0.25,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'cannellini beans',
      amountUS: 2,
      measurementUS: 'cans (15 oz)',
      optional: false,
    },
    {
      item: 'shredded cooked chicken',
      amountUS: 2.5,
      measurementUS: 'cups',
      optional: false,
    },
    {
      item: 'fresh lime juice',
      amountUS: 1,
      measurementUS: 'tablespoon',
      optional: false,
    },
    {
      item: 'masa harina',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'chopped fresh cilantro',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'tortilla chips, monterrey jack cheese, sliced avocado, or green onion',
      amountUS: null,
      measurementUS: '',
      optional: true,
    },
  ],
  directions: [
    {
      directionSetTitle: 'Slow Cooker White Bean Chicken Chili',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Heat olive oil in a large skillet over medium heat. Sauté onions until translucent, about 3-4 minutes. Add garlic and carrots and cook for another 2 minutes.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Transfer sautéed vegetables to slow cooker. Add chicken broth, diced green chilies, cumin, paprika, oregano, coriander, cayenne pepper, salt, and black pepper.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Add chicken to slow cooker. Cook on high for 3 hours or low for 5-6 hours, until chicken is cooked through and easily shredded.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Remove chicken and shred with two forks. Set aside.',
        },
        {
          preNote: 'This creates a creamy base for the chili',
          postNote: '',
          step: 'In a blender or food processor, combine 1 cup of the cannellini beans, the Neufchatel cheese, and 1/2 cup of the cooking broth. Blend until smooth.',
        },
        {
          preNote: 'Mixing masa harina with small amount of broth reduces clumping',
          postNote: '',
          step: 'In a small bowl, whisk masa harina with 1/2 cup of the cooking broth until smooth. Stir this mixture back into the slow cooker.',
        },
        {
          preNote: '',
          postNote: 'Reserve corn if planning to freeze batch as refreezing twice can affect taste',
          step: 'Stir in the pureed bean mixture, remaining whole beans, corn, shredded chicken, lime juice, and cilantro. Heat through for 10-15 minutes.',
        },
      ],
    },
  ],
  name: 'White Bean Chicken Chili',
  freezer: true,
  howToFreeze: 'Let cool completely. Portion into freezer-safe containers or zip-lock bags, leaving 1 inch of space at the top for expansion. Freeze for up to 3 months. Note: if adding corn, add it after thawing to maintain texture.',
  howToThaw: 'Thaw overnight in refrigerator. Reheat in slow cooker on low for 2-3 hours or on stovetop over medium-low heat, stirring occasionally. Add fresh cilantro and corn (if using) after reheating.',
  nutritionNeeds: [],
  budget: true,
  season: [
    'fall',
    'winter',
  ],
  notes: 'For a spicier version, add diced jalapeños or increase cayenne pepper. Can substitute cottage cheese for Neufchatel if preferred.',
  source: 'https://www.cookingclassy.com/white-chicken-chili/',
  image: 'lchgc8lkrlhkl9mro827',
};

export default recipe;
