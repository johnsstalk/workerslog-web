'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const STEPS = [
  { 
    num: '01', 
    title: 'Add your workers', 
    desc: 'Add name, job category, and daily rate. Set up each worker in under a minute.', 
    img: '/screenshots/addworker.png'
  },
  { 
    num: '02', 
    title: 'Mark attendance daily', 
    desc: 'P / H / A / OT per worker in one tap. Quickly record attendance for all workers.', 
    img: '/screenshots/dailyledger.png'
  },
  { 
    num: '03', 
    title: 'Manage projects', 
    desc: 'Assign workers to projects and track earnings separately for each site.', 
    img: '/screenshots/workerproject.png'
  },
  { 
    num: '04', 
    title: 'Record payments', 
    desc: 'Add advances, wages, and settlements. Running balance updates automatically.', 
    img: '/screenshots/workerentry.png'
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
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const nextStep = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % STEPS.length);
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
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

  // Reusable Phone Component
  const PhoneMockup = ({ stepIndex, isMain = false, onClick }) => {
    const step = STEPS[stepIndex];
    const isActive = stepIndex === active;

    return (
      <div
        onClick={onClick}
        style={{
          width: isMain ? 248 : 168,
          height: isMain ? 520 : 355,
          background: '#111111',
          borderRadius: isMain ? 42 : 32,
          padding: isMain ? 7 : 5,
          boxShadow: isMain 
            ? '0 50px 120px rgba(0,0,0,0.6), 0 0 0 1px var(--color-outline-variant), inset 0 0 0 1px rgba(255,255,255,0.08)'
            : '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px var(--color-outline-variant)',
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
          transform: isMain ? 'scale(1)' : 'scale(0.92)',
          opacity: isMain ? 1 : 0.55,
          zIndex: isMain ? 2 : 1,
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: isMain ? 36 : 28,
          overflow: 'hidden',
          background: '#000',
        }}>
          <img
            src={step.image}
            alt={step.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
              transform: isMain ? `translateX(${direction * 8}px)` : 'none',
            }}
            draggable={false}
          />
        </div>
      </div>
    );
  };

  return (
    <section style={{ background: 'var(--color-surface)', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
            color: 'var(--color-primary)', marginBottom: '12px'
          }}>
            HOW IT WORKS
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700,
            letterSpacing: '-0.02em', marginBottom: '16px'
          }}>
            Up and running in minutes
          </h2>
          <p style={{
            fontSize: '18px', color: 'var(--color-on-surface-variant)',
            maxWidth: '420px', margin: '0 auto'
          }}>
            No setup fee. No training. No paperwork.
          </p>
        </div>

        {/* === NEW INTERACTIVE 3-PHONE PREVIEW === */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '12px' : '24px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {/* Previous Step Preview */}
          {!isMobile && (
            <div onClick={() => goToStep(prevIndex)} style={{ cursor: 'pointer' }}>
              <PhoneMockup stepIndex={prevIndex} />
            </div>
          )}

          {/* Main Phone (Current Step) */}
          <div onClick={nextStep} style={{ cursor: 'pointer' }}>
            <PhoneMockup stepIndex={active} isMain={true} />
          </div>

          {/* Next Step Preview */}
          {!isMobile && (
            <div onClick={() => goToStep(nextIndex)} style={{ cursor: 'pointer' }}>
              <PhoneMockup stepIndex={nextIndex} />
            </div>
          )}
        </div>

        {/* Description */}
        <p style={{
          textAlign: 'center',
          maxWidth: '480px',
          margin: '0 auto 28px',
          fontSize: '15.5px',
          color: 'var(--color-on-surface-variant)',
          lineHeight: 1.6
        }}>
          {currentStep.desc}
        </p>

        {/* Progress Bar */}
        <div style={{ maxWidth: '420px', margin: '0 auto 24px' }}>
          <div style={{
            height: '3px',
            background: 'var(--color-outline-variant)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'var(--color-primary)',
              width: `${((active + 1) / STEPS.length) * 100}%`,
              transition: 'width 0.4s cubic-bezier(0.32, 0.72, 0, 1)'
            }} />
          </div>
        </div>

        {/* Step Buttons - White text when active */}
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {STEPS.map((step, index) => {
              const isActive = index === active;
              return (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '11px 20px',
                    borderRadius: '14px',
                    border: isActive 
                      ? '1px solid var(--color-primary)' 
                      : '1px solid var(--color-outline-variant)',
                    background: isActive 
                      ? 'var(--color-primary)' 
                      : 'var(--color-surface-container)',
                    color: isActive ? '#FFFFFF' : 'var(--color-on-surface)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ 
                    fontWeight: 700, 
                    color: isActive ? '#FFFFFF' : 'var(--color-primary)' 
                  }}>
                    {step.num}
                  </span>
                  {!isMobile && <span>{step.title}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '28px',
          fontSize: '13px',
          color: 'var(--color-on-surface-variant)',
          opacity: 0.75
        }}>
          Tap phone or side previews • Use ← → keys • Swipe
        </p>
      </div>
    </section>
  );
}
