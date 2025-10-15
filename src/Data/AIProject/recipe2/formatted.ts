import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  ingredients: [
    {
      item: 'vegetable oil',
      amountUS: 2,
      measurementUS: 'tbsp',
      optional: false,
    },
    {
      item: 'dried onion flakes',
      amountUS: 1,
      measurementUS: 'tbsp',
      optional: false,
    },
    {
      item: 'dried minced garlic',
      amountUS: 0.25,
      measurementUS: 'tsp',
      optional: false,
    },
    {
      item: 'bay leaf',
      amountUS: 1,
      measurementUS: 'whole',
      optional: false,
    },
    {
      item: 'taco seasoning',
      amountUS: 2,
      measurementUS: 'tbsp',
      optional: false,
    },
    {
      item: 'dried black beans',
      amountUS: 1,
      measurementUS: 'lb',
      optional: false,
    },
    {
      item: 'water',
      amountUS: 5,
      measurementUS: 'cups',
      optional: false,
    },
    {
      item: 'fresh lime juice',
      amountUS: 2,
      measurementUS: 'tbsp',
      optional: false,
    },
  ],
  directions: [
    {
      directionSetTitle: 'Prepare and Cook Mexican Black Beans',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Place dried black beans in a large pot and cover with water. Bring to a rolling boil, then remove from heat. Cover and let sit for 1 hour to soften.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Drain beans thoroughly and set aside in a strainer.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Heat oil in the same pot over medium heat. Add dried onion flakes and garlic, and sauté for 3 minutes until fragrant.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Add bay leaf and taco seasoning, stirring for 30 seconds until aromatic.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Return beans to pot and add 5 cups water. Stir well to incorporate seasonings and scrape up any flavorful bits from bottom of pot.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Bring to a simmer, then reduce heat to low. Cover and simmer for 60-90 minutes until beans are tender and creamy.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Remove from heat and discard bay leaf. Stir in lime juice and let cool completely.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Portion beans with cooking liquid into freezer bags for storage, ensuring each bag contains enough liquid to keep beans moist.',
        },
      ],
    },
  ],
  name: 'Mexican Black Beans',
  freezer: true,
  nutritionNeeds: [],
  budget: true,
  season: [
    'fall',
    'winter',
    'spring',
    'summer',
  ],
  notes: '',
  source: '',
  image: '',
  howToFreeze: 'Allow beans to cool completely before freezing. Portion into family-sized freezer bags (about 2-3 cups per bag), including enough cooking liquid to keep beans moist during freezing. Remove excess air from bags, label with contents and date, and freeze for up to 6 months.',
  howToThaw: 'Thaw overnight in refrigerator for 12-24 hours, or place sealed bag in cold water bath for 2-3 hours. Heat gently on stovetop over low heat, stirring occasionally. Add water or broth if needed to reach desired consistency.',
};

export default recipe;
