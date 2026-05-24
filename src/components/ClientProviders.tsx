'use client';

import { WishlistProvider } from '@/context/WishlistContext';
import CompareBar from '@/components/CompareBar';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      {children}
      <CompareBar />
    </WishlistProvider>
  );
}
