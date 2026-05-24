'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isRunning, setIsRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isRunning) {
          setIsRunning(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isRunning, end, start, duration]);

  return { ref, count };
}

export function useMouseTilt(intensity = 2) {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = ref.current;
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    element.style.transform = `perspective(1000px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg)`;
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    element.style.transition = 'transform 0.5s ease-out';
  }, []);

  const handleMouseEnter = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.transition = 'none';
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  return ref;
}

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.style.transform = `translateY(${scrolled * speed * -0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}
