import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipes } from '../Store/recipesSlice';
import { getRecipes } from '../Helpers/userRequest';

export default function StoreInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
      const frozenRecipes = await getRecipes('freezer-recipes');
      const freshRecipes = await getRecipes('fresh-freezer-base-recipes');
      const frozenBase = await getRecipes('base-freezer-recipes');
      dispatch(addRecipes({ freshRecipes, frozenRecipes, frozenBase }));
    };
    fetchRecipes();
  }, [dispatch]);

  return null; // This component doesn't render anything
}
