'use client';

import React, { useRef, useState } from 'react';
import { Testimonial } from '@/data/vehicles';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  if (!testimonials || testimonials.length === 0) return null;

  const items = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', width: '100%' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '80px', height: '100%',
        background: 'linear-gradient(to right, #F5F5F5, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '80px', height: '100%',
        background: 'linear-gradient(to left, #F5F5F5, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      <div
        ref={trackRef}
        className="testimonial-track"
        style={{
          display: 'flex',
          gap: '1.5rem',
          width: 'max-content',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {items.map((t, i) => (
          <div
            key={i}
            style={{
              width: 'clamp(280px, 35vw, 420px)',
              flexShrink: 0,
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '2rem clamp(1.25rem, 3vw, 2rem)',
              border: '1px solid #ECECEC',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative',
            }}
          >
            <span style={{
              position: 'absolute', top: '0.75rem', right: '1.5rem',
              fontSize: '5rem', lineHeight: 1, color: 'rgba(225,6,19,0.05)',
              fontWeight: 900, pointerEvents: 'none', userSelect: 'none',
            }}>"</span>

            <div style={{ display: 'flex', gap: '0.2rem' }}>
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j} style={{ color: '#E10613', fontSize: '1rem' }}>★</span>
              ))}
            </div>

            <p style={{
              fontFamily: 'var(--font-secondary)',
              fontSize: '0.9375rem',
              lineHeight: 1.75,
              color: '#4A4A4A',
              fontWeight: 300,
              fontStyle: 'italic',
              flexGrow: 1,
              position: 'relative',
              zIndex: 1,
            }}>
              &ldquo;{t.content}&rdquo;
            </p>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid #F5F5F5', paddingTop: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F5F5F5, #ECECEC)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', fontWeight: 700, color: '#2A2A2A',
                  border: '1px solid #E10613', flexShrink: 0,
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#2A2A2A' }}>{t.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#8A8A8A' }}>{t.role}</p>
                </div>
              </div>
              <span style={{
                background: 'rgba(225,6,19,0.06)', color: '#E10613',
                fontSize: '0.6875rem', fontWeight: 600, padding: '4px 10px',
                borderRadius: '999px', letterSpacing: '0.08em', textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                {t.vehicle}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes testimonial-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333%)); }
        }
        .testimonial-track {
          animation: testimonial-scroll ${testimonials.length * 5}s linear infinite;
        }
      `}</style>
    </div>
  );
}
