import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  image: '',
  howToFreeze: 'Let cooked tofu cool completely. Place in freezer-safe zip-lock bags or containers, removing as much air as possible. Label with date and freeze for up to 3 months. Portion into meal-sized amounts for easy use.',
  howToThaw: 'Thaw overnight in refrigerator for 24-48 hours, or let sit at room temperature for 2-4 hours. Reheat in a skillet with a little oil over medium heat until warmed through and crispy, or bake at 350°F for 10-15 minutes.',
  ingredients: [
    {
      item: 'extra-firm tofu',
      amountUS: 14,
      measurementUS: 'ounces',
      optional: false,
    },
    {
      item: 'soy sauce (or tamari)',
      amountUS: 1,
      measurementUS: 'tablespoon',
      optional: false,
    },
    {
      item: 'cornstarch',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
    {
      item: 'olive oil',
      amountUS: 2,
      measurementUS: 'tablespoons',
      optional: false,
    },
  ],
  directions: [
    {
      directionSetTitle: 'Prepare Tofu',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Press the tofu by wrapping it in paper towels or a clean tea towel. Place a plate on top, then add heavy books or a cast iron pan for weight. Press for 30 minutes to 1 hour to remove excess moisture.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Cut the pressed tofu into 1-inch cubes and place in a large bowl. Drizzle with soy sauce and gently toss with a silicone spatula, being careful not to break the tofu.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Let marinate for 15 minutes to 4 hours for more flavor (optional but recommended).',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Sprinkle cornstarch over the tofu and gently toss to coat all pieces evenly.',
        },
      ],
    },
    {
      directionSetTitle: 'Cook Tofu - Stovetop Method',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Heat a large non-stick pan over medium-high heat. Add olive oil and swirl to coat the pan.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Once oil is hot, add tofu in a single layer (work in batches if necessary). Let brown undisturbed for 3-4 minutes per side until golden brown on all sides.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Transfer to a plate and serve immediately, or let cool for freezing.',
        },
      ],
    },
    {
      directionSetTitle: 'Cook Tofu - Oven Method',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Preheat oven to 400°F. Line a baking sheet with parchment paper.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Spread tofu in a single layer on the prepared baking sheet, ensuring pieces don\'t touch.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Bake for 25-30 minutes, flipping halfway through, until golden brown and crispy on all sides.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Serve immediately while crispy, or let cool completely for freezing.',
        },
      ],
    },
  ],
  name: 'Simple Baked Crispy Tofu',
  freezer: true,
  nutritionNeeds: [],
  budget: true,
  season: [
    'spring',
    'summer',
    'fall',
    'winter',
  ],
  notes: 'Pressing tofu is essential for crispy results - it removes excess moisture. Can substitute tamari for soy sauce if gluten-free. For meal prep, press several blocks on weekends and store in refrigerator. Cooked tofu can be added to stir-fries, salads, grain bowls, or eaten as a protein snack.',
  source: 'https://cookieandkate.com/how-to-make-crispy-baked-tofu/#tasty-recipes-24123-jump-target',
};

export default recipe;
