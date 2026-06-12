'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// --- Safe GSAP import for Next.js (avoids SSR crash) ---
let gsap;
let ScrollTrigger;
if (typeof window !== 'undefined') {
  gsap = (await import('gsap')).gsap;
  ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}

// NOTE: The dynamic import above requires your file to be in a
// plain Client Component. If you see a build error, use the
// useEffect-based import pattern shown in the comments below
// instead (see "Alternative safe import" comment).

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

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // FIX 3: Track direction in a ref, not state.
  // State is async — by the time the useEffect reads it, it may be stale.
  // A ref updates synchronously so the animation effect always gets the
  // correct value immediately.
  const directionRef = useRef(0);

  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const descRef = useRef(null);
  const touchStartX = useRef(0);

  const currentStep = STEPS[active];
  const prevIndex = active === 0 ? STEPS.length - 1 : active - 1;
  const nextIndex = (active + 1) % STEPS.length;

  // Responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const goToStep = (index) => {
    directionRef.current = index > active ? 1 : -1; // sync, no batching issue
    setActive(index);
  };

  const nextStep = useCallback(() => {
    directionRef.current = 1;
    setActive((prev) => (prev + 1) % STEPS.length);
  }, []);

  const prevStep = useCallback(() => {
    directionRef.current = -1;
    setActive((prev) => (prev === 0 ? STEPS.length - 1 : prev - 1));
  }, []);

  // Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft') prevStep();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep]);

  // Touch
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) nextStep();
      else prevStep();
    }
  };

  // FIX 1: Wrap GSAP in gsap.context() and return ctx.revert() for cleanup.
  // Without this, in Next.js Strict Mode the effect runs twice and you get
  // two ScrollTrigger instances stacked on top of each other, causing the
  // animation to fire at wrong scroll positions or not at all.
  useEffect(() => {
    if (!gsap || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true, // fire once only — prevents replaying when scrolling back
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // <-- cleans up ScrollTrigger + tweens on unmount
  }, []);

  // FIX 2: Guard with an early return when the ref isn't ready yet.
  // On first mount `phoneRef.current` is valid, but GSAP shouldn't animate
  // from an offset on load — only on subsequent step changes.
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (!gsap || !phoneRef.current) return;
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return; // skip animation on initial render
    }

    gsap.fromTo(
      phoneRef.current,
      {
        x: directionRef.current > 0 ? 80 : -80, // FIX 3: read ref, always current
        opacity: 0,
        scale: 0.95,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      }
    );
  }, [active]);

  // Text animation — same first-mount guard
  const isFirstTextMount = useRef(true);
  useEffect(() => {
    if (!gsap || !descRef.current) return;
    if (isFirstTextMount.current) {
      isFirstTextMount.current = false;
      return;
    }

    gsap.fromTo(
      descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, [active]);

  const PhoneMockup = ({ stepIndex, isMain = false, onClick }) => {
    const step = STEPS[stepIndex];
    return (
      <div
        onClick={onClick}
        style={{
          width: isMain ? 248 : 168,
          height: isMain ? 520 : 355,
          background: '#111',
          borderRadius: isMain ? 42 : 32,
          padding: isMain ? 7 : 5,
          boxShadow: isMain
            ? '0 50px 120px rgba(0,0,0,0.6)'
            : '0 20px 50px rgba(0,0,0,0.4)',
          cursor: 'pointer',
          transform: isMain ? 'scale(1)' : 'scale(0.92)',
          opacity: isMain ? 1 : 0.55,
          transition: 'all 0.3s ease',
        }}
      >
        <img
          src={step.image}
          alt={step.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 28,
          }}
        />
      </div>
    );
  };

  return (
    <section ref={sectionRef} style={{ padding: '64px 24px', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 42, fontWeight: 700 }}>
            Up and running in minutes
          </h2>
        </div>

        {/* PHONES */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 24,
            marginBottom: 30,
          }}
        >
          {!isMobile && <PhoneMockup stepIndex={prevIndex} />}

          <div ref={phoneRef}>
            <PhoneMockup stepIndex={active} isMain onClick={nextStep} />
          </div>

          {!isMobile && <PhoneMockup stepIndex={nextIndex} />}
        </div>

        {/* DESCRIPTION */}
        <p
          ref={descRef}
          style={{
            textAlign: 'center',
            maxWidth: 480,
            margin: '0 auto 30px',
            fontSize: 16,
            color: '#777',
          }}
        >
          {currentStep.desc}
        </p>

        {/* STEP BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {STEPS.map((step, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              style={{
                padding: '10px 16px',
                borderRadius: 12,
                border: i === active ? '1px solid #000' : '1px solid #ccc',
                background: i === active ? '#000' : '#fff',
                color: i === active ? '#fff' : '#000',
                cursor: 'pointer',
              }}
            >
              {step.num}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}