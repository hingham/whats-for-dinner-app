'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../Store/store';
import { FreezerRecipe, FreshFrozenBaseRecipe, UserRecipe } from '../Models/recipe';

let storeRef: React.MutableRefObject<AppStore | null>;

export default function StoreProvider({
  children,
  initialRecipes,
}: {
  children: React.ReactNode,
  initialRecipes: {
    recipes: {
      frozenRecipes: FreezerRecipe[];
      freshRecipes: FreshFrozenBaseRecipe[];
      frozenBase: FreezerRecipe[];
    };
    selected: UserRecipe[];
  };
}) {
  storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore(initialRecipes || {
      recipes: {
        frozenRecipes: [],
        freshRecipes: [],
        frozenBase: [],
      },
      selected: [],
    });
  }

  // eslint-disable-next-line react/react-in-jsx-scope
  return <Provider store={storeRef.current}>{children}</Provider>;
}
