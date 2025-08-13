import React from 'react';
import {
  Container,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RecipeViewButton } from './Components/Header/header';
// eslint-disable-next-line import/extensions
import MealPlan from './Components/MealPlan/meal-plan';

// import RecipeCollection from './Components/RecipeCollection/recipeCollection';
import ResponsiveGroceryListDrawer from './Components/GroceryList/groceryListDrawer';
import { RootState } from './Store/rootReducer';
import './App.css';
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

  const handleGetMealPlanClick = () => {
    setViewMealPlan(true);
  };

  const handleShowAllRecipesClick = () => {
    // eslint-disable-next-line no-console
    setViewMealPlan(false);
  };

  return (
    <Container className="body-container">
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
