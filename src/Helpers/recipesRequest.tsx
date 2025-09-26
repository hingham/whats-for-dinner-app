import { CollectionType } from '../Models/enums';
import { Recipe } from '../Models/recipe';
import { getRecipeTypeFromId, getUuidFromId } from './general';
import { putRequest, postRequest } from './request';

const putRecipe = async (recipeId: string, recipe: Recipe, token: string) => {
  try {
    const collection = getRecipeTypeFromId(recipeId);
    const id = getUuidFromId(recipeId);
    const response = await putRequest(`/datastore/${collection}/${id}`, token, { recipe });
    return response;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const postRecipe = async (recipe: Recipe, collection: CollectionType, token: string) => {
  try {
    const response = await postRequest(`/datastore/${collection}`, token, recipe);
    return response;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

// eslint-disable-next-line import/prefer-default-export
export { putRecipe, postRecipe };
