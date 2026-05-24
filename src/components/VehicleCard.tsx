'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Vehicle, formatPrice, formatMileage } from '@/data/vehicles';
import { useWishlist } from '@/context/WishlistContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export default function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const { toggleWishlist, isWishlisted, toggleCompare, isComparing } = useWishlist();
  const wishlisted = isWishlisted(vehicle.id);
  const comparing = isComparing(vehicle.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="card" style={{ cursor: 'pointer', position: 'relative' }}>
        <div style={{ aspectRatio: '16/10', position: 'relative', overflow: 'hidden', background: '#F5F5F5' }}>
          <Image
            src={vehicle.images[0]}
            alt={`${vehicle.brand} ${vehicle.model} ${vehicle.variant}`}
            fill
            style={{
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="vehicle-card-img"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {vehicle.tags[0] && (
            <span style={{
              position: 'absolute', top: '12px', left: '12px',
              background: '#E10613', color: '#fff', fontSize: '0.625rem',
              fontWeight: 600, padding: '5px 12px', borderRadius: '999px',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              zIndex: 2,
            }}>{vehicle.tags[0]}</span>
          )}
          {/* Action Buttons */}
          <div style={{
            position: 'absolute', top: '10px', right: '10px',
            display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2,
          }}>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(vehicle.id); }}
              title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
                border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                color: wishlisted ? '#E10613' : '#B0B0B0',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? '#E10613' : 'none'} stroke={wishlisted ? '#E10613' : '#B0B0B0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCompare(vehicle.id); }}
              title={comparing ? 'Remove from compare' : 'Add to compare'}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: comparing ? '#E10613' : 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                border: 'none', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                color: comparing ? '#fff' : '#8A8A8A',
                fontFamily: 'var(--font-secondary)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={comparing ? '#fff' : '#8A8A8A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </button>
          </div>
          {/* Savings Badge */}
          {vehicle.originalPrice && (
            <div style={{
              position: 'absolute', bottom: '10px', left: '12px',
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)',
              borderRadius: '8px', padding: '4px 10px', zIndex: 2,
            }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#4ADE80' }}>
                Save {formatPrice(vehicle.originalPrice - vehicle.price)}
              </span>
            </div>
          )}
        </div>
        <Link href={`/vehicle/${vehicle.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#E10613', marginBottom: '0.375rem' }}>
              {vehicle.brand}
            </p>
            <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.25rem', fontWeight: 700, color: '#2A2A2A', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
              {vehicle.model}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#8A8A8A', marginBottom: '1rem' }}>
              {vehicle.variant} · {vehicle.year}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {[formatMileage(vehicle.mileage), vehicle.fuelType, vehicle.transmission].map((spec) => (
                <span key={spec} style={{ fontSize: '0.75rem', color: '#8A8A8A', background: '#F5F5F5', padding: '4px 10px', borderRadius: '999px' }}>{spec}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F0F0', paddingTop: '1rem' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-primary)', fontSize: '1.25rem', fontWeight: 700, color: '#2A2A2A' }}>{formatPrice(vehicle.price)}</p>
                {vehicle.originalPrice && <p style={{ fontSize: '0.75rem', color: '#B0B0B0', textDecoration: 'line-through' }}>{formatPrice(vehicle.originalPrice)}</p>}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#E10613', letterSpacing: '0.05em' }}>VIEW →</span>
            </div>
          </div>
        </Link>
      </div>
      <style jsx global>{`.card:hover .vehicle-card-img { transform: scale(1.05); }`}</style>
    </motion.div>
  );
}
