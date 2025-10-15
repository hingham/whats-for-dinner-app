import { FreezerRecipe } from '../../../Models/recipe';

/* eslint-disable max-len */
const recipe: Omit<FreezerRecipe, 'id'> = {
  ingredients: [
    {
      item: 'boneless, skinless chicken breasts',
      amountUS: 2.5,
      measurementUS: 'pounds',
      optional: false,
    },
    {
      item: 'chicken stock or water',
      amountUS: 1,
      measurementUS: 'cup',
      optional: false,
    },
    {
      item: 'kosher salt',
      amountUS: 1,
      measurementUS: 'teaspoon',
      optional: false,
    },
    {
      item: 'freshly ground black pepper',
      amountUS: 1,
      measurementUS: 'teaspoon',
      optional: false,
    },
  ],
  directions: [
    {
      directionSetTitle: 'Prepare Simple Shredded Pressure Cooker Chicken',
      steps: [
        {
          preNote: '',
          postNote: '',
          step: 'Add chicken breasts, chicken stock, salt, and pepper to the pressure cooker bowl. Toss gently to combine and arrange chicken in an even layer.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Cover with lid and set valve to "sealing." Pressure cook on high for 10 minutes, then allow natural pressure release for 5 minutes. Carefully quick-release any remaining pressure by turning valve to "venting."',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Remove lid and use two forks to shred the chicken into bite-sized pieces. Toss with the cooking juices in the pot.',
        },
        {
          preNote: '',
          postNote: '',
          step: 'Serve immediately while warm, or let cool completely before storing or freezing.',
        },
      ],
    },
  ],
  name: 'Simple Shredded Pressure Cooker Chicken',
  freezer: true,
  nutritionNeeds: [],
  budget: true,
  season: [
    'fall',
    'winter',
  ],
  notes: '',
  source: '',
  image: '',
  howToFreeze: 'Allow chicken to cool completely before freezing. Transfer to 2-3 freezer bags for convenient portioning. Include some cooking juices in each bag to preserve moisture during freezing. Remove excess air from bags, label with contents and date, and freeze for up to 3 months.',
  howToThaw: 'Thaw overnight in refrigerator for 12-24 hours. Reheat gently in microwave or on stovetop until warmed through. Add a splash of broth if needed to refresh moisture.',
};

export default recipe;
