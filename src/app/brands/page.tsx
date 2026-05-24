'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { brands, vehicles } from '@/data/vehicles';

export default function BrandsPage() {
  return (
    <>
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', background: '#FFFFFF' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto clamp(3rem, 5vw, 4rem)' }}>
            <p className="text-overline" style={{ marginBottom: '0.75rem' }}>Premium Marques</p>
            <h1 className="headline-section">Luxury Brands</h1>
            <p style={{ fontSize: '1rem', color: '#8A8A8A', marginTop: '1rem', lineHeight: 1.7 }}>
              Explore our curated selection from the world&apos;s most prestigious automotive manufacturers.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {brands.map((brand, i) => {
              const brandVehicles = vehicles.filter(v => v.brand.toLowerCase().replace(/\s+/g, '-') === brand.slug);
              return (
                <motion.div key={brand.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Link href={`/inventory?brand=${brand.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="brand-detail-card" style={{
                      background: '#FAFAFA', borderRadius: '20px', padding: '2.5rem 2rem',
                      border: '1px solid #ECECEC', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer', textAlign: 'center',
                    }}>
                      <div style={{
                        width: '80px', height: '80px', margin: '0 auto 1.5rem',
                        background: '#FFFFFF', borderRadius: '50%', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        border: '1px solid #ECECEC', fontSize: '1.25rem', fontWeight: 700, color: '#8A8A8A',
                        fontFamily: 'var(--font-primary)',
                      }}>
                        {brand.name.slice(0, 2).toUpperCase()}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.25rem', fontWeight: 700, color: '#2A2A2A', marginBottom: '0.25rem' }}>
                        {brand.name}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#B0B0B0', marginBottom: '1.5rem' }}>
                        {brand.count} Vehicles in Stock
                      </p>
                      {brandVehicles.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                          {brandVehicles.slice(0, 3).map(v => (
                            <span key={v.id} style={{ fontSize: '0.75rem', color: '#8A8A8A', background: '#FFFFFF', padding: '4px 10px', borderRadius: '999px', border: '1px solid #ECECEC' }}>
                              {v.model}
                            </span>
                          ))}
                        </div>
                      )}
                      <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#E10613', marginTop: '1.5rem', letterSpacing: '0.05em' }}>
                        View Collection →
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .brand-detail-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          border-color: #E10613 !important;
        }
      `}</style>
    </>
  );
}
