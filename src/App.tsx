import React, { useEffect } from 'react';
import {
  Container,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Header, RecipeViewButton } from './Components/Header/header.tsx';
import MealPlan from './Components/MealPlan/meal-plan.tsx';
import frozenRecipes from './Data/frozen.json';
import freshFrozenBaseRecipes from './Data/fresh.json';
import frozenBaseRecipes from './Data/base.json';

import RecipeCollection from './Components/RecipeCollection/recipeCollection.tsx';
import ResponsiveGroceryListDrawer from './Components/GroceryList/groceryListDrawer.tsx';
import { addRecipes } from './Store/recipesSlice.ts';
import { RootState } from './Store/rootReducer.ts';
import './App.css';

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
    dispatch(addRecipes({
      freshRecipes: freshFrozenBaseRecipes,
      frozenRecipes,
      frozenBase: frozenBaseRecipes,
    }));
  }, [dispatch]); // empty brackets mean is should only be called upon mounting

  const handleGetMealPlanClick = () => {
    setViewMealPlan(true);
  };

  const handleShowAllRecipesClick = () => {
    // eslint-disable-next-line no-console
    console.log('Button Clicked');
    setViewMealPlan(false);
  };

  return (
    <Container className="body-container">
      <Header />
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
          <RecipeCollection
            frozenRecipes={displayedFrozenRecipes}
            frozenBaseRecipes={displayedFrozenBaseRecipes}
            freshRecipes={displayedFreshRecipes}
          />
        )}
    </Container>
  );
}

export default App;
