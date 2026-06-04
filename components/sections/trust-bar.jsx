const ITEMS = [
  '🔒 AES-256 Encrypted',
  '📶 100% Offline Capable',
  '🇮🇳 Made for Indian Contractors',
  '☁️ Cloud Backup on Pro',
  '💳 UPI Payments Accepted',
];

export default function TrustBar() {
  return (
    <>
      <div style={{
        borderTop: '1px solid var(--color-outline-variant)',
        borderBottom: '1px solid var(--color-outline-variant)',
        background: 'var(--color-surface)',
        overflow: 'hidden',
        padding: '12px 0',
      }}>
        <div className="wl-trust-track">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13, fontWeight: 500,
              color: 'var(--color-on-surface-variant)',
              whiteSpace: 'nowrap',
              padding: '0 28px',
            }}>
              {item}
              <span style={{ marginLeft: 28, color: 'var(--color-outline-variant)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .wl-trust-track {
          display: flex;
          width: max-content;
          animation: wl-scroll 28s linear infinite;
        }
        @keyframes wl-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wl-trust-track { animation: none; }
        }
      `}</style>
    </>
  );
}