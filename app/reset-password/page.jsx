'use client';

import { useEffect, useState } from 'react';

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
        background: '#0C0C0D',
        color: '#F0F0F5',
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontSize: 16,
        textAlign: 'center',
        padding: 24,
        gap: 16,
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: '#F97316',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          marginBottom: 8,
        }}
      >
        ⚒️
      </div>

      <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18 }}>
        Workers<span style={{ color: '#F97316' }}>Log</span>
      </div>

      <div style={{ color: '#8A8A9A', maxWidth: 320, lineHeight: 1.6 }}>
        {message}
      </div>
    </div>
  );
}