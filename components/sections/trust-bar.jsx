'use client';

import { Shield, WifiOff, Users, Cloud, CreditCard } from 'lucide-react';

const ITEMS = [
  { Icon: Shield,     label: 'AES-256 Encrypted' },
  { Icon: WifiOff,    label: '100% Offline Capable' },
  { Icon: Users,      label: 'Made for Indian Contractors' },
  { Icon: Cloud,      label: 'Cloud Backup on Pro' },
  { Icon: CreditCard, label: 'UPI Payments Accepted' },
];

export default function TrustBar() {
  return (
    <>
      <div style={{
        borderTop: '1px solid var(--color-outline-variant)',
        borderBottom: '1px solid var(--color-outline-variant)',
        background: 'var(--color-surface)',
        overflow: 'hidden',
        padding: '14px 0',
      }}>
        <div className="wl-trust-track">
          {[...ITEMS, ...ITEMS].map((item, i) => {
            const Icon = item.Icon;
            return (
              <span key={i} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-on-surface-variant)',
                whiteSpace: 'nowrap',
                padding: '0 32px',
              }}>
                <Icon size={15} strokeWidth={2.2} color="var(--color-primary)" />
                {item.label}
                <span style={{ 
                  marginLeft: 32, 
                  color: 'var(--color-outline-variant)',
                  fontSize: 14,
                }}>·</span>
              </span>
            );
          })}
        </div>
      </div>

      <style>{`
        .wl-trust-track {
          display: flex;
          width: max-content;
          animation: wl-scroll 32s linear infinite;
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