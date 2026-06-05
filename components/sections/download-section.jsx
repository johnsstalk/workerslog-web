export default function DownloadSection() {
  return (
    <>
      <section id="download" style={{
        background: 'var(--color-surface)',
        padding: 'var(--space-3xl) var(--section-px)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <span style={{
            display: 'block', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--color-primary)', fontFamily: "'Sora', sans-serif", marginBottom: 16,
          }}>Download</span>

          <h2 style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 700,
            fontSize: 'var(--text-h1)', color: 'var(--color-on-surface)', marginBottom: 16,
          }}>Start today. Always free.</h2>

          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 17, lineHeight: 1.6,
            color: 'var(--color-on-surface-variant)', marginBottom: 40,
          }}>
            Download the APK directly or install from Google Play Store.
            No sign-up required for the free tier.
          </p>

          <div className="wl-dl-btns" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 28px', borderRadius: 'var(--radius-m)',
              background: 'var(--color-primary-brand)',
              fontSize: 15, fontWeight: 600, color: '#FFFFFF',
              fontFamily: "'Outfit', sans-serif",
            }}>
              <span style={{ fontSize: 18 }}>⬇</span>
              Download APK (v1.0.6)
            </a>
            <a href="#" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 28px', borderRadius: 'var(--radius-m)',
              border: '1px solid var(--color-outline-variant)',
              fontSize: 15, fontWeight: 600, color: 'var(--color-on-surface)',
              fontFamily: "'Outfit', sans-serif",
            }}>
              <span style={{ fontSize: 18 }}>▶</span>
              Google Play Store
            </a>
          </div>

          <p style={{
            marginTop: 20,
            fontFamily: "'Outfit', sans-serif", fontSize: 13,
            color: 'var(--color-outline)',
          }}>
            Android 7.0 and above · ~54 MB
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 480px) {
          .wl-dl-btns { flex-direction: column; align-items: center; }
          .wl-dl-btns a { width: 100%; justify-content: center; }
        }
      `}</style>
    </>
  );
}