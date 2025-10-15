import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  howToFreeze: 'Let cool. Fill ziplock bag. Lay flat in freezer.',
  howToThaw: 'Put frozen chili in Fridge for 24- 72 hours before reheating. Or submerge in cool water for 3-4 hours before reheating.',
  name: 'Chili',
  freezer: true,
  nutritionNeeds: [],
  budget: true,
  season: [
    'fall',
    'winter',
  ],
  notes: '',
  image: '',
  directions: [
    {
      directionSetTitle: 'Make Chili',
      steps: [
        {
          step: 'In a large Dutch oven or heavy-bottomed pot over medium heat, warm the olive oil until shimmering. Add the chopped onion, bell pepper, carrot, celery and ¼ teaspoon of the salt. Stir to combine and cook, stirring occasionally, until the vegetables are tender and the onion is translucent, about 7 to 10 minutes.',
        },
        {
          step: 'Add the garlic, chili powder, cumin, smoked paprika and oregano. Cook until fragrant while stirring constantly, about 1 minute.',
        },
        {
          step: 'Add the diced tomatoes and their juices, the drained black beans and pinto beans, vegetable broth and bay leaf. Stir to combine and let the mixture come to a simmer. Continue cooking, stirring occasionally and reducing heat as necessary to maintain a gentle simmer, for 30 minutes.',
        },
        {
          step: 'Remove the chili from the heat and discard the bay leaf. For the best texture and flavor, transfer 1 ½ cups of the chili to a blender, making sure to get some of the liquid portion. Securely fasten the lid and blend until smooth (watch out for hot steam), then pour the blended mixture back into the pot. (Or, you can blend the chili briefly with an immersion blender, or mash the chili with a potato masher until it reaches a thicker, more chili-like consistency.)',
        },
        {
          step: 'Add the chopped cilantro, stir to combine, and then mix in the vinegar, to taste. Add salt to taste. Divide the mixture into individual bowls and serve with optional toppings. This chili will keep well in the refrigerator for about 4 days. Freeze it in ziplock bags for longer-term storage.',
        },
      ],
    },
  ],
  ingredients: [
    {
      item: 'extra-virgin olive oil',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'red onion, chopped',
      amountUS: 1,
      measurementUS: 'medium',
      optional: false,
    },
    {
      item: 'red bell pepper, chopped',
      amountUS: 1,
      measurementUS: 'large',
      optional: false,
    },
    {
      item: 'carrots, chopped',
      amountUS: 2,
      measurementUS: 'medium',
      optional: false,
    },
    {
      item: 'celery, chopped',
      amountUS: 2,
      measurementUS: 'ribs',
      optional: false,
    },
    {
      item: 'salt, to taste',
      amountUS: '1',
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'garlic, pressed or minced',
      amountUS: 4,
      measurementUS: 'cloves',
      optional: false,
    },
    {
      item: 'chili powder',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'ground cumin',
      amountUS: 2,
      measurementUS: 'teaspoons',
      optional: false,
    },
    {
      item: 'smoked paprika',
      amountUS: '1/2',
      measurementUS: 'teaspoons',
      optional: false,
    },
    {
      item: 'dried oregano',
      amountUS: 1,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'diced tomatoes**, with their juices',
      amountUS: 1,
      measurementUS: 'can (28 oz)',
      optional: false,
    },
    {
      item: '(15 ounces each) black beans, rinsed and drained',
      amountUS: 2,
      measurementUS: 'can',
      optional: false,
    },
    {
      item: '(15 ounces) pinto beans, rinsed and drained',
      amountUS: 1,
      measurementUS: 'can',
      optional: false,
    },
    {
      item: 'vegetable broth or water',
      amountUS: 2,
      measurementUS: 'cups',
      optional: false,
    },
    {
      item: 'bay leaf',
      amountUS: 1,
      measurementUS: '',
      optional: false,
    },
    {
      item: 'chopped fresh cilantro, plus more for garnishing',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'sherry vinegar or red wine vinegar or lime juice',
      amountUS: '2',
      measurementUS: 'teaspoons',
      optional: false,
    },
    {
      item: 'sliced avocado (optional)',
      amountUS: '1',
      measurementUS: '',
      optional: false,
    },
    {
      item: 'tortilla chips (optional)',
      amountUS: '2',
      measurementUS: 'handful',
    },
    {
      item: 'sour cream (optional)',
      amountUS: '2',
      measurementUS: 'spoonfuls',
    },
    {
      item: 'grated cheddar cheese (optional)',
      amountUS: '1/4',
      measurementUS: 'cup',
    },
  ],
};

export default recipe;
