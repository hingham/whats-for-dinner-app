import { FreshFrozenBaseRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreshFrozenBaseRecipe, 'id'> = {
  name: 'Tofu Buddha Bowl with Peanut Sauce',
  freezer: true,
  nutritionNeeds: [],
  budget: true,
  season: [
    'fall',
    'winter',
  ],
  notes: '',
  source: '',
  image: 'xaotitb3n6k59wyknfzf',
  directions: [
    {
      directionSetTitle: 'Assemble bowls',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Cook {rice}.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Bake or fry thawed {base} for about 5 minutes to warm through if desired.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Peanut sauce: In a small bowl, add peanut butter, soy sauce, sesame oil, rice vinegar, chili paste, ginger, and garlic. Using a whisk or a fork, mix until smooth and creamy. Taste and adjust the flavor if needed, adding more soy sauce or sriracha to taste. If you want to add some sweetness, you can add a drizzle of maple syrup as well.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Add your cooked rice at bottom of a large bowl and top with {base}, toppings, avocado, and a generous drizzle of peanut sauce. Enjoy your Buddha bowl right away!',
        },
      ],
    },
  ],
  ingredients: [
    {
      item: 'peanut butter',
      amountUS: 0.5,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'low sodium soy sauce',
      amountUS: 0.33,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'sesame oil (toasted or dark)',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'rice vinegar',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'sambal oelek or chili paste (this is where the “spicy” comes in, so add to taste)',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'small knob of fresh ginger, peeled',
      amountUS: null,
      measurementUS: null,
      optional: false,
    },
    {
      item: 'clove of fresh garlic, peeled',
      amountUS: null,
      measurementUS: null,
      optional: false,
    },
    {
      item: 'of water',
      amountUS: 0.25,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'cooked white rice*',
      amountUS: 1,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'quick picked carrot',
      amountUS: 0.5,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'medium ripe avocado, sliced',
      amountUS: 1,
      measurementUS: null,
      optional: false,
    },
    {
      item: 'chopped scallions (optional)',
      amountUS: 3,
      measurementUS: null,
      optional: false,
    },
    {
      item: 'red cabbage, thinly sliced (optional)',
      amountUS: 1,
      measurementUS: 'cup',
      optional: true,
    },
    {
      item: 'edamame beans, blanched (optional)',
      amountUS: 0.5,
      measurementUS: 'cup',
      optional: true,
    },
    {
      item: 'radishes, thinly sliced (optional)',
      amountUS: 4,
      measurementUS: null,
      optional: true,
    },
    {
      item: 'Black and white sesame seeds, for topping (optional)',
      amountUS: '1',
      measurementUS: 'tablespoon',
      optional: true,
    },
    {
      item: '{base}',
      amountUS: '2 ',
      measurementUS: 'cups',
    },
  ],
  base: '0kQo4jSFkGxjgCv0b3mo',
};

export default recipe;
