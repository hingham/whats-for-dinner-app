import React from 'react';
// import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Header } from '../Components/Header/header';
// import store from '../Store/store';
import getStoreInitialData from './storeInitializer';
import StoreProvider from './storeProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialRecipes = await getStoreInitialData();
  return (
    <html lang="en">
      <StoreProvider initialRecipes={initialRecipes}>
        <body>
          <AppRouterCacheProvider>
            <Header />
            {/* The root element for the app */}
            <div id="root">{children}</div>
          </AppRouterCacheProvider>

        </body>
      </StoreProvider>
    </html>
  );
}
