// app/layout.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ROOT LAYOUT — Single source of truth for:
//   • CSS custom properties (all colors, spacing, radius, type scale)
//   • Google Fonts loading (Sora + Outfit)
//   • Page metadata defaults
//   • Global resets
//
// All color/spacing values come from DESIGN_SYSTEM.md.
// Pages and components NEVER define raw hex values — always use var(--token).
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: 'Workers Log — Track Workers. Not Paperwork.',
  description:
    'Offline-first attendance and wage tracking for construction contractors. AES-256 encrypted. Works without internet. Built for India.',
  keywords:
    'workers attendance app, labour management, construction app India, wage tracking, offline attendance',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <style>{`
          /* ── GLOBAL RESET ──────────────────────────────────────────── */
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          a { text-decoration: none; color: inherit; }
          button { font-family: inherit; }

          /* ── DESIGN TOKENS — DARK THEME (PRIMARY) ─────────────────── */
          /* Source: DESIGN_SYSTEM.md — derived from theme.dart seed #1E40AF */
          :root {
            /* Backgrounds */
            --color-bg:                     #0F1418;
            --color-surface:                #131923;
            --color-surface-container:      #1C242E;
            --color-surface-container-high: #232C37;
            --color-surface-container-low:  #181F28;

            /* Brand — Material 3 dark from seed #1E40AF */
            --color-primary:                #ADC6FF;
            --color-primary-brand:          #2348CC;
            --color-primary-dark:           #0B1F5E;
            --color-on-primary:             #002E6B;
            --color-primary-container:      #00429E;
            --color-on-primary-container:   #D8E2FF;

            /* Text */
            --color-on-surface:             #E1E3E7;
            --color-on-surface-variant:     #C1C7CE;
            --color-outline:                #8B9199;
            --color-outline-variant:        #41474E;

            /* Status */
            --color-success:                #6DD58C;
            --color-error:                  #FFB4AB;

            /* Spacing — mirrors AppDimensions */
            --space-xs:  4px;
            --space-s:   8px;
            --space-m:   16px;
            --space-l:   24px;
            --space-xl:  32px;
            --space-2xl: 48px;
            --space-3xl: 80px;

            /* Border radius */
            --radius-xs:   6px;
            --radius-s:    8px;
            --radius-m:    12px;
            --radius-l:    16px;
            --radius-xl:   24px;
            --radius-full: 9999px;
            --radius-card: 12px;

            /* Typography */
            --font-display: 'Sora', system-ui, sans-serif;
            --font-body:    'Outfit', system-ui, sans-serif;
            --text-display: clamp(36px, 5vw, 60px);
            --text-h1:      clamp(28px, 4vw, 44px);
            --text-h2:      clamp(22px, 3vw, 32px);
            --text-h3:      18px;
            --text-body-lg: 17px;
            --text-body:    15px;
            --text-body-sm: 14px;
            --text-label:   12px;
            --text-tiny:    11px;

            /* Layout */
            --max-width: 1100px;
          }

          /* ── LIGHT THEME OVERRIDES ─────────────────────────────────── */
          @media (prefers-color-scheme: light) {
            :root {
              --color-bg:                     #F6F9FF;
              --color-surface:                #FAFCFF;
              --color-surface-container:      #EDF1FF;
              --color-surface-container-high: #E2E7F8;
              --color-surface-container-low:  #F2F5FF;
              --color-primary:                #2348CC;
              --color-on-primary:             #FFFFFF;
              --color-on-surface:             #1A1C1F;
              --color-on-surface-variant:     #43474E;
              --color-outline:                #73787F;
              --color-outline-variant:        #C2C7CE;
            }
          }

          /* ── BASE ──────────────────────────────────────────────────── */
          body {
            background: var(--color-bg);
            color: var(--color-on-surface);
            font-family: var(--font-body);
            font-size: var(--text-body);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }

          /* ── SCROLLBAR ─────────────────────────────────────────────── */
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: var(--color-bg); }
          ::-webkit-scrollbar-thumb { background: var(--color-outline-variant); border-radius: 3px; }
          ::selection { background: rgba(173, 198, 255, 0.25); }

          /* ── UTILITY CLASSES ───────────────────────────────────────── */
          .wl-eyebrow {
            display: block;
            font-family: var(--font-display);
            font-size: var(--text-tiny);
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--color-primary);
            margin-bottom: 12px;
          }
          .wl-section {
            padding: var(--space-3xl) var(--space-l);
            max-width: var(--max-width);
            margin: 0 auto;
          }
          .wl-section-heading {
            font-family: var(--font-display);
            font-size: var(--text-h1);
            font-weight: 700;
            letter-spacing: -0.025em;
            color: var(--color-on-surface);
            margin-bottom: 14px;
          }
          .wl-section-sub {
            font-size: var(--text-body-lg);
            color: var(--color-on-surface-variant);
            max-width: 480px;
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
