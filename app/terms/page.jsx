'use client';

export default function TermsPage() {
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

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 8 }}>
          Terms of Service
        </h1>
        <p style={{ color: S.dim, fontSize: 14, marginBottom: 48 }}>Last updated: June 2026</p>

        <Section title="1. Acceptance of Terms">
          By downloading, installing, or using WorkersLog ("the App"), you agree to be bound by these Terms of Service. If you do not agree, do not use the App.
        </Section>

        <Section title="2. Description of Service">
          WorkersLog is a mobile application that provides attendance tracking, wage calculation, and labour management tools for construction contractors. The App is available in a Free tier and a Pro tier with additional features.
        </Section>

        <Section title="3. User Accounts">
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are responsible for all activity that occurs under your account.</li>
            <li>You must provide accurate information when creating your account.</li>
            <li>You must notify us immediately of any unauthorised use of your account.</li>
          </ul>
        </Section>

        <Section title="4. Pro Subscription">
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>The Pro plan is available on a monthly (₹99/month) or yearly (₹799/year) subscription basis.</li>
            <li>Subscriptions are billed in advance and auto-renew unless cancelled before the renewal date.</li>
            <li>Payments are processed by Razorpay. By subscribing, you agree to Razorpay's terms of service.</li>
            <li>You may cancel your subscription at any time. Access to Pro features continues until the end of the current billing period.</li>
            <li>We do not offer refunds for partial subscription periods.</li>
          </ul>
        </Section>

        <Section title="5. Acceptable Use">
          You agree not to:
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <li>Use the App for any unlawful purpose or in violation of any applicable law.</li>
            <li>Attempt to reverse engineer, decompile, or tamper with the App.</li>
            <li>Use the App to store or transmit malicious code.</li>
            <li>Attempt to gain unauthorised access to any part of the App or its infrastructure.</li>
          </ul>
        </Section>

        <Section title="6. Data and Privacy">
          Your use of the App is also governed by our Privacy Policy, which is incorporated into these Terms by reference. We take the security of your worker and financial data seriously and use AES-256 encryption to protect it.
        </Section>

        <Section title="7. Limitation of Liability">
          WorkersLog is provided "as is" without warranty of any kind. We are not liable for any loss of data, financial loss, or indirect damages arising from your use of the App. You are responsible for maintaining your own backups on the Free tier (which does not include cloud sync).
        </Section>

        <Section title="8. Service Availability">
          We aim for high availability but do not guarantee uninterrupted access to cloud features. Offline features (core attendance and wage tracking) function independently of internet connectivity and are not affected by server downtime.
        </Section>

        <Section title="9. Changes to Terms">
          We may update these Terms from time to time. Continued use of the App after changes constitutes acceptance of the new Terms.
        </Section>

        <Section title="10. Governing Law">
          These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of India.
        </Section>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${S.border}`, fontSize: 14, color: S.dim }}>
          Questions? Contact us at <a href="mailto:support@workerslog.in" style={{ color: S.orange }}>support@workerslog.in</a>
        </div>
      </div>
    </div>
  );
}
