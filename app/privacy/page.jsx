'use client';

export default function PrivacyPage() {
  const S = {
    bg: '#0C0C0D', surface: '#111114', border: '#242430',
    orange: '#F97316', text: '#F0F0F5', muted: '#8A8A9A', dim: '#50505F',
  };

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: S.text, marginBottom: 12, fontFamily: "'Sora', sans-serif" }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, color: S.muted, lineHeight: 1.75 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ background: S.bg, minHeight: '100vh', color: S.text, fontFamily: "'Outfit', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700&family=Outfit:wght@400;500&display=swap');`}</style>

      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${S.border}`, padding: '0 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', height: 58, display: 'flex', alignItems: 'center' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: S.text }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: S.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚒️</div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15 }}>
              Workers<span style={{ color: S.orange }}>Log</span>
            </span>
          </a>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 8 }}>
          Privacy Policy
        </h1>
        <p style={{ color: S.dim, fontSize: 14, marginBottom: 48 }}>Last updated: June 2026</p>

        <Section title="1. Who We Are">
          WorkersLog is a mobile application for attendance and wage tracking built for construction contractors and labour supervisors in India. The app is developed by Johnsstalk ("we", "us", "our").
        </Section>

        <Section title="2. What Data We Collect">
          <p style={{ marginBottom: 10 }}>We collect only what is necessary to provide the service:</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li><strong style={{ color: S.text }}>Account information:</strong> Your email address and password (stored as a bcrypt hash) used to create and access your account.</li>
            <li><strong style={{ color: S.text }}>Worker records:</strong> Names, job categories, daily rates, and attendance entries you create inside the app.</li>
            <li><strong style={{ color: S.text }}>Financial records:</strong> Wage calculations, advances, and settlements you record in the app.</li>
            <li><strong style={{ color: S.text }}>Subscription information:</strong> Your plan status (Free or Pro) and subscription billing records via Razorpay.</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Data">
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>To provide core app functionality — attendance tracking, wage calculation, ledger management.</li>
            <li>To sync your data across devices (Pro plan only) via our secure cloud backend.</li>
            <li>To process your subscription payments through Razorpay.</li>
            <li>To send transactional emails such as password reset requests.</li>
          </ul>
        </Section>

        <Section title="4. Data Storage and Security">
          <p style={{ marginBottom: 10 }}>All data stored on your device is encrypted using AES-256 via SQLCipher. Data in transit between your device and our servers is protected by TLS. Our cloud database (Supabase) is hosted in secure data centres with row-level security policies ensuring you can only access your own data.</p>
          <p>We do not sell, rent, or share your personal data or worker records with any third party for marketing or advertising purposes.</p>
        </Section>

        <Section title="5. Third-Party Services">
          <p style={{ marginBottom: 10 }}>We use the following third-party services to operate WorkersLog:</p>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li><strong style={{ color: S.text }}>Supabase:</strong> Authentication and cloud data storage. <a href="https://supabase.com/privacy" style={{ color: S.orange }}>Privacy Policy</a></li>
            <li><strong style={{ color: S.text }}>Razorpay:</strong> Payment processing for Pro subscriptions. <a href="https://razorpay.com/privacy/" style={{ color: S.orange }}>Privacy Policy</a></li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          Your data is retained as long as your account is active. You may request deletion of your account and all associated data by contacting us at the email below. We will process deletion requests within 30 days.
        </Section>

        <Section title="7. Your Rights">
          You have the right to access, correct, or delete your personal data at any time. For any privacy-related requests, contact us at: <a href="mailto:support@workerslog.in" style={{ color: S.orange }}>support@workerslog.in</a>
        </Section>

        <Section title="8. Children's Privacy">
          WorkersLog is not intended for use by anyone under the age of 18. We do not knowingly collect data from minors.
        </Section>

        <Section title="9. Changes to This Policy">
          We may update this policy from time to time. Any significant changes will be communicated via the app or by email. The date at the top of this page reflects when it was last updated.
        </Section>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${S.border}`, fontSize: 14, color: S.dim }}>
          Questions? Contact us at <a href="mailto:support@workerslog.in" style={{ color: S.orange }}>support@workerslog.in</a>
        </div>
      </div>
    </div>
  );
}
