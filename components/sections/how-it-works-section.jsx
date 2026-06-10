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

  return (
    <section style={{ 
      background: 'var(--color-surface)', 
      padding: 'var(--space-3xl) var(--section-px)' 
    }}>
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
            color: 'var(--color-on-surface-variant)', marginBottom: 20,
          }}>
            No setup fee. No training. No paperwork.
          </p>

          <a 
            href="/guide" 
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              borderRadius: 10,
              background: 'var(--color-primary-brand)',
              color: '#FFFFFF',
              fontWeight: 700,
              textDecoration: 'none',
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15,
            }}
          >
            Read the Complete Guide
          </a>
        </div>

        <div className="wl-how-grid">
          {/* Steps List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <div
                  key={step.num}
                  className={`wl-step ${isActive ? 'active' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-current={isActive ? 'step' : undefined}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActive(i);
                    }
                  }}
                >
                  <div className="wl-step-num">{step.num}</div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: 'var(--color-on-surface)',
                      marginBottom: 6,
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: 'var(--color-on-surface-variant)',
                      margin: 0,
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Screenshot Preview */}
          <div className="wl-how-preview">
            <div className="wl-preview-frame">
              <div className="wl-preview-inner">
                {STEPS.map((step, i) => (
                  <img
                    key={step.img}
                    src={step.img}
                    alt={step.title}
                    className={`wl-preview-img ${i === active ? 'visible' : ''}`}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .wl-how-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
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
          transition: all 0.2s ease;
        }

        .wl-step.active .wl-step-num {
          background: var(--color-primary);
          transform: scale(1.05);
        }

        .wl-preview-frame {
          width: 100%;
          max-width: 280px;
          aspect-ratio: 9 / 19.5;
          border-radius: 32px;
          padding: 8px;
          background: #0b0b0b;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35), 
                      0 0 0 1px var(--color-outline-variant);
          margin: 0 auto;
        }

        .wl-preview-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
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
          opacity: 0;
          transform: translateY(10px) scale(0.985);
          transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        .wl-preview-img.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Mobile */
        @media (max-width: 920px) {
          .wl-how-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .wl-how-preview {
            order: -1; /* Show image first on mobile */
          }
          
          .wl-preview-frame {
            max-width: 260px;
          }
        }
      `}</style>
    </section>
  );
}
