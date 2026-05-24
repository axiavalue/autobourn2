'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  compareList: string[];
  toggleCompare: (id: string) => void;
  isComparing: (id: string) => boolean;
  clearCompare: () => void;
  mounted: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage ONLY after mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const saved = localStorage.getItem('autobourn-wishlist');
      if (saved) setWishlist(JSON.parse(saved));
      const savedCompare = localStorage.getItem('autobourn-compare');
      if (savedCompare) setCompareList(JSON.parse(savedCompare));
    } catch {}
    setMounted(true);
  }, []);

  // Persist wishlist
  useEffect(() => {
    if (mounted) localStorage.setItem('autobourn-wishlist', JSON.stringify(wishlist));
  }, [wishlist, mounted]);

  // Persist compare list
  useEffect(() => {
    if (mounted) localStorage.setItem('autobourn-compare', JSON.stringify(compareList));
  }, [compareList, mounted]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id: string) => wishlist.includes(id);

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const isComparing = (id: string) => compareList.includes(id);
  const clearCompare = () => setCompareList([]);

  return (
    <WishlistContext.Provider value={{
      wishlist, toggleWishlist, isWishlisted,
      compareList, toggleCompare, isComparing, clearCompare, mounted,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
