'use client';

import { useState } from 'react';
import gsap from 'gsap';
import SiteNav from '../../components/site-nav';
import SiteFooter from '../../components/site-footer';
import { Mail, Copy } from 'lucide-react';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const email = 'workers-log.dev@gmail.com';

  // Hover animation
  const handleEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -4,
      scale: 1.01,
      boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
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

  const handleCopy = async (e) => {
    try {
      await navigator.clipboard.writeText(email);

      setCopied(true);

      gsap.fromTo(
        e.currentTarget,
        { scale: 1 },
        {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        }
      );

      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <SiteNav />

      <main>
        <section
          style={{
            padding: 'var(--space-3xl) var(--section-px)',
            maxWidth: 620,
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
                gap: 10,
                background: 'rgba(173, 198, 255, 0.08)',
                padding: '6px 18px',
                borderRadius: 'var(--radius-full)',
                marginBottom: 20,
              }}
            >
              <Mail size={18} color="var(--color-primary)" />

              <span
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                }}
              >
                Get in touch
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
              Contact Us
            </h1>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 17,
                color: 'var(--color-on-surface-variant)',
                maxWidth: 480,
                margin: '0 auto',
              }}
            >
              Have questions, feedback, or need help? We usually respond within
              24–48 hours.
            </p>
          </div>

          {/* Email Card */}
          <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
              background: 'var(--color-surface-container)',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px 36px',
              textAlign: 'left',
              willChange: 'transform',
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--color-on-surface-variant)',
                  fontFamily: "'Outfit', sans-serif",
                  marginBottom: 6,
                }}
              >
                EMAIL US
              </div>

              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: 'var(--color-on-surface)',
                }}
              >
                {email}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={`mailto:${email}`}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={primaryBtn}
              >
                <Mail size={18} />
                Send Email
              </a>

              <button
                onClick={handleCopy}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={secondaryBtn}
              >
                <Copy size={18} />
                {copied ? 'Copied' : 'Copy Email'}
              </button>
            </div>
          </div>

          <p
            style={{
              marginTop: 40,
              fontSize: 14,
              color: 'var(--color-on-surface-variant)',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            For bug reports or feature requests, include your app version and
            device details.
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

const primaryBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '12px 24px',
  background: 'var(--color-primary-brand)',
  color: '#fff',
  borderRadius: 'var(--radius-m)',
  fontSize: 15,
  fontWeight: 600,
  textDecoration: 'none',
  fontFamily: "'Outfit', sans-serif",
  cursor: 'pointer',
};

const secondaryBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '12px 24px',
  background: 'var(--color-surface)',
  color: 'var(--color-on-surface)',
  border: '1px solid var(--color-outline-variant)',
  borderRadius: 'var(--radius-m)',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: "'Outfit', sans-serif",
};