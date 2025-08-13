'use client';

import React from 'react';
// import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Header } from '../Components/Header/header';
// import store from '../Store/store';
import StoreInitializer from './storeInitializer';
import StoreProvider from './storeProvider';

// Can't use with 'use client'
// export const metadata: Metadata = {
//   title: 'React App',
//   description: 'Web site created with Next.js.',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          <AppRouterCacheProvider>
            <Header />
            <StoreInitializer />
            {/* The root element for the app */}
            <div id="root">{children}</div>
          </AppRouterCacheProvider>

        </body>
      </StoreProvider>
    </html>
  );
}
