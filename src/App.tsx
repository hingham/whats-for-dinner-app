import React, { useEffect } from 'react';
import {
  Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Header, RecipeViewButton } from './Components/Header/header';
// eslint-disable-next-line import/extensions
import MealPlan from './Components/MealPlan/meal-plan';

// import RecipeCollection from './Components/RecipeCollection/recipeCollection';
import ResponsiveGroceryListDrawer from './Components/GroceryList/groceryListDrawer';
import { addRecipes } from './Store/recipesSlice';
import { RootState } from './Store/rootReducer';
import './App.css';
import { getRecipes } from './Helpers/userRequest';
import Auth from './Components/Auth/auth';
import WeeklyRecipes from './Components/WeeklyRecipes/weeklyRecipes';

function App() {
  const {
    freshRecipes: displayedFreshRecipes,
    frozenBase: displayedFrozenBaseRecipes,
    frozenRecipes: displayedFrozenRecipes,
  } = useSelector(
    (state: RootState) => state.recipes.recipes,
  );
  const [viewMealPlan, setViewMealPlan] = React.useState(true);

  // Dispatch to add all the new recipes
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRecipes = async () => {
      const frozenRecipes = await getRecipes('freezer-recipes');
      const freshRecipes = await getRecipes('fresh-freezer-base-recipes');
      const frozenBase = await getRecipes('base-freezer-recipes');
      dispatch(addRecipes({
        freshRecipes,
        frozenRecipes,
        frozenBase,
      }));
    };

    fetchRecipes();
  }, [dispatch]); // empty brackets mean is should only be called upon mounting

  const handleGetMealPlanClick = () => {
    setViewMealPlan(true);
  };

  const handleShowAllRecipesClick = () => {
    // eslint-disable-next-line no-console
    setViewMealPlan(false);
  };

  return (
    <Container className="body-container">
      <Header />
      <Auth />
      <RecipeViewButton
        showMealPlan={viewMealPlan}
        onGetMealPlanClick={handleGetMealPlanClick}
        onViewAllRecipesClick={handleShowAllRecipesClick}
      />

      {viewMealPlan
        ? (
          <div className="meal-plan-container">
            <MealPlan
              frozenRecipes={displayedFrozenRecipes}
              frozenBaseRecipes={displayedFrozenBaseRecipes}
              freshRecipes={displayedFreshRecipes}
            />
            <ResponsiveGroceryListDrawer />
          </div>
        ) : (
          <WeeklyRecipes />
        )}
    </Container>
  );
}

export default App;
