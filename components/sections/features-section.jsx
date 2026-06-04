'use client';

import { WifiOff, Shield, Zap, BarChart2, CreditCard, Cloud } from 'lucide-react';

const FEATURES = [
  {
    Icon: WifiOff, title: 'Works Without Internet',
    desc: 'All data lives on your device. Mark attendance, record wages, and settle payments — even in areas with zero signal.',
  },
  {
    Icon: Shield, title: 'AES-256 Encrypted',
    desc: 'Your worker records and wages are encrypted on your phone. No one can read them — not even us.',
  },
  {
    Icon: Zap, title: 'Instant Attendance',
    desc: 'Mark P / H / A / OT in one tap. Wages calculated automatically. Check exact balance in seconds.',
  },
  {
    Icon: BarChart2, title: 'Project Accounting',
    desc: 'Track contract work separately from daily labour. Set project rates, assign workers, see what you owe.',
  },
  {
    Icon: CreditCard, title: 'Settlement Tracking',
    desc: 'Record advances, cash payments, and final settlements. The ledger auto-updates. No disputes.',
  },
  {
    Icon: Cloud, title: 'Cloud Backup (Pro)',
    desc: 'Sync to secure cloud automatically. Switch phones without losing a single record. Restore in seconds.',
  },
  {
    Icon: LayoutDashboard, title: 'Overview',
    desc: 'Quick summary of attendance, paid, and balances — daily and project-wise on their dedicated pages.',
  },
];

function FeatureCard({ Icon, title, desc, isPro }) {
  return (
    <div style={{
      background: 'var(--color-surface-container)',
      border: `1px solid ${isPro ? 'rgba(173, 198, 255, 0.2)' : 'var(--color-outline-variant)'}`,
      borderRadius: 'var(--radius-card)',
      padding: '24px',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 'var(--radius-s)',
        background: isPro ? 'rgba(173, 198, 255, 0.12)' : 'rgba(173, 198, 255, 0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16,
      }}>
        <Icon size={22} color="var(--color-primary)" strokeWidth={1.8} />
      </div>
      <h3 style={{
        fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15,
        color: 'var(--color-on-surface)', marginBottom: 8,
      }}>
        {title}
        {isPro && (
          <span style={{
            marginLeft: 8, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--color-primary)',
            background: 'rgba(173, 198, 255, 0.12)',
            borderRadius: 'var(--radius-xs)', padding: '2px 6px',
            verticalAlign: 'middle',
          }}>PRO</span>
        )}
      </h3>
      <p style={{
        fontFamily: "'Outfit', sans-serif", fontSize: 14, lineHeight: 1.6,
        color: 'var(--color-on-surface-variant)',
      }}>{desc}</p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <>
      <section id="features" style={{ padding: 'var(--space-3xl) 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              display: 'block', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-primary)', fontFamily: "'Sora', sans-serif", marginBottom: 12,
            }}>Features</span>
            <h2 style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 700,
              fontSize: 'var(--text-h1)', color: 'var(--color-on-surface)', marginBottom: 16,
            }}>Everything you need.<br />Nothing you don't.</h2>
            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 17,
              color: 'var(--color-on-surface-variant)', maxWidth: 480, margin: '0 auto',
            }}>Built around how contractors actually work on-site. No training needed.</p>
          </div>

          <div className="wl-features-grid">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} isPro={i === 5} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .wl-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .wl-features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .wl-features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
