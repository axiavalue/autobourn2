'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinancePage() {
  const partners = [
    { name: 'HDFC Bank', rate: '8.25%', type: 'Bank' },
    { name: 'ICICI Bank', rate: '8.50%', type: 'Bank' },
    { name: 'Axis Bank', rate: '8.75%', type: 'Bank' },
    { name: 'Kotak Mahindra', rate: '8.90%', type: 'Bank' },
    { name: 'Bajaj Finance', rate: '9.00%', type: 'NBFC' },
    { name: 'Tata Capital', rate: '9.25%', type: 'NBFC' },
  ];

  const benefits = [
    { icon: '✦', title: 'Quick Approval', desc: 'Get loan approval within 24 hours with minimal documentation.' },
    { icon: '◆', title: 'Flexible Tenure', desc: 'Choose repayment tenure from 12 to 84 months to suit your budget.' },
    { icon: '●', title: 'Competitive Rates', desc: 'Best-in-class interest rates starting from just 8.25% p.a.' },
    { icon: '▲', title: 'Hassle-Free Process', desc: 'End-to-end digital processing with dedicated relationship manager.' },
  ];

  return (
    <>
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', background: '#FFFFFF' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto clamp(3rem, 5vw, 4rem)' }}>
            <p className="text-overline" style={{ marginBottom: '0.75rem' }}>Finance Solutions</p>
            <h1 className="headline-section">Premium Vehicle Financing</h1>
            <p style={{ fontSize: '1rem', color: '#8A8A8A', marginTop: '1rem', lineHeight: 1.7 }}>
              Competitive rates from India&apos;s leading banks and NBFCs. Hassle-free processing with quick approvals.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto 4rem' }}>
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ background: '#FAFAFA', borderRadius: '16px', padding: '2rem', border: '1px solid #ECECEC', height: '100%' }}>
                  <span style={{ fontSize: '1.5rem', color: '#E10613', display: 'block', marginBottom: '1rem' }}>{b.icon}</span>
                  <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.125rem', fontWeight: 700, color: '#2A2A2A', marginBottom: '0.5rem' }}>{b.title}</h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#4A4A4A' }}>{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            style={{
              textAlign: 'center', padding: 'clamp(2.5rem, 5vw, 4rem)',
              background: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 100%)',
              borderRadius: '24px', border: '1px solid #ECECEC', maxWidth: '700px', margin: '0 auto 4rem',
            }}>
            <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: '#2A2A2A', marginBottom: '0.75rem' }}>
              Ready to <span style={{ color: '#E10613' }}>Finance</span> Your Dream Car?
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#8A8A8A', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
              Get in touch with our finance team for a personalized quote and pre-approval.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>Apply for Finance</Link>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="section" style={{ background: '#F5F5F5' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="text-overline" style={{ marginBottom: '0.5rem' }}>Our Partners</p>
            <h2 className="headline-section">Finance Partners</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {partners.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #ECECEC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: '#2A2A2A', marginBottom: '0.25rem' }}>{p.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#B0B0B0' }}>{p.type}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A8A8A' }}>From</p>
                    <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, color: '#E10613' }}>{p.rate}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
