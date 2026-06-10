'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Add your workers',
    desc: 'Add name, job category, and daily rate. Set up each worker in under a minute.',
    darkImg: '/screenshots/1-workerslist.png',
    lightImg: '/screenshots/1-workerslist.png',
  },
  {
    num: '02',
    title: 'Mark attendance daily',
    desc: 'Mark P / H / A / OT per worker in one tap.',
    darkImg: '/screenshots/2-workers_daily.png',
    lightImg: '/screenshots/2-workers_daily.png',
  },
  {
    num: '03',
    title: 'Manage projects',
    desc: 'Assign workers to projects and track earnings separately.',
    darkImg: '/screenshots/5-work_entry_mode_1.png',
    lightImg: '/screenshots/5-work_entry_mode_1.png',
  },
  {
    num: '04',
    title: 'Record payments',
    desc: 'Add advances, wages, and settlements automatically.',
    darkImg: '/screenshots/8-worker_bagga_project.png',
    lightImg: '/screenshots/8-worker_bagga_project.png',
  },
  {
    num: '05',
    title: 'Generate reports',
    desc: 'Create detailed salary reports and PDF slips.',
    darkImg: '/screenshots/12-bagga_slip.png',
    lightImg: '/screenshots/12-bagga_slip.png',
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number>(0);

  const currentStep = STEPS[active];
  const currentImage = isDarkMode ? currentStep.darkImg : currentStep.lightImg;

  // Theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const goToStep = (index: number) => {
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

  // Keyboard navigation (moved AFTER nextStep/prevStep)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft') prevStep();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextStep() : prevStep();
    }
  };

  // Image animation style
  const imageStyle: React.CSSProperties = {
    transform: `translateX(${direction * 10}px)`,
    transition: 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease',
  };

  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-bold tracking-[3px] text-[var(--color-primary)] mb-3">
            HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Up and running in minutes
          </h2>
          <p className="text-lg text-[var(--color-on-surface-variant)] max-w-md mx-auto">
            No setup fee. No training. No paperwork.
          </p>
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center mb-10">
          <div
            onClick={nextStep}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="cursor-pointer active:scale-[0.985] transition-transform"
            style={{
              width: '240px',
              aspectRatio: '9 / 19',
              background: 'linear-gradient(145deg, #111111, #0a0a0a)',
              borderRadius: '44px',
              padding: '12px',
              border: '1px solid #222',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '36px',
                overflow: 'hidden',
                background: '#000',
                position: 'relative',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '96px',
                  height: '22px',
                  background: '#111',
                  borderRadius: '999px',
                  zIndex: 10,
                }}
              />

              {/* Screenshot */}
              <img
                key={active}
                src={currentImage}
                alt={currentStep.title}
                className="w-full h-full object-cover select-none"
                style={imageStyle}
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-[420px] mx-auto mb-6">
          <div className="h-[3px] bg-[var(--color-outline-variant)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] transition-all duration-300"
              style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Buttons */}
        <div className="max-w-[720px] mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {STEPS.map((step, index) => {
              const isActive = index === active;
              return (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`
                    flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all active:scale-[0.985]
                    ${isActive
                      ? 'bg-[var(--color-primary)] text-[#0F1418] border border-[var(--color-primary)] shadow-sm'
                      : 'bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] hover:bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)]'
                    }
                  `}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className={`font-bold ${isActive ? 'text-[#0F1418]' : 'text-[var(--color-primary)]'}`}>
                    {step.num}
                  </span>
                  <span className="hidden sm:inline tracking-tight">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hint */}
        <p className="text-center mt-6 text-sm text-[var(--color-on-surface-variant)] opacity-70">
          Tap the phone or use ← → keys • Swipe on mobile
        </p>
      </div>
    </section>
  );
}
