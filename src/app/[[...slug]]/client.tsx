'use client';

/**
The 'use client' directive makes this file a Client Component.
The dynamic import with ssr: false disables server-side rendering for the <App /> component,
making it truly client-only (SPA).
 */

import React from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../spa-index'), { ssr: false });

export default function ClientOnly() {
  return (
    <App />
  );
}
