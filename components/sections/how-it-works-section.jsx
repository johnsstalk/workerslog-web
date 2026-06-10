'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Add your workers',
    desc: 'Add name, job category, and daily rate. Set up each worker in under a minute.',
    image: '/screenshots/1-workerslist.png',
  },
  {
    num: '02',
    title: 'Mark attendance daily',
    desc: 'Mark P / H / A / OT per worker in one tap.',
    image: '/screenshots/2-workers_daily.png',
  },
  {
    num: '03',
    title: 'Manage projects',
    desc: 'Assign workers to projects and track earnings separately.',
    image: '/screenshots/5-work_entry_mode_1.png',
  },
  {
    num: '04',
    title: 'Record payments',
    desc: 'Add advances, wages, and settlements automatically.',
    image: '/screenshots/8-worker_bagga_project.png',
  },
  {
    num: '05',
    title: 'Generate reports',
    desc: 'Create detailed salary reports and PDF slips.',
    image: '/screenshots/12-bagga_slip.png',
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);

  const currentStep = STEPS[active];

  // Proper responsive detection (no window access during render)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft') prevStep();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep]);

  // Touch / swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextStep();
      else prevStep();
    }
  };

  // Improved image transition (actually uses opacity now)
  const imageStyle = {
    transform: `translateX(${direction * 12}px)`,
    opacity: 1,
    transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease',
  };

  return (
    <section style={{ background: 'var(--color-surface)', padding: '64px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ 
            fontSize: '11px', 
            fontWeight: 700, 
            letterSpacing: '3px', 
            color: 'var(--color-primary)', 
            marginBottom: '12px' 
          }}>
            HOW IT WORKS
          </div>
          <h2 style={{ 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: 700, 
            letterSpacing: '-0.02em', 
            marginBottom: '16px' 
          }}>
            Up and running in minutes
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--color-on-surface-variant)', 
            maxWidth: '420px', 
            margin: '0 auto' 
          }}>
            No setup fee. No training. No paperwork.
          </p>
        </div>

        {/* Phone Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div
            onClick={nextStep}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              width: '240px',
              aspectRatio: '9 / 19',
              background: 'linear-gradient(145deg, #111111, #0a0a0a)',
              borderRadius: '44px',
              padding: '12px',
              border: '1px solid #222',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.06)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '100%', 
              height: '100%', 
              borderRadius: '36px', 
              overflow: 'hidden',
              background: '#000', 
              position: 'relative', 
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
            }}>
              {/* Phone notch */}
              <div style={{
                position: 'absolute', 
                top: '10px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                width: '96px', 
                height: '22px', 
                background: '#111', 
                borderRadius: '999px', 
                zIndex: 10
              }} />
              
              <img
                key={active}
                src={currentStep.image}
                alt={currentStep.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  ...imageStyle 
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Current Step Description (NEW - was missing) */}
        <p style={{ 
          textAlign: 'center', 
          maxWidth: '460px', 
          margin: '0 auto 32px',
          fontSize: '15px',
          color: 'var(--color-on-surface-variant)',
          lineHeight: 1.5
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

        {/* Step Buttons */}
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
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
                    padding: '10px 18px',
                    borderRadius: '14px',
                    border: isActive 
                      ? '1px solid var(--color-primary)' 
                      : '1px solid var(--color-outline-variant)',
                    background: isActive 
                      ? 'var(--color-primary)' 
                      : 'var(--color-surface-container)',
                    color: isActive ? '#0F1418' : 'var(--color-on-surface)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ 
                    fontWeight: 700, 
                    color: isActive ? '#0F1418' : 'var(--color-primary)' 
                  }}>
                    {step.num}
                  </span>
                  {!isMobile && (
                    <span>{step.title}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '24px', 
          fontSize: '13px', 
          color: 'var(--color-on-surface-variant)', 
          opacity: 0.7 
        }}>
          Tap the phone or use ← → keys • Swipe on mobile
        </p>
      </div>
    </section>
  );
}
