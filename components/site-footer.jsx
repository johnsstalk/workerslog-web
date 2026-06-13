"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteLogo from './site-logo';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SiteFooter() {
  const footerRef = useRef(null);
  const logoRef   = useRef(null);
  const linkRefs  = useRef([]);
  const copyRef   = useRef(null);

  const links = [
    { label: 'Support',       href: '/support' },
    { label: 'Contact',       href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms',         href: '/terms' },
  ];

  

  // ─────────────────────────────────────────
  // Hover: lift + color (matches nav)
  // ─────────────────────────────────────────
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -2,
      duration: 0.22,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.22,
      ease: 'power2.out',
    });
  };

  return (
    <>
      <footer
        ref={footerRef}
        style={{
          borderTop: '1px solid var(--color-outline-variant)',
          padding: '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <div ref={logoRef}>
            <SiteLogo />
          </div>

          <nav
            style={{
              display: 'flex',
              gap: 24,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {links.map(({ label, href }, i) => (
              <a
                key={label}
                ref={el => (linkRefs.current[i] = el)}
                href={href}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="wl-footer-link"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <p
          ref={copyRef}
          style={{
            textAlign: 'center',
            marginTop: 24,
            fontSize: 13,
            color: 'var(--color-outline)',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          © 2026 WorkersLog · Made in India 🇮🇳
        </p>
      </footer>

      {/* ── Sliding underline (mirrors nav) ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .wl-footer-link {
          position: relative;
          font-size: 14px;
          font-family: 'Outfit', sans-serif;
          color: var(--color-on-surface-variant);
          text-decoration: none;
          display: inline-block;
          padding-bottom: 3px;
        }
        .wl-footer-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background: var(--color-primary);
          border-radius: 2px;
          transition: width 0.26s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .wl-footer-link:hover {
          color: var(--color-on-surface);
        }
        .wl-footer-link:hover::after {
          width: 100%;
        }
      `}} />
    </>
  );
}