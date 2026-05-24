'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { testimonials, statistics } from '@/data/vehicles';
import { useCountUp } from '@/hooks/useAnimations';

function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const { ref, count } = useCountUp(value, 2000);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 200, color: '#2A2A2A', lineHeight: 1 }}>
        {count}<span style={{ color: '#E10613' }}>{suffix}</span>
      </p>
      <p style={{ fontSize: '0.8125rem', color: '#8A8A8A', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const values = [
    { icon: '✦', title: 'Transparency', desc: 'Complete vehicle history, fair pricing, and honest assessments — no hidden surprises.' },
    { icon: '◆', title: 'Excellence', desc: 'Every vehicle meets our exacting standards of quality, condition, and provenance.' },
    { icon: '●', title: 'Trust', desc: 'Built on integrity, backed by warranties, and supported by genuine customer care.' },
    { icon: '▲', title: 'Innovation', desc: 'Leveraging technology for seamless experiences — from AI search to digital documentation.' },
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 0', background: '#FFFFFF' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ maxWidth: '700px' }}>
            <p className="text-overline" style={{ marginBottom: '0.75rem' }}>About Auto Bourn</p>
            <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#2A2A2A', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              Redefining<br />Pre-Owned <span style={{ color: '#E10613' }}>Luxury</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', lineHeight: 1.8, color: '#4A4A4A' }}>
              Auto Bourn was founded with a singular vision — to transform the pre-owned luxury car experience in India. 
              We believe every premium vehicle deserves to be presented, sold, and owned with the same reverence as when it first left the showroom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ background: '#F5F5F5' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '3rem' }}>
            {statistics.map((s, i) => <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} />)}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <p className="text-overline" style={{ marginBottom: '0.5rem' }}>Our Principles</p>
            <h2 className="headline-section">Core Values</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ background: '#FAFAFA', borderRadius: '16px', padding: '2rem', border: '1px solid #ECECEC', height: '100%' }}>
                  <span style={{ fontSize: '1.5rem', color: '#E10613', display: 'block', marginBottom: '1rem' }}>{v.icon}</span>
                  <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.125rem', fontWeight: 700, color: '#2A2A2A', marginBottom: '0.5rem' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#4A4A4A' }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section" style={{ background: '#F5F5F5' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="text-overline" style={{ marginBottom: '0.5rem' }}>Testimonials</p>
            <h2 className="headline-section">Client Stories</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '2rem', border: '1px solid #ECECEC', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                    {Array.from({ length: t.rating }).map((_, j) => <span key={j} style={{ color: '#E10613', fontSize: '0.875rem' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#4A4A4A', flex: 1 }}>&ldquo;{t.content}&rdquo;</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid #F0F0F0', paddingTop: '1rem', marginTop: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 700, color: '#8A8A8A' }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2A2A2A' }}>{t.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#B0B0B0' }}>{t.role} · {t.vehicle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#2A2A2A', marginBottom: '1rem' }}>
              Experience the <span style={{ color: '#E10613' }}>Difference</span>
            </h2>
            <p style={{ color: '#8A8A8A', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>Visit our showroom or browse our collection online.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/inventory" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>Browse Collection</Link>
              <Link href="/contact" className="btn btn-secondary btn-lg" style={{ textDecoration: 'none' }}>Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
