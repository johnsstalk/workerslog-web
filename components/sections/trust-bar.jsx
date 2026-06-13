'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Shield, WifiOff, Users, Cloud, CreditCard } from 'lucide-react';

const ITEMS = [
  { Icon: Shield,     label: 'AES-256 Security' },
  { Icon: WifiOff,    label: 'Offline First' },
  { Icon: Users,      label: 'Built for anyone who manages workers' },
  { Icon: Cloud,      label: 'Cloud Backup (Pro)' },
  { Icon: CreditCard, label: 'In-App Purchases via Google Play' },
];

export default function TrustBar() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const prefersReduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let tween;
    if (!prefersReduce) {
      tween = gsap.to(track, {
        xPercent: -50,
        duration: 32,
        ease: 'none',
        repeat: -1,
      });

      const onEnter = () => {
        gsap.to(tween, { timeScale: 0.15, duration: 0.4, ease: 'power2.out' });
      };
      const onLeave = () => {
        gsap.to(tween, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
        tween.play();
      };

      container.addEventListener('mouseenter', onEnter);
      container.addEventListener('mouseleave', onLeave);

      container._onEnter = onEnter;
      container._onLeave = onLeave;
    }

    return () => {
      tween?.kill();
      if (container._onEnter) {
        container.removeEventListener('mouseenter', container._onEnter);
        container.removeEventListener('mouseleave', container._onLeave);
        container._onEnter = null;
        container._onLeave = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        borderTop: '1px solid var(--color-outline-variant)',
        borderBottom: '1px solid var(--color-outline-variant)',
        background: 'var(--color-surface)',
        overflow: 'hidden',
        padding: '14px 0',
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => {
          const Icon = item.Icon;
          return (
            <span
              key={i}
              onMouseEnter={(e) => {
                const svg = e.currentTarget.querySelector('svg');
                if (svg) gsap.to(svg, { scale: 1.15, duration: 0.25, ease: 'power2.out' });
              }}
              onMouseLeave={(e) => {
                const svg = e.currentTarget.querySelector('svg');
                if (svg) gsap.to(svg, { scale: 1, duration: 0.25, ease: 'power2.out' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Outfit', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-on-surface-variant)',
                whiteSpace: 'nowrap',
                padding: '0 32px',
                cursor: 'default',
              }}
            >
              <Icon
                size={15}
                strokeWidth={2.2}
                color="var(--color-primary)"
                style={{ transformOrigin: 'center' }}
              />
              {item.label}
              <span
                style={{
                  marginLeft: 32,
                  color: 'var(--color-outline-variant)',
                  fontSize: 14,
                }}
              >
                ·
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}