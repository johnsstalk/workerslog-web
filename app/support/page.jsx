'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SiteNav from '../../components/site-nav';
import SiteFooter from '../../components/site-footer';
import {
  Heart,
  ExternalLink,
  Star,
  Bug,
  Instagram,
  Twitter,
  Smartphone,
} from 'lucide-react';

export default function SupportPage() {
  const cardsRef = useRef(null);

  // entrance animation
  useEffect(() => {
    if (!cardsRef.current) return;

    const items = cardsRef.current.querySelectorAll('.support-card');

    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, []);

  // hover animation
  const handleEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -4,
      scale: 1.01,
      boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: '0 0 0 rgba(0,0,0,0)',
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  return (
    <>
      <SiteNav />

      <main>
        <section
          style={{
            padding: 'var(--space-3xl) var(--section-px)',
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(173, 198, 255, 0.08)',
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                marginBottom: 24,
              }}
            >
              <Heart size={18} color="var(--color-primary)" />
              <span
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                }}
              >
                Support & Feedback
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: 'var(--text-h1)',
                color: 'var(--color-on-surface)',
                marginBottom: 16,
              }}
            >
              Help Improve Workers Log
            </h1>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 18,
                color: 'var(--color-on-surface-variant)',
                lineHeight: 1.6,
              }}
            >
              Follow updates, share feedback, report issues, and help improve the product.
            </p>
          </div>

          {/* Cards */}
          <div
            ref={cardsRef}
            style={{
              display: 'grid',
              gap: 14,
              textAlign: 'left',
            }}
          >
            <a
              href="https://instagram.com/workerslog"
              className="support-card"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={cardStyle}
            >
              <Instagram size={20} color="var(--color-primary)" />
              <div>
                <div style={titleStyle}>Instagram</div>
                <div style={descStyle}>Updates and announcements</div>
              </div>
              <ExternalLink size={18} />
            </a>

            <a
              href="https://twitter.com/"
              className="support-card"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={cardStyle}
            >
              <Twitter size={20} color="var(--color-primary)" />
              <div>
                <div style={titleStyle}>Twitter / X</div>
                <div style={descStyle}>Releases and changelog</div>
              </div>
              <ExternalLink size={18} />
            </a>

            <a
              href="https://play.google.com/"
              className="support-card"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={cardStyle}
            >
              <Smartphone size={20} color="var(--color-primary)" />
              <div>
                <div style={titleStyle}>Play Store</div>
                <div style={descStyle}>Download or update app</div>
              </div>
              <ExternalLink size={18} />
            </a>

            <a
              href="https://play.google.com/"
              className="support-card"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={cardStyle}
            >
              <Star size={20} color="var(--color-primary)" />
              <div>
                <div style={titleStyle}>Rate the App</div>
                <div style={descStyle}>Leave a review on Play Store</div>
              </div>
              <ExternalLink size={18} />
            </a>

            <a
              href="mailto:support@workerslog.com"
              className="support-card"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={cardStyle}
            >
              <Bug size={20} color="var(--color-primary)" />
              <div>
                <div style={titleStyle}>Report a Bug</div>
                <div style={descStyle}>Send issues directly to us</div>
              </div>
              <ExternalLink size={18} />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/* styles */
const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  padding: '18px 20px',
  background: 'var(--color-surface-container)',
  border: '1px solid var(--color-outline-variant)',
  borderRadius: 'var(--radius-m)',
  textDecoration: 'none',
  color: 'var(--color-on-surface)',
  cursor: 'pointer',
  willChange: 'transform',
};

const titleStyle = {
  fontSize: 16,
  fontWeight: 600,
  fontFamily: "'Sora', sans-serif",
};

const descStyle = {
  fontSize: 13,
  color: 'var(--color-on-surface-variant)',
  fontFamily: "'Outfit', sans-serif",
};