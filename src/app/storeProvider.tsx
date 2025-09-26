'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../Store/store';
import { Recipe, UserRecipe } from '../Models/recipe';

export default function StoreProvider({
  children,
  initialRecipes,
}: {
  children: React.ReactNode,
  initialRecipes: {
    recipes: {
      frozenRecipes: Recipe[];
      freshRecipes: Recipe[];
      frozenBase: Recipe[];
    };
    selected: UserRecipe[];
  };
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore(initialRecipes);
  }

  // eslint-disable-next-line react/react-in-jsx-scope
  return <Provider store={storeRef.current}>{children}</Provider>;
}
