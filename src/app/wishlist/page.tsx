'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { vehicles } from '@/data/vehicles';
import { useWishlist } from '@/context/WishlistContext';
import VehicleCard from '@/components/VehicleCard';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistVehicles = wishlist.map(id => vehicles.find(v => v.id === id)).filter(Boolean);

  return (
    <>
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', background: '#FFFFFF', minHeight: '60vh' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
            <p className="text-overline" style={{ marginBottom: '0.75rem' }}>Your Collection</p>
            <h1 className="headline-section">Wishlist</h1>
            <p style={{ fontSize: '1rem', color: '#8A8A8A', marginTop: '0.75rem' }}>
              {wishlistVehicles.length > 0
                ? `${wishlistVehicles.length} vehicle${wishlistVehicles.length > 1 ? 's' : ''} saved`
                : 'Your wishlist is empty'
              }
            </p>
          </motion.div>

          {wishlistVehicles.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'clamp(1.5rem, 2vw, 2rem)' }}>
              {wishlistVehicles.map((v, i) => v && <VehicleCard key={v.id} vehicle={v} index={i} />)}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ textAlign: 'center', padding: '3rem 0' }}
            >
              <div style={{
                width: '120px', height: '120px', borderRadius: '50%',
                background: '#F5F5F5', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 2rem',
                fontSize: '3rem',
              }}>
                🤍
              </div>
              <p style={{
                fontFamily: 'var(--font-primary)', fontSize: '1.5rem',
                fontWeight: 600, color: '#2A2A2A', marginBottom: '0.75rem',
              }}>
                No vehicles saved yet
              </p>
              <p style={{ color: '#8A8A8A', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                Browse our curated collection and tap the heart icon to save your favorite luxury vehicles.
              </p>
              <Link href="/inventory" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>
                Explore Collection
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
