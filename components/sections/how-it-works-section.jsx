'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: '01',
    title: 'Add your workers',
    desc: 'Add name, job category, and daily rate. Set up each worker in under a minute.',
    image: '/screenshots/addworker.png',
  },
  {
    num: '02',
    title: 'Mark attendance daily',
    desc: 'P / H / A / OT per worker in one tap. Quickly record attendance for all workers.',
    image: '/screenshots/dailyledger.png',
  },
  {
    num: '03',
    title: 'Manage projects',
    desc: 'Assign workers to projects and track earnings separately for each site.',
    image: '/screenshots/workerproject.png',
  },
  {
    num: '04',
    title: 'Record payments',
    desc: 'Add advances, wages, and settlements. Running balance updates automatically.',
    image: '/screenshots/workerentry.png',
  },
  {
    num: '05',
    title: 'Generate reports',
    desc: 'Create detailed salary reports and PDF slips.',
    image: '/screenshots/workerslip.png',
  },
];

// Each "distance" from the active phone maps to a visual slot.
// dist 0 = active center, dist ±1 = adjacent, dist ±2 = far sides
const SLOTS = {
  '-2': { x: -355, scale: 0.58, opacity: 0.18 },
  '-1': { x: -195, scale: 0.78, opacity: 0.46 },
   '0': { x:    0, scale: 1.00, opacity: 1.00 },
   '1': { x:  195, scale: 0.78, opacity: 0.46 },
   '2': { x:  355, scale: 0.58, opacity: 0.18 },
};

const SLOTS_MOBILE = {
  '-2': { x: -188, scale: 0.50, opacity: 0.10 },
  '-1': { x: -112, scale: 0.70, opacity: 0.36 },
   '0': { x:    0, scale: 1.00, opacity: 1.00 },
   '1': { x:  112, scale: 0.70, opacity: 0.36 },
   '2': { x:  188, scale: 0.50, opacity: 0.10 },
};

// Shortest circular distance from active to index
function circDist(index, active, total) {
  const raw = (index - active + total) % total;
  return raw > total / 2 ? raw - total : raw;
}

function getSlot(index, active, total, isMobile) {
  const dist = circDist(index, active, total);
  const clamped = Math.max(-2, Math.min(2, dist));
  const table = isMobile ? SLOTS_MOBILE : SLOTS;
  return {
    ...table[String(clamped)],
    zIndex: 5 - Math.abs(clamped), // center = 5, far = 1
  };
}

// Phone dimensions
const PHONE_W = 220;
const PHONE_H = 462;
const PHONE_W_MOBILE = 188;
const PHONE_H_MOBILE = 395;

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef   = useRef(null);
  const phoneRefs    = useRef([]);
  const titleRef     = useRef(null);
  const descRef      = useRef(null);
  const touchStartX  = useRef(null);

  // First render flags — phones should snap, not animate, on initial load
  const isFirstPhone = useRef(true);
  const isFirstText  = useRef(true);

  const nextStep = useCallback(() => setActive(p => (p + 1) % STEPS.length), []);
  const prevStep = useCallback(() => setActive(p => (p === 0 ? STEPS.length - 1 : p - 1)), []);

  // Responsive breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft')  prevStep();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextStep, prevStep]);

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? nextStep() : prevStep();
    touchStartX.current = null;
  };

  // Scroll reveal for the whole section
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 48,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate all 5 phones whenever active index or mobile flag changes.
  // First render: gsap.set (instant). Subsequent: gsap.to (animated).
  useEffect(() => {
    const snap = isFirstPhone.current;
    if (snap) isFirstPhone.current = false;

    phoneRefs.current.forEach((el, i) => {
      if (!el) return;
      const slot = getSlot(i, active, STEPS.length, isMobile);

      // zIndex can't be tweened — always set immediately
      gsap.set(el, { zIndex: slot.zIndex });

      if (snap) {
        gsap.set(el, { x: slot.x, scale: slot.scale, opacity: slot.opacity });
      } else {
        gsap.to(el, {
          x: slot.x,
          scale: slot.scale,
          opacity: slot.opacity,
          duration: 0.52,
          ease: 'power3.out',
        });
      }
    });
  }, [active, isMobile]);

  // Fade title + description text on step change (skip first mount)
  useEffect(() => {
    if (isFirstText.current) { isFirstText.current = false; return; }
    const els = [titleRef.current, descRef.current].filter(Boolean);
    gsap.fromTo(
      els,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.32, ease: 'power2.out', stagger: 0.06 }
    );
  }, [active]);

  const phoneW = isMobile ? PHONE_W_MOBILE : PHONE_W;
  const phoneH = isMobile ? PHONE_H_MOBILE : PHONE_H;

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '80px 0 68px',
        background: 'var(--color-surface)',
        overflow: 'hidden', // clip side phones cleanly
      }}
    >

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: 52, padding: '0 24px' }}>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          marginBottom: 12,
        }}>
          How it works
        </p>
        <h2 style={{
          fontSize: 'clamp(26px, 4vw, 40px)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: 'var(--color-on-surface)',
        }}>
          Up and running in minutes
        </h2>
      </div>

      {/* ── Carousel ── */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          height: phoneH + 20,    // slight breathing room
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {STEPS.map((step, i) => (
          <div
            key={i}
            ref={el => (phoneRefs.current[i] = el)}
            onClick={() => { if (i !== active) setActive(i); }}
            style={{
              position: 'absolute',
              width: phoneW,
              height: phoneH,
              cursor: i === active ? 'default' : 'pointer',
              willChange: 'transform, opacity',
              transformOrigin: 'center center',
            }}
          >
            {/* Phone bezel */}
            <div style={{
              width: '100%',
              height: '100%',
              background: '#07090d',
              borderRadius: isMobile ? 34 : 40,
              padding: isMobile ? 5 : 6,
              boxShadow: i === active
                ? '0 36px 90px rgba(0,0,0,0.72), 0 0 0 1px rgba(255,255,255,0.07)'
                : '0 14px 36px rgba(0,0,0,0.38)',
            }}>
              {/* Screen */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: isMobile ? 29 : 34,
                overflow: 'hidden',
                background: '#111',
              }}>
                <img
                  src={step.image}
                  alt={step.title}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    userSelect: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Step info ── */}
      <div style={{ textAlign: 'center', padding: '0 24px', marginTop: 32, marginBottom: 26 }}>
        <p
          ref={titleRef}
          style={{
            fontSize: isMobile ? 16 : 18,
            fontWeight: 600,
            color: 'var(--color-on-surface)',
            marginBottom: 8,
            letterSpacing: '-0.01em',
          }}
        >
          <span style={{ color: 'var(--color-primary)', marginRight: 8, fontWeight: 500, fontSize: '0.85em' }}>
            {STEPS[active].num}
          </span>
          {STEPS[active].title}
        </p>
        <p
          ref={descRef}
          style={{
            maxWidth: 400,
            margin: '0 auto',
            fontSize: isMobile ? 13 : 14,
            lineHeight: 1.7,
            color: 'var(--color-on-surface-variant)',
          }}
        >
          {STEPS[active].desc}
        </p>
      </div>

      {/* ── Progress dots ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
      }}>
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to step ${i + 1}`}
            style={{
              height: 6,
              width: i === active ? 24 : 6,
              borderRadius: 9999,
              border: 'none',
              padding: 0,
              background: i === active
                ? 'var(--color-primary)'
                : 'var(--color-outline-variant)',
              cursor: 'pointer',
              transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1), background 0.25s ease',
            }}
          />
        ))}
      </div>

    </section>
  );
}