import { putRequest, getRequest } from './request';

const getRecipes = async (collectionId: string) => {
  try {
    // Token is empty string here because authentication is not required for reading recipes
    const response = await getRequest(`/datastore/${collectionId}`, '');
    return response;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

const putUserRole = async (userId: string, role: string, token: string) => {
  try {
    const response = await putRequest(`/user/${userId}/role`, token, { role });
    return response;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

// eslint-disable-next-line import/prefer-default-export
export { putUserRole, getRecipes };
