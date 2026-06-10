'use client';

import { useState } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Add your workers',
    desc: 'Add name, job category, and daily rate. Set up each worker in under a minute.',
    img: '/screenshots/1-workerslist.png',
  },
  {
    num: '02',
    title: 'Mark attendance daily',
    desc: 'Mark P / H / A / OT per worker in one tap. Quickly record attendance for all workers.',
    img: '/screenshots/2-workers_daily.png',
  },
  {
    num: '03',
    title: 'Manage projects',
    desc: 'Assign workers to projects and track earnings separately for each site.',
    img: '/screenshots/8-worker_bagga_project.png',
  },
  {
    num: '04',
    title: 'Record payments',
    desc: 'Add advances, wages, and settlements. Running balance updates automatically.',
    img: '/screenshots/5-work_entry_mode_1.png',
  },
  {
    num: '05',
    title: 'Generate reports',
    desc: 'Create detailed salary reports and download PDF slips for sharing or printing.',
    img: '/screenshots/12-bagga_slip.png',
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const goToStep = (newIndex) => {
    if (newIndex === active) return;
    setDirection(newIndex > active ? 1 : -1);
    setActive(newIndex);
  };

  return (
    <section style={{ background: 'var(--color-surface)', padding: 'var(--space-3xl) var(--section-px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'block', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--color-primary)', fontFamily: "'Sora', sans-serif", marginBottom: 12,
          }}>
            How it works
          </span>
          <h2 style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 700,
            fontSize: 'var(--text-h1)', color: 'var(--color-on-surface)', marginBottom: 16,
          }}>
            Up and running in 3 minutes
          </h2>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 17,
            color: 'var(--color-on-surface-variant)',
          }}>
            No setup fee. No training. No paperwork.
          </p>
        </div>

        <div className="wl-how-grid">
          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <div
                  key={i}
                  className={`wl-step ${isActive ? 'active' : ''}`}
                  onClick={() => goToStep(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && goToStep(i)}
                >
                  <div className="wl-step-num">{step.num}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated Phone Mockup */}
          <div className="wl-how-preview">
            <div className="wl-preview-frame">
              <div className="wl-preview-inner">
                {STEPS.map((step, i) => {
                  const isActive = i === active;
                  return (
                    <img
                      key={i}
                      src={step.img}
                      alt={step.title}
                      className={`wl-preview-img ${isActive ? 'visible' : ''}`}
                      style={{
                        transform: isActive 
                          ? 'translateY(0) scale(1)' 
                          : `translateY(${direction * 30}px) scale(0.96)`,
                        opacity: isActive ? 1 : 0,
                        transition: 'all 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Step Progress Dots */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 8, 
              marginTop: 16 
            }}>
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  style={{
                    width: i === active ? 22 : 8,
                    height: 8,
                    borderRadius: 999,
                    background: i === active ? 'var(--color-primary)' : 'var(--color-outline-variant)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .wl-how-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 48px;
          align-items: start;
        }

        .wl-step {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          background: var(--color-surface-container);
          border: 1px solid var(--color-outline-variant);
          border-radius: var(--radius-card);
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .wl-step:hover {
          transform: translateY(-2px);
          border-color: var(--color-outline);
        }

        .wl-step.active {
          border-color: var(--color-primary-brand);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transform: translateY(-4px);
        }

        .wl-step-num {
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          border-radius: var(--radius-s);
          background: var(--color-primary-brand);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: #FFFFFF;
        }

        .wl-step.active .wl-step-num {
          background: var(--color-primary);
          transform: scale(1.05);
        }

        .wl-preview-frame {
          width: 100%;
          max-width: 300px;
          aspect-ratio: 9 / 19.5;
          border-radius: 40px;
          padding: 10px;
          background: linear-gradient(#1a1a1a, #0a0a0a);
          box-shadow: 0 25px 70px rgba(0,0,0,0.4),
                      0 0 0 12px #111,
                      0 0 0 16px #222;
          margin: 0 auto;
          position: relative;
        }

        .wl-preview-frame::before {
          content: '';
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 28px;
          background: #000;
          border-radius: 20px;
          z-index: 2;
        }

        .wl-preview-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 30px;
          overflow: hidden;
          background: #000;
        }

        .wl-preview-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }

        @media (max-width: 920px) {
          .wl-how-grid {
            grid-template-columns: 1fr;
          }
          .wl-how-preview {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
