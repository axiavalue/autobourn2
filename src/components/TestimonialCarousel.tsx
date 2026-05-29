'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/data/vehicles';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
    }),
  };

  if (!testimonials || testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: 'relative',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 4rem',
      }}
    >
      <div style={{ position: 'relative', width: '100%', minHeight: '260px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '2.5rem clamp(1.5rem, 4vw, 3rem)',
              border: '1px solid #ECECEC',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Quote Mark Icon Accent */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '2.5rem',
                fontSize: '8rem',
                lineHeight: 1,
                fontFamily: 'var(--font-primary), serif',
                color: 'rgba(225,6,19,0.04)',
                userSelect: 'none',
                pointerEvents: 'none',
                fontWeight: 900
              }}>
                “
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem', position: 'relative', zIndex: 2 }}>
                {Array.from({ length: currentTestimonial.rating }).map((_, j) => (
                  <span key={j} style={{ color: '#E10613', fontSize: '1.125rem' }}>★</span>
                ))}
              </div>
              <p style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                lineHeight: 1.7,
                color: '#2A2A2A',
                fontWeight: 300,
                marginBottom: '2rem',
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 2
              }}>
                &ldquo;{currentTestimonial.content}&rdquo;
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #F5F5F5',
              paddingTop: '1.5rem',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F5F5F5 0%, #ECECEC 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#2A2A2A',
                  border: '1px solid #E10613'
                }}>
                  {currentTestimonial.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#2A2A2A' }}>{currentTestimonial.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#8A8A8A' }}>{currentTestimonial.role}</p>
                </div>
              </div>
              <div style={{
                background: 'rgba(225,6,19,0.06)',
                color: '#E10613',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '999px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                {currentTestimonial.vehicle}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        aria-label="Previous Testimonial"
        style={{
          position: 'absolute',
          left: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#FFFFFF',
          border: '1px solid #ECECEC',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#2A2A2A',
          transition: 'all 0.3s ease',
          zIndex: 10
        }}
        className="carousel-nav-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button 
        onClick={handleNext}
        aria-label="Next Testimonial"
        style={{
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#FFFFFF',
          border: '1px solid #ECECEC',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#2A2A2A',
          transition: 'all 0.3s ease',
          zIndex: 10
        }}
        className="carousel-nav-btn"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '2.5rem'
      }}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            style={{
              width: index === currentIndex ? '28px' : '8px',
              height: '8px',
              borderRadius: '999px',
              background: index === currentIndex ? '#E10613' : '#DADADA',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              padding: 0
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        .carousel-nav-btn:hover {
          border-color: #E10613 !important;
          color: #E10613 !important;
          background: #FFFFFF !important;
          box-shadow: 0 8px 24px rgba(225,6,19,0.18) !important;
          transform: translateY(-50%) scale(1.05) !important;
        }
      `}</style>
    </div>
  );
}
