'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import SiteLogo from './site-logo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LINKS = ['Features', 'Pricing', 'Download', 'Contact'];

export default function SiteNav({ minimal = false }) {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  const pathname = usePathname();
  const isHome   = pathname === '/';
  const anchor   = (id) => (isHome ? `#${id}` : `/#${id}`);

  // Refs for entrance animation targets
  const navRef       = useRef(null);
  const logoRef      = useRef(null);
  const linkRefs     = useRef([]);   // desktop nav links
  const ctaRefs      = useRef([]);   // desktop CTA buttons
  const hamburgerRef = useRef(null);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY  = useRef(0);
  const ticking      = useRef(false);

  // Refs for mobile menu animation targets
  const menuRef      = useRef(null);
  const mLinkRefs    = useRef([]);
  const mCtaRefs     = useRef([]);

  // ─────────────────────────────────────────────
  // 2. SCROLL-BASED SHADOW
  // ─────────────────────────────────────────────
  useEffect(() => {
  const THRESHOLD = 8;       // px of movement before reacting
  const MIN_TOP   = 64;      // don't hide when near top of page

  const update = () => {
    const y = window.scrollY;
    const dy = y - lastScrollY.current;

    // ── Shadow ──
    if (navRef.current) {
      gsap.to(navRef.current, {
        boxShadow: y > 24
          ? '0 8px 48px rgba(0,0,0,0.38)'
          : '0 0px 0px rgba(0,0,0,0)',
        duration: 0.35,
      });
    }

    // ── Hide / show based on direction ──
    if (Math.abs(dy) > THRESHOLD) {
      if (y < MIN_TOP) {
        setNavVisible(true);                  // always show near top
      } else if (dy > 0) {
        setNavVisible(false);                 // scrolling down → hide
      } else {
        setNavVisible(true);                  // scrolling up → show
      }
      lastScrollY.current = y;
    }

    ticking.current = false;
  };

  const onScroll = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(update);
      ticking.current = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

useEffect(() => {
  if (!navRef.current) return;
  gsap.to(navRef.current, {
    yPercent: navVisible ? 0 : -100,   // slide up off-screen
    duration: 0.32,
    ease: 'power2.out',
  });
}, [navVisible]);

  // ─────────────────────────────────────────────
  // 3. MOBILE MENU — OPEN
  // ─────────────────────────────────────────────
  const openMenu = useCallback(() => {
    setMenuMounted(true);
    setMenuOpen(true);
  }, []);

  // ─────────────────────────────────────────────
  // 4. MOBILE MENU — CLOSE (animate out first, then unmount)
  // ─────────────────────────────────────────────
  const closeMenu = useCallback(() => {
    if (!menuRef.current) {
      setMenuMounted(false);
      setMenuOpen(false);
      return;
    }

    const links = mLinkRefs.current.filter(Boolean);
    const ctas  = mCtaRefs.current.filter(Boolean);

    const tl = gsap.timeline({
      onComplete: () => {
        setMenuMounted(false);
        setMenuOpen(false);
      },
    });

    // Links stagger out upward
    if (links.length) {
      tl.to([...links, ...ctas], {
        y: -10,
        opacity: 0,
        duration: 0.16,
        stagger: 0.03,
        ease: 'power2.in',
      });
    }

    // Panel fades out
    tl.to(menuRef.current, {
      opacity: 0,
      y: -16,
      duration: 0.22,
      ease: 'power2.in',
    }, '-=0.08');
  }, []);

  // ─────────────────────────────────────────────
  // 5. MOBILE MENU — ANIMATE IN when mounted
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!menuMounted || !menuRef.current) return;

    const links = mLinkRefs.current.filter(Boolean);
    const ctas  = mCtaRefs.current.filter(Boolean);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Panel fades in
    tl.from(menuRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
    });

    // Links stagger up
    if (links.length) {
      tl.from(links, {
        y: 20,
        opacity: 0,
        duration: 0.32,
        stagger: 0.065,
      }, '-=0.16');
    }

    // CTA buttons
    if (ctas.length) {
      tl.from(ctas, {
        y: 12,
        opacity: 0,
        duration: 0.28,
        stagger: 0.08,
      }, '-=0.12');
    }
  }, [menuMounted]);

  // ─────────────────────────────────────────────
  // 6. HAMBURGER TOGGLE — icon spin + scale
  // ─────────────────────────────────────────────
  const handleToggle = useCallback(() => {
    if (hamburgerRef.current) {
      gsap.fromTo(
        hamburgerRef.current,
        { rotate: menuOpen ? 90 : -90, scale: 0.65 },
        { rotate: 0, scale: 1, duration: 0.32, ease: 'back.out(2.4)' }
      );
    }
    if (menuOpen) closeMenu();
    else openMenu();
  }, [menuOpen, closeMenu, openMenu]);

  return (
    <>
      {/* ── Nav bar ── */}
      <nav
        ref={navRef}
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
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <a ref={logoRef} href="/" aria-label="Workers Log home" style={{ display: 'block' }}>
            <SiteLogo />
          </a>

          {!minimal && (
            <>
              {/* Desktop links */}
              <div className="wl-nav-links">
                {LINKS.map((l, i) => (
                  <a
                    key={l}
                    ref={el => (linkRefs.current[i] = el)}
                    href={l === 'Contact' ? '/contact' : anchor(l.toLowerCase())}
                    className="wl-nav-link"
                  >
                    {l}
                  </a>
                ))}
                <a
                  ref={el => (linkRefs.current[LINKS.length] = el)}
                  href="/guide"
                  className="wl-nav-link"
                >
                  Guide
                </a>
              </div>

              {/* Desktop CTAs */}
              <div className="wl-nav-cta">
                <a
                  ref={el => (ctaRefs.current[0] = el)}
                  href={anchor('download')}
                  className="wl-btn-ghost"
                >
                  Download APK
                </a>
                <a
                  ref={el => (ctaRefs.current[1] = el)}
                  href={anchor('pricing')}
                  className="wl-btn-primary"
                >
                  Get Pro
                </a>
              </div>

              {/* Hamburger */}
              <button
                ref={hamburgerRef}
                onClick={handleToggle}
                className="wl-hamburger"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {!minimal && menuMounted && (
        <div ref={menuRef} className="wl-mobile-menu">

          {/* Links */}
          <div className="wl-mobile-links">
            {LINKS.map((l, i) => (
              <a
                key={l}
                ref={el => (mLinkRefs.current[i] = el)}
                href={l === 'Contact' ? '/contact' : anchor(l.toLowerCase())}
                onClick={closeMenu}
                className="wl-mobile-link"
              >
                <span>{l}</span>
                <ChevronRight size={16} className="wl-mobile-arrow" />
              </a>
            ))}
            <a
              ref={el => (mLinkRefs.current[LINKS.length] = el)}
              href="/guide"
              onClick={closeMenu}
              className="wl-mobile-link"
            >
              <span>Guide</span>
              <ChevronRight size={16} className="wl-mobile-arrow" />
            </a>
          </div>

          {/* CTAs */}
          <div className="wl-mobile-ctas">
            <a
              ref={el => (mCtaRefs.current[0] = el)}
              href={anchor('download')}
              onClick={closeMenu}
              className="wl-btn-ghost wl-btn-block"
            >
              Download APK
            </a>
            <a
              ref={el => (mCtaRefs.current[1] = el)}
              href={anchor('pricing')}
              onClick={closeMenu}
              className="wl-btn-primary wl-btn-block"
            >
              Get Pro
            </a>
          </div>

        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Desktop links ── */
        .wl-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .wl-nav-link {
          position: relative;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          color: var(--color-on-surface-variant);
          text-decoration: none;
          transition: color 0.2s ease;
          padding-bottom: 3px;
        }
        /* Sliding underline on hover */
        .wl-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background: var(--color-primary);
          border-radius: 2px;
          transition: width 0.24s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .wl-nav-link:hover {
          color: var(--color-on-surface);
        }
        .wl-nav-link:hover::after {
          width: 100%;
        }

        /* ── Desktop CTAs ── */
        .wl-nav-cta {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .wl-btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          border-radius: var(--radius-m);
          border: 1px solid var(--color-outline-variant);
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--color-on-surface);
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
          white-space: nowrap;
        }
        .wl-btn-ghost:hover {
          background: var(--color-surface-container);
          border-color: var(--color-outline);
        }
        .wl-btn-primary {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          border-radius: var(--radius-m);
          background: var(--color-primary-brand);
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF;
          text-decoration: none;
          transition: opacity 0.18s ease, transform 0.18s ease;
          white-space: nowrap;
        }
        .wl-btn-primary:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .wl-btn-block {
          display: block;
          text-align: center;
          padding: 14px 18px;
          font-size: 15px;
          box-sizing: border-box;
        }

        /* ── Hamburger ── */
        .wl-hamburger {
          display: none;
          background: none;
          border: none;
          color: var(--color-on-surface);
          cursor: pointer;
          padding: 8px;
          border-radius: var(--radius-s);
          transition: background 0.2s ease;
        }
        .wl-hamburger:hover {
          background: var(--color-surface-container);
        }

        /* ── Mobile menu panel ── */
        .wl-mobile-menu {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99;
          background: var(--color-bg);
          display: flex;
          flex-direction: column;
          padding: 8px 24px 40px;
          overflow-y: auto;
        }
        .wl-mobile-links {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .wl-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Sora', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--color-on-surface);
          padding: 20px 0;
          border-bottom: 1px solid var(--color-outline-variant);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .wl-mobile-link:hover {
          color: var(--color-primary);
        }
        .wl-mobile-arrow {
          color: var(--color-outline);
          flex-shrink: 0;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .wl-mobile-link:hover .wl-mobile-arrow {
          transform: translateX(5px);
          color: var(--color-primary);
        }
        .wl-mobile-ctas {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 28px;
        }

        /* ── Responsive breakpoint ── */
        @media (max-width: 768px) {
          .wl-nav-links,
          .wl-nav-cta  { display: none !important; }
          .wl-hamburger { display: block !important; }
        }
      `}} />
    </>
  );
}