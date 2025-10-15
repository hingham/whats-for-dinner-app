import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  ingredients: [
    {
      item: 'sweet potatoes - peeled and cubed if steaming or keep whole for baking (see directions)',
      amountUS: 2,
      measurementUS: 'large',
      optional: false,
    },
    {
      item: 'butter',
      amountUS: 1,
      measurementUS: 'tablespoon',
      optional: false,
    },
    {
      item: 'chili powder',
      amountUS: 0.5,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'fine salt',
      amountUS: 0.25,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'ground beef or lamb',
      amountUS: 1,
      measurementUS: 'pound',
      optional: false,
    },
    {
      item: 'carrots, peeled and diced',
      amountUS: 2,
      measurementUS: 'medium',
      optional: false,
    },
    {
      item: 'green bell pepper, diced',
      amountUS: 1,
      measurementUS: 'small',
      optional: false,
    },
    {
      item: 'yellow onion, diced',
      amountUS: 1,
      measurementUS: 'small',
      optional: false,
    },
    {
      item: 'mushrooms, cleaned and diced',
      amountUS: 1,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'garlic cloves, minced',
      amountUS: 4,
      measurementUS: '',
      optional: false,
    },
    {
      item: 'tomato paste',
      amountUS: 3,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'chili powder',
      amountUS: 1,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'dried rosemary',
      amountUS: 0.5,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'salt',
      amountUS: 0.5,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'black pepper',
      amountUS: 0.25,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'water',
      amountUS: 0.25,
      measurementUS: 'cup',
      optional: false,
    },
  ],
  directions: [
    {
      directionSetTitle: 'Prepare Sweet Potato Topping',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Preheat oven to 375°F.',
        },
        {
          preNote: 'Sweet potatoes can be boiled for faster prep, or baked for a bit more flavor and a creamier texture. Peel and dice sweet potatoes if boiling. Keep whole if baking.',
          postNote: '',
          step: 'Place diced sweet potatoes in a steamer basket over boiling water and steam until fork-tender, about 15 minutes. Alternatively, rub whole sweet potatoes with oil and salt, then bake at 400°F for 45-60 minutes until tender. Let cool and remove skin.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Place the cooked sweet potatoes, butter, 1/2 teaspoon chili powder, and 1/4 teaspoon salt in a food processor or blender. Process until smooth and creamy. Set aside.',
        },
      ],
    },
    {
      directionSetTitle: 'Make Filling',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'In a large oven-safe skillet (preferably cast iron) over medium-high heat, brown the ground beef or lamb, breaking it up with a spoon, about 5-7 minutes.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Add carrots, green pepper, onion, mushrooms, and garlic to the skillet. Cook, stirring occasionally, until vegetables are softened and carrots are tender, about 12-15 minutes.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Stir in tomato paste, 1 teaspoon chili powder, rosemary, 1/2 teaspoon salt, black pepper, and water. Cook for 2-3 minutes until well combined and heated through.',
        },
      ],
    },
    {
      directionSetTitle: 'Assemble and Bake',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'If not using an oven-safe skillet, transfer the meat filling to a greased 9×9 inch baking dish or similar casserole dish.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Spread the sweet potato mash evenly over the meat filling. Sprinkle the top lightly with sea salt and a pinch of chili powder for garnish.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Bake for 20-25 minutes at 375°F, until the top is lightly golden and the filling is bubbly around the edges. Let rest for 5 minutes before serving.',
        },
      ],
    },
  ],
  name: 'Sweet Potato & Rosemary Shepherd\'s Pie',
  freezer: true,
  nutritionNeeds: [],
  season: [
    'fall',
    'winter',
  ],
  notes: 'For a traditional version, substitute regular potatoes for sweet potatoes - mash by hand rather than blending to prevent gumminess. Ground lamb adds rich flavor but beef works well too. Can be assembled a day ahead and refrigerated before baking.',
  source: '',
  image: '',
  howToFreeze: 'Let shepherd\'s pie cool completely after baking. Cover tightly with aluminum foil, ensuring no air pockets remain. Place in a freezer zip-lock bag and label with date. Freeze for up to 3 months. Can also be assembled unbaked and frozen.',
  howToThaw: 'Thaw overnight in refrigerator for 24-48 hours. Let sit at room temperature for 30-60 minutes before reheating. If pre-baked, cover and bake at 350°F for 20-30 minutes until heated through. If unbaked, bake covered at 375°F for 35-40 minutes, then uncover and bake 10-15 minutes more until golden.',
  budget: true,
};

export default recipe;
