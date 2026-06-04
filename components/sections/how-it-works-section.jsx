"use client";

import { useState } from 'react';

const STEPS = [
  { num: '01', title: 'Workers List', desc: 'Name, job category, daily rate. Manage workers quickly.', img: '/screenshots/1-workerslist.png' },
  { num: '02', title: 'Daily Records', desc: 'P / H / A / OT per worker. One tap each.', img: '/screenshots/2-workers_daily.png' },
  { num: '03', title: 'Projects', desc: 'Add and track projects per worker with separate accounting and shares.', img: '/screenshots/8-worker_bagga_project.png' },
  { num: '04', title: 'Add Record', desc: 'Create work and settlement entries with notes and payment method.', img: '/screenshots/5-work_entry_mode_1.png' },
  { num: '05', title: 'Reports', desc: 'Generate PDF reports and salary slips for sharing or printing.', img: '/screenshots/12-bagga_slip.png' },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STEPS.map(({ num, title, desc }, i) => (
                <div
                  key={num}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActive(i)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i); } }}
                  style={{
                    display: 'flex', gap: 20, alignItems: 'flex-start',
                    background: 'var(--color-surface-container)',
                    border: '1px solid var(--color-outline-variant)',
                    borderRadius: 'var(--radius-card)',
                    padding: '24px', cursor: 'pointer',
                    ...(i === active ? { borderColor: 'var(--color-primary-brand)', boxShadow: '0 8px 30px rgba(2,6,23,0.06)' } : {}),
                  }}>
                  <div style={{
                    flexShrink: 0,
                    width: 44, height: 44,
                    borderRadius: 'var(--radius-s)',
                    background: i === active ? 'var(--color-primary)' : 'var(--color-primary-brand)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 14,
                    color: '#FFFFFF',
                  }}>{num}</div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16,
                      color: 'var(--color-on-surface)', marginBottom: 6,
                    }}>{title}</h3>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 14, lineHeight: 1.6,
                      color: 'var(--color-on-surface-variant)',
                    }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Screenshot preview */}
            <div className="wl-how-preview" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                width: 220, height: 480,
                background: '#111111',
                borderRadius: 32, padding: 5,
                boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px var(--color-outline-variant)',
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden' }}>
                  <img
                    src={STEPS[active].img}
                    alt={STEPS[active].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .wl-how-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 840px) {
          .wl-how-grid { grid-template-columns: 1fr; }
          .wl-how-preview { display: none; }
        }
      `}</style>
    </>
  );
}
