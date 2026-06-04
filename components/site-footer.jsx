"use client";

import SiteLogo from './site-logo';

export default function SiteFooter() {
  const links = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: 'mailto:workers-log.dev@gmail.com' },
  ];

  return (
    <footer style={{
      borderTop: '1px solid var(--color-outline-variant)',
      padding: '40px 24px',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between',
        gap: 20,
      }}>
        <a href="/"><SiteLogo /></a>

        <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontSize: 14,
              color: 'var(--color-on-surface-variant)',
              fontFamily: "'Outfit', sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-on-surface)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-on-surface-variant)'}
            >{label}</a>
          ))}
        </nav>
      </div>

      <p style={{
        textAlign: 'center', marginTop: 24,
        fontSize: 13, color: 'var(--color-outline)',
        fontFamily: "'Outfit', sans-serif",
      }}>
        © 2026 WorkersLog · Made in India 🇮🇳
      </p>
    </footer>
  );
}