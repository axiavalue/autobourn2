'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { vehicles } from '@/data/vehicles';

export default function CompareBar() {
  const { compareList, toggleCompare, clearCompare } = useWishlist();

  if (compareList.length === 0) return null;

  const compareVehicles = compareList
    .map(id => vehicles.find(v => v.id === id))
    .filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(30px)',
          borderTop: '1px solid #ECECEC',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.08)',
          padding: '1rem 0',
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: '#E10613', color: '#fff', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 700,
            }}>
              {compareList.length}
            </span>
            <span style={{
              fontSize: '0.8125rem', fontWeight: 600, color: '#2A2A2A',
              fontFamily: 'var(--font-primary)',
            }}>
              Compare
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
            {compareVehicles.map(v => v && (
              <div key={v.id} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: '#F5F5F5', borderRadius: '10px', padding: '0.5rem 1rem',
              }}>
                <div style={{
                  width: '48px', height: '36px', borderRadius: '6px', overflow: 'hidden',
                  position: 'relative', flexShrink: 0,
                }}>
                  <Image
                    src={v.images[0]}
                    alt={`${v.brand} ${v.model}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="48px"
                  />
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2A2A2A' }}>
                    {v.brand} {v.model}
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: '#8A8A8A' }}>{v.year}</p>
                </div>
                <button
                  onClick={() => toggleCompare(v.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '1rem', color: '#B0B0B0', padding: '2px',
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            {compareList.length < 3 && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px dashed #DADADA', borderRadius: '10px', padding: '0.5rem 1.5rem',
                fontSize: '0.75rem', color: '#B0B0B0',
              }}>
                + Add vehicle
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {compareList.length >= 2 && (
              <Link
                href={`/compare?ids=${compareList.join(',')}`}
                className="btn btn-primary btn-sm"
                style={{ textDecoration: 'none' }}
              >
                Compare Now
              </Link>
            )}
            <button
              onClick={clearCompare}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem' }}
            >
              Clear
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
