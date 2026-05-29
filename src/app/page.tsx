'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { vehicles, brands, testimonials, statistics, whyAutoBourn, formatPrice } from '@/data/vehicles';
import VehicleCard from '@/components/VehicleCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { useScrollReveal, useCountUp, useMouseTilt } from '@/hooks/useAnimations';

/* ── SVG Feature Icons ── */
function FeatureIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    shield: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E10613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    search: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E10613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="m11 8v6M8 11h6" />
      </svg>
    ),
    warranty: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E10613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    finance: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E10613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </svg>
    ),
    insurance: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E10613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
    crown: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E10613" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" />
        <path d="M5 16h14v4H5z" />
      </svg>
    ),
  };
  return <span style={{ display: 'inline-flex' }}>{iconMap[icon] || <span style={{ fontSize: '2rem', color: '#E10613' }}>✦</span>}</span>;
}

/* ── Stat counter ── */
function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const { ref, count } = useCountUp(value, 2000);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      style={{ textAlign: 'center' }}
    >
      <p style={{
        fontFamily: 'var(--font-primary)', fontSize: 'clamp(3rem, 8vw, 6rem)',
        fontWeight: 200, color: '#2A2A2A', lineHeight: 1, letterSpacing: '-0.04em',
      }}>
        {count}<span style={{ color: '#E10613' }}>{suffix}</span>
      </p>
      <p style={{ fontSize: '0.875rem', color: '#8A8A8A', marginTop: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}>
        {label}
      </p>
    </motion.div>
  );
}

/* ── Floating Social Icons Component ── */
function FloatingIcons() {
  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 800,
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
    }}>
      {/* WhatsApp */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Auto%20Bourn%2C%20I%27m%20interested%20in%20a%20luxury%20vehicle."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="floating-icon"
        style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: '#25D366', display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
          transition: 'all 0.3s ease', textDecoration: 'none',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      {/* Phone */}
      <a
        href="tel:+919876543210"
        aria-label="Call us"
        className="floating-icon"
        style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: '#E10613', display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: '0 4px 20px rgba(225,6,19,0.35)',
          transition: 'all 0.3s ease', textDecoration: 'none',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
      {/* Instagram */}
      <a
        href="https://instagram.com/autobourn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow on Instagram"
        className="floating-icon"
        style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: '0 4px 20px rgba(220,39,67,0.35)',
          transition: 'all 0.3s ease', textDecoration: 'none',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
    </div>
  );
}

export default function HomePage() {
  const heroTilt = useMouseTilt(2);
  const featuredVehicles = vehicles.filter(v => v.featured).slice(0, 4);
  const recentVehicles = vehicles.filter(v => v.recentlyAdded).slice(0, 4);
  const section2 = useScrollReveal();
  const section3 = useScrollReveal();
  const section4 = useScrollReveal();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', background: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background accents */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(225,6,19,0.03) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-30%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(245,245,245,0.8) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 6vw, 6rem)', alignItems: 'center', width: '100%', padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 4vw, 3rem)' }}>
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#E10613', marginBottom: '1.5rem' }}>
                Premium Pre-Owned Collection
              </p>
              <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#2A2A2A', marginBottom: '1.5rem' }}>
                DRIVE<br />BEYOND<br /><span style={{ color: '#E10613' }}>LUXURY</span>
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', lineHeight: 1.7, color: '#4A4A4A', maxWidth: '480px', marginBottom: '2.5rem' }}>
                Curated collection of certified premium pre-owned vehicles. 
                Every car inspected, every detail perfected, every drive exceptional.
              </p>
            </motion.div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link 
                href="/inventory" 
                className="btn btn-primary btn-lg" 
                style={{ 
                  textDecoration: 'none', 
                  transition: 'transform var(--duration-normal) var(--ease-luxury), box-shadow var(--duration-normal) var(--ease-luxury)' 
                }}
              >
                Explore Collection
              </Link>
              <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'inline-flex' }}>
                <Link href="/contact" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>Book Test Drive</Link>
              </motion.div>
            </div>
          </div>

          {/* Right — Vehicle Display with REAL IMAGE */}
          <motion.div
            ref={heroTilt}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hero-vehicle-container"
            style={{ position: 'relative' }}
          >
            <div className="animate-float-slow" style={{
              width: '100%', aspectRatio: '4/3', borderRadius: '24px',
              overflow: 'hidden', position: 'relative',
              boxShadow: '0 30px 60px rgba(0,0,0,0.10)',
            }}>
              <Image
                src="/vehicles/hero-showroom.png"
                alt="Auto Bourn Premium Showroom"
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Price tag */}
              <div style={{
                position: 'absolute', bottom: '24px', right: '24px',
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
                borderRadius: '12px', padding: '12px 20px', border: '1px solid #ECECEC',
              }}>
                <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8A8A8A', marginBottom: '2px' }}>Starting from</p>
                <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: '1.125rem', color: '#2A2A2A' }}>{formatPrice(3800000)}</p>
              </div>
              {/* Brand badge */}
              <div style={{
                position: 'absolute', top: '24px', left: '24px',
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)',
                borderRadius: '999px', padding: '8px 16px',
              }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Premium Showroom
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* ═══ FEATURED INVENTORY ═══ */}
      <section ref={section2.ref} className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
            <p className="text-overline" style={{ marginBottom: '0.75rem' }}>Featured Collection</p>
            <h2 className="headline-section">Handpicked Luxury</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'clamp(1.5rem, 2vw, 2rem)' }}>
            {featuredVehicles.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/inventory" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>View All Vehicles</Link>
          </div>
        </div>
      </section>

      {/* ═══ BRAND SHOWCASE ═══ */}
      <section ref={section3.ref} className="section" style={{ background: '#F5F5F5' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
            <p className="text-overline" style={{ marginBottom: '0.75rem' }}>Luxury Brands</p>
            <h2 className="headline-section">World&apos;s Finest Marques</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1.5rem' }}>
            {brands.map((brand, i) => (
              <motion.div key={brand.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Link href={`/inventory?brand=${brand.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="brand-card" style={{
                    background: '#FFFFFF', borderRadius: '16px', padding: '2rem 1rem',
                    textAlign: 'center', border: '1px solid #ECECEC',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer',
                  }}>
                    <div style={{ width: '48px', height: '48px', margin: '0 auto 1rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={48}
                        height={48}
                        style={{ objectFit: 'contain' }}
                        className="brand-logo-img"
                      />
                    </div>
                    <p style={{ fontFamily: 'var(--font-primary)', fontSize: '0.875rem', fontWeight: 600, color: '#2A2A2A', marginBottom: '0.25rem' }}>{brand.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#B0B0B0' }}>{brand.count} Vehicles</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY AUTO BOURN ═══ */}
      <section ref={section4.ref} className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
            <p className="text-overline" style={{ marginBottom: '0.75rem' }}>The Auto Bourn Difference</p>
            <h2 className="headline-section">Why Choose Us</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {whyAutoBourn.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="card-glass" style={{ padding: '2rem', height: '100%' }}>
                  <FeatureIcon icon={item.icon} />
                  <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.125rem', fontWeight: 700, color: '#2A2A2A', margin: '1rem 0 0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#4A4A4A' }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECENTLY ADDED ═══ */}
      <section className="section" style={{ background: '#F5F5F5' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(2rem, 4vw, 3rem)', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="text-overline" style={{ marginBottom: '0.5rem' }}>Just Arrived</p>
              <h2 className="headline-section">Recently Added</h2>
            </div>
            <Link href="/inventory" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>View All →</Link>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'clamp(1.5rem, 2vw, 2rem)' }}>
            {recentVehicles.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ STATISTICS ═══ */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(2rem, 4vw, 4rem)' }}>
            {statistics.map((stat, i) => (
              <StatItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section" style={{ background: '#F5F5F5' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <p className="text-overline" style={{ marginBottom: '0.75rem' }}>Testimonials</p>
            <h2 className="headline-section">What Our Clients Say</h2>
          </motion.div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              textAlign: 'center', padding: 'clamp(3rem, 6vw, 5rem)',
              background: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)',
              borderRadius: '24px', border: '1px solid #ECECEC',
            }}
          >
            <p className="text-overline" style={{ marginBottom: '1rem' }}>Ready to Begin?</p>
            <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#2A2A2A', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
              Your Next Luxury Drive<br /><span style={{ color: '#E10613' }}>Starts Here</span>
            </h2>
            <p style={{ fontSize: '1rem', color: '#8A8A8A', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Schedule a private showing or browse our curated collection from the comfort of your home.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/inventory" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>Explore Collection</Link>
              <Link href="/sell" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>Sell Your Car</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Floating Social Icons ── */}
      <FloatingIcons />

      {/* ── Global page styles ── */}
      <style jsx global>{`
        .brand-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.06); border-color: #E10613 !important; }
        .brand-logo-img { filter: grayscale(100%) brightness(0.4); opacity: 0.6; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .brand-card:hover .brand-logo-img { filter: grayscale(0%) brightness(1); opacity: 1; }
        .floating-icon:hover { transform: translateY(-4px) scale(1.05); }
        @media (max-width: 768px) {
          .hero-vehicle-container { display: none; }
          section:first-of-type > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
