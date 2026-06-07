"use client";

import { useState } from 'react';

const STEPS = [
  { 
    num: '01', 
    title: 'Add your workers', 
    desc: 'Add name, job category, and daily rate. Set up each worker in under a minute.', 
    img: '/screenshots/1-workerslist.png' 
  },
  { 
    num: '02', 
    title: 'Mark attendance daily', 
    desc: 'P / H / A / OT per worker in one tap. Quickly record attendance for all workers.', 
    img: '/screenshots/2-workers_daily.png' 
  },
  { 
    num: '03', 
    title: 'Manage projects', 
    desc: 'Assign workers to projects and track earnings separately for each site.', 
    img: '/screenshots/8-worker_bagga_project.png' 
  },
  { 
    num: '04', 
    title: 'Record payments', 
    desc: 'Add advances, wages, and settlements. Running balance updates automatically.', 
    img: '/screenshots/5-work_entry_mode_1.png' 
  },
  { 
    num: '05', 
    title: 'Generate reports', 
    desc: 'Create detailed salary reports and download PDF slips for sharing or printing.', 
    img: '/screenshots/12-bagga_slip.png' 
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [showNew, setShowNew] = useState(true);

  const handleSetActive = (i) => {
    if (i === active) return;
    setActive(i);
    setShowNew(false);
    setTimeout(() => setShowNew(true), 20);
  };

  return (
    <>
      <section style={{ background: 'var(--color-surface)', padding: 'var(--space-3xl) var(--section-px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'block', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-primary)', fontFamily: "'Sora', sans-serif", marginBottom: 12,
            }}>How it works</span>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'var(--text-h1)', color: 'var(--color-on-surface)', marginBottom: 16,
            }}>Up and running in 3 minutes</h2>
            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 17,
              color: 'var(--color-on-surface-variant)',
            }}>No setup fee. No training. No paperwork.</p>

            <div style={{ marginTop: 18 }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: 'var(--color-on-surface-variant)', marginBottom: 12 }}>
                For full step-by-step instructions and printable details, open the complete guide.
              </p>
              <a href="/guide" style={{
                display: 'inline-block', padding: '10px 16px', borderRadius: 10,
                background: 'var(--color-primary-brand)', color: '#FFFFFF', fontWeight: 700,
                textDecoration: 'none', fontFamily: "'Outfit', sans-serif",
              }}>Read the Guide</a>
            </div>
          </div>

          <div className="wl-how-grid">
            {/* Steps column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {STEPS.map(({ num, title, desc }, i) => (
                <div
                  key={num}
                  className={`wl-step ${i === active ? 'active' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSetActive(i)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSetActive(i); } }}
                >
                  <div className="wl-step-num">{num}</div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16,
                      color: 'var(--color-on-surface)', marginBottom: 6,
                    }}>{title}</h3>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 14, lineHeight: 1.6,
                      color: 'var(--color-on-surface-variant)', margin: 0,
                    }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Screenshot preview */}
            <div className="wl-how-preview" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="wl-preview-frame">
                <div className="wl-preview-inner">
                  {STEPS.map((s, i) => (
                    <img
                      key={s.img}
                      src={s.img}
                      alt={s.title}
                      className={`wl-preview-img ${i === active && showNew ? 'visible' : ''}`}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .wl-how-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 48px;
          align-items: center;
        }
        .wl-step {
          display: flex; gap: 20px; align-items: flex-start;
          background: var(--color-surface-container);
          border: 1px solid var(--color-outline-variant);
          border-radius: var(--radius-card);
          padding: 20px; cursor: pointer;
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
        }
        .wl-step:hover { transform: translateY(-2px); }
        .wl-step.active { transform: translateY(-6px); border-color: var(--color-primary-brand); box-shadow: 0 18px 40px rgba(2,6,23,0.08); }
        .wl-step-num {
          flex-shrink: 0; width: 46px; height: 46px; border-radius: var(--radius-s);
          background: var(--color-primary-brand); display: flex; align-items: center; justifyContent: center;
          font-family: 'Sora', sans-serif; font-weight: 800; fontSize: 14px; color: #FFFFFF;
          transition: transform 220ms ease, background 220ms ease;
        }
        .wl-step.active .wl-step-num { transform: scale(1.06); background: var(--color-primary); }

        .wl-preview-frame {
          width: 240px; height: 520px; border-radius: 32px; padding: 6px; background: #0b0b0b;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px var(--color-outline-variant);
        }
        .wl-preview-inner { position: relative; width: 100%; height: 100%; border-radius: 26px; overflow: hidden; }
        .wl-preview-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top;
          opacity: 0; transform: translateY(8px) scale(0.995); transition: opacity 320ms ease, transform 420ms cubic-bezier(.2,.9,.2,1);
        }
        .wl-preview-img.visible { opacity: 1; transform: translateY(0) scale(1); }

        @media (max-width: 920px) {
          .wl-how-grid { grid-template-columns: 1fr; }
          .wl-how-preview { display: none; }
        }
      `}</style>
    </>
  );
}
