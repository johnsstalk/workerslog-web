'use client';

import { useEffect, useState } from 'react';
import SiteLogo from '../../components/site-logo';

export default function ResetPasswordPage() {
  const [message, setMessage] = useState('Redirecting to WorkersLog...');

  useEffect(() => {
    // Extract tokens from URL hash — same logic as the original index.html
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const type = params.get('type');

    if (accessToken) {
      const deepLink =
        `workerslog://reset-password` +
        `?access_token=${encodeURIComponent(accessToken)}` +
        `&refresh_token=${encodeURIComponent(refreshToken || '')}` +
        `&type=${encodeURIComponent(type || '')}`;
      window.location.replace(deepLink);
    } else {
      // No token found — link is invalid or already used
      setMessage('This reset link is invalid or has expired. Please request a new one from the app.');
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'var(--color-on-surface)',
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: 16,
        textAlign: 'center',
        padding: '48px var(--section-px) 80px',
        gap: 16,
        width: '100%',
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <SiteLogo size="large" />
      </div>

      <div style={{ color: 'var(--color-on-surface-variant)', maxWidth: 540, lineHeight: 1.6 }}>
        {message}
      </div>

      <div style={{ marginTop: 18 }}>
        <a href="/" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>Return to website</a>
      </div>
    </div>
  );
}