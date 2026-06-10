'use client';

import { useState, useEffect } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Add your workers',
    desc: 'Add name, job category, and daily rate. Set up each worker in under a minute.',
    darkImg: '/screenshots/1-dark.png',
    lightImg: '/screenshots/1-light.png',
  },
  {
    num: '02',
    title: 'Mark attendance daily',
    desc: 'Mark P / H / A / OT per worker in one tap.',
    darkImg: '/screenshots/2-dark.png',
    lightImg: '/screenshots/2-light.png',
  },
  {
    num: '03',
    title: 'Manage projects',
    desc: 'Assign workers to projects and track earnings separately.',
    darkImg: '/screenshots/3-dark.png',
    lightImg: '/screenshots/3-light.png',
  },
  {
    num: '04',
    title: 'Record payments',
    desc: 'Add advances, wages, and settlements automatically.',
    darkImg: '/screenshots/4-dark.png',
    lightImg: '/screenshots/4-light.png',
  },
  {
    num: '05',
    title: 'Generate reports',
    desc: 'Create detailed salary reports and PDF slips.',
    darkImg: '/screenshots/5-dark.png',
    lightImg: '/screenshots/5-light.png',
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handler = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const currentStep = STEPS[active];
  const currentImage = isDarkMode ? currentStep.darkImg : currentStep.lightImg;

  const goToStep = (index) => setActive(index);
  const nextStep = () => setActive((prev) => (prev + 1) % STEPS.length);
  const prevStep = () => setActive((prev) => (prev === 0 ? STEPS.length - 1 : prev - 1));

  // Swipe Support
  let touchStartX = 0;

  const handleTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextStep() : prevStep();
    }
  };

  return (
    <section className="bg-[var(--color-surface)] py-16 md:py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-[3px] text-[var(--color-primary)] mb-3">
            HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-4">
            Up and running in 3 minutes
          </h2>
          <p className="text-lg text-[var(--color-on-surface-variant)]">
            No setup fee. No training. No paperwork.
          </p>
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center mb-10">
          <div
            onClick={nextStep}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="cursor-pointer transition-transform active:scale-[0.985]"
            style={{
              width: '240px',
              aspectRatio: '9 / 19',
              background: 'linear-gradient(145deg, #111111, #0a0a0a)',
              borderRadius: '44px',
              padding: '10px',
              border: '1px solid #222',
              boxShadow: '0 25px 70px rgb(0 0 0 / 0.45)',
            }}
          >
            <div 
              className="w-full h-full rounded-[36px] overflow-hidden bg-black"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
            >
              <img
                src={currentImage}
                alt={currentStep.title}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Improved */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {STEPS.map((step, index) => {
              const isActive = index === active;
              return (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`
                    group flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border text-sm font-medium
                    transition-all duration-200 active:scale-[0.985]
                    ${isActive 
                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-sm' 
                      : 'bg-[var(--color-surface-container)] border-[var(--color-outline-variant)] hover:border-zinc-600 text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-high)]'
                    }
                  `}
                >
                  <span className={`font-bold transition-colors ${isActive ? 'text-white' : 'text-[var(--color-primary)] group-hover:text-[var(--color-primary)]'}`}>
                    {step.num}
                  </span>
                  <span className="hidden sm:inline font-medium tracking-tight">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
