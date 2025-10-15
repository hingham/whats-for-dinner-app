import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  howToFreeze: 'Let assembled enchiladas cool completely if freshly baked. Cover tightly with foil, ensuring no air pockets remain. Place in a freezer zip-lock bag and label with date. Freeze for up to 3 months.',
  howToThaw: 'Thaw overnight in refrigerator 1-2 days before serving. Optional: let rest at room temperature for 1-2 hours before baking. Top with remaining cheese and bake covered at 425°F for 40 minutes, then uncover and bake 10-20 minutes more until heated through and cheese is golden.',
  ingredients: [
    {
      item: 'olive oil',
      amountUS: 1,
      measurementUS: 'tablespoon',
      optional: false,
    },
    {
      item: 'sweet potatoes',
      amountUS: 2,
      measurementUS: 'large',
      optional: false,
    },
    {
      item: 'kosher salt',
      amountUS: 1,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'taco seasoning',
      amountUS: 1,
      measurementUS: 'tablespoon',
      optional: false,
    },
    {
      item: 'black beans or pinto beans, drained and rinsed',
      amountUS: 1,
      measurementUS: 'can (15 oz)',
      optional: false,
    },
    {
      item: 'cream cheese',
      amountUS: 4,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'shredded cheddar cheese',
      amountUS: 1,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'mild diced green chiles',
      amountUS: 1,
      measurementUS: 'can (4 oz)',
      optional: false,
    },
    {
      item: 'red enchilada sauce',
      amountUS: 1,
      measurementUS: 'can (15 oz)',
      optional: false,
    },
    {
      item: 'corn tortillas, gently warmed',
      amountUS: 12,
      measurementUS: '',
      optional: false,
    },
    {
      item: 'avocado',
      amountUS: null,
      measurementUS: '',
      optional: true,
    },
    {
      item: 'cilantro',
      amountUS: null,
      measurementUS: '',
      optional: true,
    },
    {
      item: 'salsa',
      amountUS: null,
      measurementUS: '',
      optional: true,
    },
    {
      item: 'sour cream',
      amountUS: null,
      measurementUS: '',
      optional: true,
    },
  ],
  directions: [
    {
      directionSetTitle: 'Prepare Enchilada Filling',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Preheat the oven to 350°F.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Pierce each sweet potato several times with a fork. Rub with olive oil and a pinch of salt.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Place sweet potatoes on a foil-lined baking sheet and roast for 60 minutes, or until very tender when pierced with a fork.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Remove from oven and let cool. Once cool enough to handle, peel the skin (it should come off easily) and lightly mash the sweet potatoes in a bowl.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'In a large bowl, combine black beans, cream cheese, 1/2 cup cheddar cheese, green chiles, 1/4 cup enchilada sauce, and taco seasoning. Lightly mash about half of the beans, then stir until well combined.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Add the mashed sweet potatoes to the black bean mixture and stir until well combined.',
        },
      ],
    },
    {
      directionSetTitle: 'Assemble Enchiladas',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Pour about 1/2 cup enchilada sauce into the bottom of a large baking dish. Dip both sides of each tortilla into the sauce, stacking each dipped tortilla on a plate.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'If the pan becomes dry after dipping tortillas, add a bit more enchilada sauce to the bottom.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Place about 3 heaping tablespoons of the black bean and sweet potato filling in the center of each tortilla. Roll tightly and place seam-side down in the prepared baking dish.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Pour the remaining enchilada sauce over the top of the rolled enchiladas. If freezing, do not add cheese yet.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Cover tightly with foil.',
        },
        {
          preNote: 'For immediate serving',
          postNote: '',
          step: 'Top with remaining cheddar cheese and bake covered for 30 minutes. Remove foil and bake for an additional 15 minutes or until cheese is golden brown and sauce is bubbling.',
        },
        {
          preNote: 'For freezing',
          postNote: '',
          step: 'Press foil tightly to eliminate air, place in a freezer zip-lock bag, and label with date. Can freeze for up to 3 months. Thaw in refrigerator 1-2 days before baking. Add cheese before baking and follow cooking instructions above.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Serve hot with desired toppings such as avocado, cilantro, salsa, and sour cream.',
        },
      ],
    },
  ],
  name: 'Bean and Sweet Potato Veggie Enchiladas',
  freezer: true,
  nutritionNeeds: [],
  budget: true,
  season: [
    'fall',
    'winter',
  ],
  notes: 'For best results, warm tortillas slightly before dipping to prevent tearing. Can substitute pinto beans for black beans. For a spicier version, add diced jalapeños to the filling. If enchilada sauce seems thick, thin with a little vegetable broth.',
  source: 'https://realfoodwholelife.com/wprm_print/black-bean-and-sweet-potato-enchiladas',
  image: '',
};

export default recipe;
