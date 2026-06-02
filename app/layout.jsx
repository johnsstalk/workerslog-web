export const metadata = {
  title: 'Workers Log — Track Workers. Not Paperwork.',
  description:
    'Offline-first attendance and wage tracking for construction contractors. AES-256 encrypted. Works without internet. Built for India.',
  keywords: 'workers attendance app, labour management, construction app India, wage tracking offline',
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
      <body style={{ margin: 0, padding: 0, background: '#0C0C0D' }}>
        {children}
      </body>
    </html>
  );
}