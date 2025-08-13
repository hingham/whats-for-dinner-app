'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../Store/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  // eslint-disable-next-line react/react-in-jsx-scope
  return <Provider store={storeRef.current}>{children}</Provider>;
}
