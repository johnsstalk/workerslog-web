'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import SiteLogo from './site-logo';

export default function SiteNav({ minimal = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const anchor = (id) => (isHome ? `#${id}` : `/#${id}`);

  const handleToggle = () => setMenuOpen(v => !v);
  const handleClose = () => setMenuOpen(false);

  const navLinks = ['Features', 'Pricing', 'Download', 'Contact'];

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--color-nav-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-outline-variant)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a href="/" aria-label="Workers Log home">
            <SiteLogo />
          </a>

          {!minimal && (
            <>
              {/* Desktop Links */}
              <div
                className="wl-nav-links"
                style={{ display: 'flex', alignItems: 'center', gap: 32 }}
              >
                {navLinks.map(l => {
                  const id = l.toLowerCase();
                  const href =
                    l === 'Contact' ? '/contact' : anchor(id);

                  return (
                    <a
                      key={l}
                      href={href}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 15,
                        color: 'var(--color-on-surface-variant)',
                      }}
                      onMouseEnter={e =>
                        (e.currentTarget.style.color =
                          'var(--color-on-surface)')
                      }
                      onMouseLeave={e =>
                        (e.currentTarget.style.color =
                          'var(--color-on-surface-variant)')
                      }
                    >
                      {l}
                    </a>
                  );
                })}

                <a
                  href="/guide"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 15,
                    color: 'var(--color-on-surface-variant)',
                  }}
                >
                  Guide
                </a>
              </div>

              {/* CTA */}
              <div
                className="wl-nav-cta"
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <a
                  href={anchor('download')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-m)',
                    border: '1px solid var(--color-outline-variant)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--color-on-surface)',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Download APK
                </a>

                <a
                  href={anchor('pricing')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-m)',
                    background: 'var(--color-primary-brand)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Get Pro
                </a>
              </div>

              {/* Mobile button */}
              <button
                onClick={handleToggle}
                className="wl-hamburger"
                style={{
                  display: 'none',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-on-surface)',
                  cursor: 'pointer',
                  padding: 8,
                }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {!minimal && menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            padding: '80px 24px 40px',
          }}
        >
          {navLinks.map(l => {
            const href =
              l === 'Contact' ? '/contact' : anchor(l.toLowerCase());

            return (
              <a
                key={l}
                href={href}
                onClick={handleClose}
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'var(--color-on-surface)',
                  padding: '18px 0',
                  borderBottom: '1px solid var(--color-outline-variant)',
                }}
              >
                {l}
              </a>
            );
          })}

          <a
            href="/guide"
            onClick={handleClose}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              padding: '18px 0',
              borderBottom: '1px solid var(--color-outline-variant)',
            }}
          >
            Guide
          </a>

          <div
            style={{
              marginTop: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <a
              href={anchor('download')}
              onClick={handleClose}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-m)',
                border: '1px solid var(--color-outline-variant)',
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--color-on-surface)',
                textAlign: 'center',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Download APK
            </a>

            <a
              href={anchor('pricing')}
              onClick={handleClose}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-m)',
                background: 'var(--color-primary-brand)',
                fontSize: 16,
                fontWeight: 600,
                color: '#FFFFFF',
                textAlign: 'center',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Get Pro
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .wl-nav-links, .wl-nav-cta { display: none !important; }
          .wl-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}