import React from 'react';
// import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Header } from '../Components/Header/header';
// import store from '../Store/store';
import getStoreInitialData from './storeInitializer';
import StoreProvider from './storeProvider';
import './globals.css';

// export const metadata: Metadata = {
//   title: "What's For Dinner?",
//   description: "Meal planning app",
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialRecipes = await getStoreInitialData();
  return (
    <html lang="en">
      <StoreProvider initialRecipes={initialRecipes}>
        <body className="body-container">
          <div className="w-full">
            <AppRouterCacheProvider>
              <Header />
              {/* The root element for the app */}
              <div id="root">{children}</div>
            </AppRouterCacheProvider>
          </div>
        </body>
      </StoreProvider>
    </html>
  );
}
