export default function HeroSection() {
  const stats = [
    { value: '100%', label: 'Offline capable' },
    { value: 'AES-256', label: 'Encrypted locally' },
    { value: '₹0', label: 'To get started' },
  ];

  return (
    <>
      <section style={{ padding: 'var(--space-3xl) 24px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="wl-hero-inner" style={{ display: 'flex', alignItems: 'center', gap: 56 }}>

          {/* ── Left: text content ── */}
          <div style={{ flex: '1 1 340px', minWidth: 280 }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(173, 198, 255, 0.12)',
              border: '1px solid rgba(173, 198, 255, 0.25)',
              color: 'var(--color-primary)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 14px',
              fontSize: 12, fontWeight: 600,
              fontFamily: "'Sora', sans-serif",
              marginBottom: 24, letterSpacing: '0.02em',
            }}>Version 1.0.6 · Android</span>

            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'var(--text-display)',
              fontWeight: 800, lineHeight: 1.1,
              color: 'var(--color-on-surface)',
              marginBottom: 20,
            }}>
              Track workers.<br />
              <span style={{ color: 'var(--color-primary)' }}>Not paperwork.</span>
            </h1>

            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 17, lineHeight: 1.65,
              color: 'var(--color-on-surface-variant)',
              marginBottom: 36, maxWidth: 480,
            }}>
              Offline-first attendance and wage tracking for construction contractors.
              Works without internet. AES-256 encrypted. Built for how India works.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
              <a href="#download" style={{
                padding: '14px 28px', borderRadius: 'var(--radius-m)',
                background: 'var(--color-primary-brand)',
                fontSize: 15, fontWeight: 600, color: '#FFFFFF',
                fontFamily: "'Outfit', sans-serif",
              }}>Download Free APK</a>
              <a href="#pricing" style={{
                padding: '14px 28px', borderRadius: 'var(--radius-m)',
                border: '1px solid var(--color-outline-variant)',
                fontSize: 15, fontWeight: 600, color: 'var(--color-on-surface)',
                fontFamily: "'Outfit', sans-serif",
              }}>See Pricing →</a>
            </div>

            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 22,
                    color: 'var(--color-primary)',
                  }}>{value}</div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 13,
                    color: 'var(--color-on-surface-variant)', marginTop: 2,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: phone mockup ── */}
          <div className="wl-hero-phone" style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 248, height: 506,
              background: 'var(--color-surface-container-high)',
              borderRadius: 40,
              padding: 6,
              boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px var(--color-outline-variant)',
              position: 'relative',
            }}>
              {/* Dynamic island / notch */}
              <div style={{
                position: 'absolute', top: 10, left: '50%',
                transform: 'translateX(-50%)',
                width: 72, height: 20,
                background: 'var(--color-surface-container-high)',
                borderRadius: 'var(--radius-full)',
                zIndex: 2,
              }} />
              <div style={{
                width: '100%', height: '100%',
                borderRadius: 35, overflow: 'hidden',
              }}>
                <img
                  src="/screenshots/1-workerslist.png"
                  alt="Workers Log app — worker list screen"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 840px) {
          .wl-hero-inner { flex-direction: column; align-items: flex-start; }
          .wl-hero-phone { display: none; }
        }
      `}</style>
    </>
  );
}