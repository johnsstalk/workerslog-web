export const metadata = {
  title: 'Workers Log — Smart Wage Manager',
  description:
    'Offline-first attendance and wage tracking for construction contractors. Works without internet. AES-256 encrypted. Built for how India works.',
  keywords: 'workers log, wage tracker, attendance app, contractor, India, construction, offline',
  
  icons: {
    icon: '/workers_log_icon.png',
    shortcut: '/workers_log_icon.png',
    apple: '/workers_log_icon.png',
  },
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
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          :root {
            --color-bg:                     #0F1418;
            --color-surface:                #131923;
            --color-surface-container:      #1C242E;
            --color-surface-container-high: #232C37;
            --color-surface-container-low:  #181F28;
            --color-primary:                #ADC6FF;
            --color-primary-brand:          #2348CC;
            --color-primary-dark:           #0B1F5E;
            --color-on-primary:             #002E6B;
            --color-primary-container:      #00429E;
            --color-on-primary-container:   #D8E2FF;
            --color-on-surface:             #E1E3E7;
            --color-on-surface-variant:     #C1C7CE;
            --color-outline:                #8B9199;
            --color-outline-variant:        #41474E;
            --color-success:                #6DD58C;
            --color-error:                  #FFB4AB;
            --color-warning:                #FFBA0A;
            --color-nav-bg:                 rgba(15, 20, 24, 0.88);
            --space-xs: 4px;  --space-s: 8px;   --space-m: 16px;
            --space-l: 24px;  --space-xl: 32px; --space-2xl: 48px; --space-3xl: 80px;
            --radius-xs: 6px; --radius-s: 8px;  --radius-m: 12px;
            --radius-l: 16px; --radius-xl: 24px; --radius-full: 9999px; --radius-card: 12px;
            --text-display: clamp(36px, 5vw, 60px);
            --text-h1:      clamp(28px, 4vw, 44px);
            --text-h2:      clamp(22px, 3vw, 32px);
            --section-px:   clamp(24px, 5vw, 64px);
          }
          @media (prefers-color-scheme: light) {
            :root {
              --color-bg:                     #F6F9FF;
              --color-surface:                #FAFCFF;
              --color-surface-container:      #EFF3FF;
              --color-surface-container-high: #E6EDFF;
              --color-surface-container-low:  #F0F4FF;
              --color-primary:                #2348CC;
              --color-on-primary-container:   #001A65;
              --color-on-surface:             #1A1C1F;
              --color-on-surface-variant:     #43474E;
              --color-outline:                #73787F;
              --color-outline-variant:        #C3C7CF;
              --color-nav-bg:                 rgba(246, 249, 255, 0.88);
            }
          }
          html, body {
            background: var(--color-bg);
            color: var(--color-on-surface);
            font-family: 'Outfit', system-ui, sans-serif;
            -webkit-font-smoothing: antialiased;
            scroll-behavior: smooth;
          }
          a { color: inherit; text-decoration: none; }
          img { max-width: 100%; display: block; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
