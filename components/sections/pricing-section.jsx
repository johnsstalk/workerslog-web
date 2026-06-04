const FREE_FEATURES = [
  'Unlimited workers',
  'Daily attendance (P/H/A/OT/PH)',
  'Settlement and payment entries',
  'Project accounting',
  'Balance and ledger view',
  'Local encrypted storage',
  'Works offline — no internet needed',
];

const LOCKED_FEATURES = [
  'Cloud backup and sync',
  'Multi-device access',
  'PDF salary slip export',
  'Salary reports',
];

const PRO_EXTRA = [
  'Cloud backup and sync',
  'Multi-device access',
  'PDF salary slip export',
  'Salary reports',
  'Auto-sync every 5 minutes',
  'Restore on new phone',
];

function FeatureLine({ label, locked }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
        background: locked ? 'transparent' : 'rgba(109, 213, 140, 0.15)',
        fontSize: 11, fontWeight: 700,
        color: locked ? 'var(--color-outline)' : 'var(--color-success)',
        border: locked ? '1px solid var(--color-outline-variant)' : 'none',
      }}>{locked ? '✕' : '✓'}</span>
      <span style={{
        fontFamily: "'Outfit', sans-serif", fontSize: 14,
        color: locked ? 'var(--color-outline)' : 'var(--color-on-surface-variant)',
      }}>{label}</span>
    </div>
  );
}

export default function PricingSection() {
  return (
    <>
      <section id="pricing" style={{ padding: 'var(--space-3xl) var(--section-px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              display: 'block', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-primary)', fontFamily: "'Sora', sans-serif", marginBottom: 12,
            }}>Pricing</span>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'var(--text-h1)', color: 'var(--color-on-surface)', marginBottom: 16,
            }}>Simple, honest pricing</h2>
            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 17,
              color: 'var(--color-on-surface-variant)',
            }}>All core features are free forever. Pay only for cloud sync and Pro tools.</p>
          </div>

          <div className="wl-pricing-grid">
            {/* Free card */}
            <div style={{
              background: 'var(--color-surface-container)',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
            }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--color-on-surface)', marginBottom: 8 }}>Free</p>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 36, color: 'var(--color-on-surface)' }}>₹0</span>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: 'var(--color-on-surface-variant)', marginBottom: 28 }}>Forever free · No credit card</p>
              <div style={{ borderTop: '1px solid var(--color-outline-variant)', paddingTop: 20, marginBottom: 28 }}>
                {FREE_FEATURES.map(f => <FeatureLine key={f} label={f} />)}
                {LOCKED_FEATURES.map(f => <FeatureLine key={f} label={f} locked />)}
              </div>
              <a href="#download" style={{
                display: 'block', textAlign: 'center',
                padding: '13px', borderRadius: 'var(--radius-m)',
                border: '1px solid var(--color-outline-variant)',
                fontSize: 15, fontWeight: 600, color: 'var(--color-on-surface)',
                fontFamily: "'Outfit', sans-serif",
              }}>Download APK</a>
            </div>

            {/* Pro card */}
            <div style={{
              background: 'var(--color-surface-container)',
              border: '2px solid var(--color-primary)',
              borderRadius: 'var(--radius-xl)',
              padding: '32px',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                background: 'var(--color-primary-brand)',
                color: '#FFFFFF', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                borderRadius: 'var(--radius-full)', padding: '4px 14px',
                fontFamily: "'Sora', sans-serif",
              }}>Most Popular</span>
              <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--color-on-surface)', marginBottom: 8 }}>Pro</p>
              <div style={{ marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 36, color: 'var(--color-on-surface)' }}>₹99</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: 'var(--color-on-surface-variant)' }}>/month</span>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: 'var(--color-primary)', marginBottom: 28 }}>or ₹799/year · save 33%</p>
              <div style={{ borderTop: '1px solid var(--color-outline-variant)', paddingTop: 20, marginBottom: 28 }}>
                {FREE_FEATURES.map(f => <FeatureLine key={f} label={f} />)}
                {PRO_EXTRA.map(f => <FeatureLine key={f} label={f} />)}
              </div>
              <a href="#download" style={{
                display: 'block', textAlign: 'center',
                padding: '13px', borderRadius: 'var(--radius-m)',
                background: 'var(--color-primary-brand)',
                fontSize: 15, fontWeight: 600, color: '#FFFFFF',
                fontFamily: "'Outfit', sans-serif",
              }}>Get Pro on Google Play</a>
              <p style={{
                textAlign: 'center', marginTop: 12,
                fontFamily: "'Outfit', sans-serif", fontSize: 12,
                color: 'var(--color-outline)',
              }}>Pay via UPI, card, or netbanking · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .wl-pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 680px) {
          .wl-pricing-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
