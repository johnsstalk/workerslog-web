'use client';

import SiteNav from '../../components/site-nav';
import SiteFooter from '../../components/site-footer';
import { Copy, Heart, ExternalLink } from 'lucide-react';
import { useState } from 'react';

// === CONFIGURE THESE ===
const UPI_ID = 'workerslog@paytm';           // ← Change to your real UPI ID
const UPI_NAME = 'WorkersLog';
const GITHUB_SPONSORS_URL = 'https://github.com/sponsors/johnsstalk'; // ← Add your link or leave empty to hide
const BUY_ME_A_COFFEE_URL = 'https://www.buymeacoffee.com/workerslog';
// =======================

export default function SupportPage() {
  const [copied, setCopied] = useState(false);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiLink)}&color=ADC6FF&bgcolor=1C242E`;

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = UPI_ID;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <SiteNav />
      <main>
        <section style={{
          padding: 'var(--space-3xl) var(--section-px)',
          maxWidth: 680,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(173, 198, 255, 0.1)',
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              marginBottom: 24,
            }}>
              <Heart size={18} color="var(--color-primary)" />
              <span style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--color-primary)',
                letterSpacing: '0.02em',
              }}>
                SUPPORT THE PROJECT
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 'var(--text-h1)',
              color: 'var(--color-on-surface)',
              marginBottom: 16,
              lineHeight: 1.1,
            }}>
              Support Workers Log
            </h1>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 18,
              color: 'var(--color-on-surface-variant)',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              Workers Log is free and will stay free for core features. 
              Your support helps cover development, maintenance, and new features.
            </p>
          </div>

          {/* UPI Section */}
          <div style={{
            background: 'var(--color-surface-container)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-xl)',
            padding: '40px 32px',
            marginBottom: 32,
            textAlign: 'left',
          }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--color-on-surface)',
                marginBottom: 8,
              }}>
                UPI (Recommended)
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                color: 'var(--color-on-surface-variant)',
              }}>
                Fastest way for Indian users. Works with any UPI app.
              </p>
            </div>

            {/* UPI ID + Copy */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'var(--color-surface)',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: 'var(--radius-m)',
              padding: '14px 20px',
              marginBottom: 24,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 13,
                  color: 'var(--color-on-surface-variant)',
                  fontFamily: "'Outfit', sans-serif",
                  marginBottom: 4,
                }}>
                  UPI ID
                </div>
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--color-on-surface)',
                  letterSpacing: '0.5px',
                }}>
                  {UPI_ID}
                </div>
              </div>
              <button
                onClick={handleCopyUPI}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  background: copied ? 'var(--color-success)' : 'var(--color-primary-brand)',
                  color: copied ? '#0F1418' : '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-m)',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  transition: 'all 0.2s ease',
                }}
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* QR Code */}
            <div style={{ textAlign: 'center' }}>
              <img
                src={qrUrl}
                alt="UPI QR Code"
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: 'var(--radius-l)',
                  border: '1px solid var(--color-outline-variant)',
                  background: '#1C242E',
                }}
              />
              <p style={{
                fontSize: 13,
                color: 'var(--color-on-surface-variant)',
                marginTop: 12,
                fontFamily: "'Outfit', sans-serif",
              }}>
                Scan with any UPI app (GPay, PhonePe, Paytm, etc.)
              </p>
            </div>
          </div>

          {/* Other ways */}
          <div style={{
            background: 'var(--color-surface-container)',
            border: '1px solid var(--color-outline-variant)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            textAlign: 'left',
          }}>
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              marginBottom: 20,
            }}>
              Other ways to support
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {GITHUB_SPONSORS_URL && (
                <a
                  href={GITHUB_SPONSORS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 22px',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-outline-variant)',
                    borderRadius: 'var(--radius-m)',
                    textDecoration: 'none',
                    color: 'var(--color-on-surface)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>GitHub Sponsors</div>
                    <div style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>
                      Recurring or one-time support
                    </div>
                  </div>
                  <ExternalLink size={18} color="var(--color-primary)" />
                </a>
              )}

              {BUY_ME_A_COFFEE_URL && (
                <a
                  href={BUY_ME_A_COFFEE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 22px',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-outline-variant)',
                    borderRadius: 'var(--radius-m)',
                    textDecoration: 'none',
                    color: 'var(--color-on-surface)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>Buy Me a Coffee</div>
                    <div style={{ fontSize: 14, color: 'var(--color-on-surface-variant)' }}>
                      One-time support
                    </div>
                  </div>
                  <ExternalLink size={18} color="var(--color-primary)" />
                </a>
              )}
            </div>
          </div>

          {/* Note */}
          <p style={{
            marginTop: 40,
            fontSize: 14,
            color: 'var(--color-on-surface-variant)',
            fontFamily: "'Outfit', sans-serif",
            maxWidth: 480,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Donations are completely voluntary. Core features of Workers Log will always remain free. 
            Thank you for supporting independent development from India 🇮🇳
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}