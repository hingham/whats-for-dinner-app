import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  ingredients: [
    {
      item: 'olive oil',
      amountUS: 1.5,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'zucchini, finely chopped',
      amountUS: 1,
      measurementUS: 'medium',
      optional: false,
    },
    {
      item: 'marinara sauce',
      amountUS: 1,
      measurementUS: 'jar (24 oz)',
      optional: false,
    },
    {
      item: 'garlic clove, minced',
      amountUS: 1,
      measurementUS: '',
      optional: false,
    },
    {
      item: 'eggplant, sliced',
      amountUS: 1,
      measurementUS: 'medium',
      optional: true,
    },
    {
      item: 'ricotta cheese',
      amountUS: 6,
      measurementUS: 'oz',
      optional: false,
    },
    {
      item: 'low-fat cottage cheese',
      amountUS: 6,
      measurementUS: 'oz',
      optional: false,
    },
    {
      item: 'fresh baby spinach',
      amountUS: 3,
      measurementUS: 'cups',
      optional: false,
    },
    {
      item: 'mozzarella cheese, shredded',
      amountUS: 7,
      measurementUS: 'oz',
      optional: false,
    },
    {
      item: 'Parmesan cheese, finely grated',
      amountUS: 1,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'lasagna noodles',
      amountUS: 1,
      measurementUS: 'box (9 oz)',
      optional: false,
    },
  ],
  directions: [
    {
      directionSetTitle: 'Cook Eggplant (Optional)',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Preheat oven to 400°F. Slice eggplant into 1/4-inch slices. Arrange on a baking sheet and brush both sides with olive oil. Bake for 15 minutes, flip, then bake for an additional 10 minutes until soft and golden. Set aside.',
        },
      ],
    },
    {
      directionSetTitle: 'Prepare Sauce and Cook Noodles',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Cook lasagna noodles according to package directions until al dente. Drain and set aside.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Heat olive oil in a large pan over medium heat. Add chopped zucchini and sauté for 4 minutes until tender. Add minced garlic and sauté for 1 minute until fragrant.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Add marinara sauce to the pan, stir to combine, and remove from heat.',
        },
      ],
    },
    {
      directionSetTitle: 'Prepare Cheese Mixture',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Steam fresh spinach for 2-4 minutes until fully wilted. Squeeze out excess water thoroughly.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'In a bowl, combine ricotta cheese, cottage cheese, and the cooked spinach. Mix well until evenly combined.',
        },
      ],
    },
    {
      directionSetTitle: 'Assemble and Bake Lasagna',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Preheat oven to 375°F if not already heated. Grease a 9x13 inch baking dish.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Spread 1/3 of the marinara sauce mixture on the bottom of the baking dish. Layer with 1/3 of the cooked noodles, 1/2 of the ricotta mixture, 1/2 of the eggplant slices (if using), 1/3 of the mozzarella, and 1/3 of the Parmesan.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Repeat the layering process: 1/3 noodles, remaining ricotta mixture, remaining eggplant, 1/3 mozzarella, 1/3 Parmesan.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Top with remaining noodles, remaining sauce, and remaining mozzarella and Parmesan cheeses.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Cover with foil and bake for 45 minutes. Remove foil and bake for an additional 15 minutes until cheese is golden and bubbly. Let rest for 10 minutes before serving.',
        },
      ],
    },
  ],
  name: 'Veggie Lasagna',
  freezer: true,
  nutritionNeeds: [],
  season: [
    'fall',
    'winter',
  ],
  notes: 'Eggplant is optional but adds great flavor and texture. For a lighter version, use part-skim mozzarella and ricotta. Make sure to squeeze excess water from spinach to prevent watery lasagna. Can be assembled a day ahead and refrigerated before baking.',
  source: '',
  image: '',
  budget: true,
  howToFreeze: 'Let lasagna cool completely after baking or assemble without baking. Cover tightly with aluminum foil, ensuring no air pockets remain. Place in a freezer zip-lock bag and label with date. Freeze for up to 3 months.',
  howToThaw: 'Thaw overnight in refrigerator for 24-48 hours. If pre-baked, bake covered at 350°F for 30 minutes, then uncover and bake 15 minutes more until heated through. If unbaked, bake covered at 375°F for 60 minutes, then uncover and bake 15-20 minutes until cheese is golden and bubbly.',

};

export default recipe;
