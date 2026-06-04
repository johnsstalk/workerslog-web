const STEPS = [
  {
    num: '01', title: 'Add your workers',
    desc: 'Name, job category, daily rate. Takes under a minute per worker.',
  },
  {
    num: '02', title: 'Mark attendance daily',
    desc: 'P / H / A / OT per worker. One tap each. Done in 60 seconds for 10 workers.',
  },
  {
    num: '03', title: 'Record and settle',
    desc: 'Add advances and payments. Running balance auto-updates. No calculator needed.',
  },
];

export default function HowItWorksSection() {
  return (
    <>
      <section style={{
        background: 'var(--color-surface)',
        padding: 'var(--space-3xl) 24px',
      }}>
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
          </div>

          <div className="wl-how-grid">
            {/* Steps column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STEPS.map(({ num, title, desc }, i) => (
                <div key={num} style={{
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  background: 'var(--color-surface-container)',
                  border: '1px solid var(--color-outline-variant)',
                  borderRadius: 'var(--radius-card)',
                  padding: '24px',
                }}>
                  <div style={{
                    flexShrink: 0,
                    width: 44, height: 44,
                    borderRadius: 'var(--radius-s)',
                    background: 'var(--color-primary-brand)',
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

            <div style={{
  width: 220,
  height: 489, // 220 × (2400/1080)
  background: 'var(--color-surface-container-high)',
  borderRadius: 36,
  padding: 5,
  boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px var(--color-outline-variant)',
  position: 'relative',
}}>
  {/* Camera island */}
  <div style={{
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 72,
    height: 20,
    background: '#000',
    borderRadius: '999px',
    zIndex: 2,
  }} />

  <div style={{
    width: '100%',
    height: '100%',
    borderRadius: 31,
    overflow: 'hidden',
  }}>
    <img
      src="/screenshots/2-workers_daily.png"
      alt="Workers Log daily attendance view"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'top',
      }}
    />
  </div>
</div>
                <div style={{ width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden' }}>
                  <img
                    src="/screenshots/2-workers_daily.png"
                    alt="Workers Log daily attendance view"
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
