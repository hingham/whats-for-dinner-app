import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  ingredients: [
    {
      item: 'olive oil',
      amountUS: 1.5,
      measurementUS: 'teaspoons',
      optional: false,
    },
    {
      item: 'cooked shredded chicken',
      amountUS: 2,
      measurementUS: 'cups',
      optional: false,
    },
    {
      item: 'frozen corn, thawed',
      amountUS: 0.5,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'cooked black beans',
      amountUS: 0.5,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'yellow onion, diced',
      amountUS: 0.5,
      measurementUS: 'medium',
      optional: false,
    },
    {
      item: 'garlic cloves, minced',
      amountUS: 3,
      measurementUS: '',
      optional: false,
    },
    {
      item: 'fresh cilantro, chopped',
      amountUS: 0.25,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'chili powder',
      amountUS: 0.5,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'ground cumin',
      amountUS: 0.25,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'red enchilada sauce',
      amountUS: 1,
      measurementUS: 'can (15 oz)',
      optional: false,
    },
    {
      item: 'corn or whole wheat flour tortillas',
      amountUS: 8,
      measurementUS: '7-inch',
      optional: false,
    },
    {
      item: 'shredded cheddar cheese or mexican cheese blend',
      amountUS: 1.5,
      measurementUS: 'cups',
      optional: false,
    },
    {
      item: 'green onions, chopped',
      amountUS: 0.25,
      measurementUS: 'cup',
      optional: true,
    },
    {
      item: 'fresh cilantro',
      amountUS: 3,
      measurementUS: 'sprigs',
      optional: true,
    },
    {
      item: 'jalapeños, sliced',
      amountUS: 0.25,
      measurementUS: 'cup',
      optional: true,
    },
    {
      item: 'avocado, sliced',
      amountUS: 1,
      measurementUS: '',
      optional: true,
    },
    {
      item: 'Greek yogurt or sour cream',
      amountUS: 2,
      measurementUS: 'Tablespoon',
      optional: true,
    },
  ],
  directions: [
    {
      directionSetTitle: 'Prepare Filling',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Preheat oven to 400°F.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Heat olive oil in a medium skillet over medium-high heat. Add onions and garlic, sauté until soft and translucent, about 4-5 minutes.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Add shredded chicken, corn, black beans, cilantro, chili powder, and cumin to the skillet. Stir in 1/2 cup of enchilada sauce and cook for 4-5 minutes until heated through. Remove from heat.',
        },
      ],
    },
    {
      directionSetTitle: 'Assemble and Bake Enchiladas',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Pour about 1/2 cup enchilada sauce into the bottom of a 9x13 inch baking dish, spreading to coat.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Place 1/4 to 1/3 cup of chicken filling down the center of each tortilla. Sprinkle with a small amount of cheese, then roll tightly and place seam-side down in the prepared baking dish.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Pour remaining enchilada sauce over the rolled tortillas and sprinkle with remaining shredded cheese.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Cover with aluminum foil and bake for 20-25 minutes, or until cheese is melted and enchiladas are heated throughout.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Remove foil and bake for an additional 5 minutes to lightly brown the cheese. Serve hot with desired toppings: green onions, fresh cilantro, jalapeños, sliced avocado, and Greek yogurt or sour cream.',
        },
      ],
    },
  ],
  name: 'Healthy Chicken Enchiladas',
  freezer: true,
  nutritionNeeds: [],
  season: [
    'fall',
    'winter',
  ],
  notes: 'For extra flavor, warm tortillas slightly before filling to prevent tearing. Can substitute regular flour tortillas for whole wheat. Leftover rotisserie chicken works well for this recipe. For a spicier version, add diced jalapeños to the filling.',
  source: '',
  image: '',
  budget: true,
  howToFreeze: 'Let assembled enchiladas cool completely. Cover tightly with aluminum foil, ensuring no air pockets remain. Place in a freezer zip-lock bag and label with date. Freeze for up to 3 months.',
  howToThaw: 'For best results, thaw overnight in refrigerator. Bake covered at 425°F for 30 minutes, then remove foil and bake for an additional 15 minutes until heated through and cheese is bubbly. Can also bake directly from frozen - increase initial covered baking time to 45 minutes.',
};

export default recipe;
