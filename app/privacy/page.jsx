'use client';

import SiteNav from '../../components/site-nav';
import SiteFooter from '../../components/site-footer';

function H2({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18,
      color: 'var(--color-on-surface)', marginTop: 36, marginBottom: 12,
    }}>{children}</h2>
  );
}

function P({ children }) {
  return (
    <p style={{
      fontFamily: "'Outfit', sans-serif", fontSize: 15, lineHeight: 1.75,
      color: 'var(--color-on-surface-variant)', marginBottom: 12,
    }}>{children}</p>
  );
}

function Li({ children }) {
  return (
    <li style={{
      fontFamily: "'Outfit', sans-serif", fontSize: 15, lineHeight: 1.7,
      color: 'var(--color-on-surface-variant)', marginBottom: 4,
    }}>{children}</li>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SiteNav minimal />
      <main style={{ maxWidth: 740, margin: '0 auto', padding: '48px var(--section-px) 80px' }}>
        <p style={{
          fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--color-primary)', marginBottom: 12,
        }}>Legal</p>
        <h1 style={{
          fontFamily: "'Sora', sans-serif", fontWeight: 800,
          fontSize: 'var(--text-h1)', color: 'var(--color-on-surface)', marginBottom: 8,
        }}>Privacy Policy</h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 14,
          color: 'var(--color-outline)', marginBottom: 40,
        }}>Last Updated: May 18, 2026</p>

        <div style={{
          background: 'var(--color-surface-container)', borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-outline-variant)', padding: '20px 24px', marginBottom: 32,
        }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 15, lineHeight: 1.7,
            color: 'var(--color-on-surface-variant)', margin: 0,
          }}>
            <strong style={{ color: 'var(--color-on-surface)' }}>In simple terms:</strong> Workers Log stores all your records directly on your phone — encrypted and secure. When internet is available, it syncs to cloud storage as a backup. We do not sell your data, show you ads, or track your behaviour. You can delete any record at any time and it is permanently removed from both your device and cloud storage.
          </p>
        </div>

        <H2>Introduction</H2>
        <P>Workers Log is a wage and attendance management application designed specifically for contractors, site managers, and supervisors who manage daily-wage workers in India's construction and worker maintenance industries — including those who oversee electricians, plumbers, carpenters, masons, painters, and other skilled daily-wage workers.</P>
        <P>By using Workers Log, you agree to the practices described in this Privacy Policy.</P>

        <H2>Information We Collect</H2>
        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--color-on-surface)', marginBottom: 8 }}>Information You Provide</p>
        <P>Workers Log stores information you enter into the application, including:</P>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          {[
            'Worker names and job categories',
            'Attendance records and working days',
            'Daily rates, wage information, and outstanding balances',
            'Payment records, advances, and settlements',
            'Project and site information',
            'Notes and remarks',
            'Your account email address',
          ].map(i => <Li key={i}>{i}</Li>)}
        </ul>
        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--color-on-surface)', marginBottom: 8 }}>Technical Information</p>
        <P>The app may collect limited technical information such as device type and operating system version, app version, and synchronisation status. This information is used only to maintain app reliability and performance.</P>
        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--color-on-surface)', marginBottom: 8 }}>What We Do Not Collect</p>
        <P>Workers Log does not collect or access: your device location, camera or microphone, device contacts or phonebook, fingerprint or biometric data, behavioural analytics or in-app usage tracking, advertising identifiers or ad-related data.</P>
        <P>The app requests only two device permissions: internet access (for synchronization) and network state detection (to know when you are online or offline).</P>

        <H2>How We Use Your Information</H2>
        <P>Workers Log uses stored information to: track worker attendance and calculate wages, manage payment records and pending balances, handle project and site accounting, generate salary slips and wage reports, synchronize records across your devices when online, provide account login and password recovery, and improve app performance and security.</P>

        <H2>How Your Data Is Stored</H2>
        <P>All data stored on your device is encrypted using AES-256 encryption. The encryption key is stored in Android Keystore (hardware-backed on most modern Android devices) or iOS Keychain.</P>
        <P>Workers Log is built with an offline-first design. Every record is saved to your device before anything goes to the cloud. Your phone is always the source of truth. Synchronization to cloud happens silently in the background when internet is available.</P>
        <P>Android's USB backup feature is disabled in Workers Log. Your worker and payment data cannot be copied from the app using standard device backup tools.</P>

        <H2>Cloud Synchronization</H2>
        <P>When synchronization is enabled, Workers Log securely stores a copy of your data using Supabase cloud infrastructure. Data synchronized to cloud may include worker records, attendance and payment records, project details, and account authentication data.</P>
        <P>For Supabase's own privacy practices, see: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>https://supabase.com/privacy</a></P>

        <H2>Deleting Your Data</H2>
        <P>You can delete any worker record, attendance entry, payment record, or project at any time from within the app. When you delete a record, it is permanently removed from both your local device storage and from Supabase cloud storage.</P>
        <P>Deleting your account removes all associated cloud-stored data. Signing out clears locally stored data from your device.</P>

        <H2>Data Sharing</H2>
        <P>Workers Log does not sell worker data or personal information. Your data may only be shared with Supabase for cloud synchronization, when required by applicable law, or to protect our legal rights or prevent abuse of the platform.</P>

        <H2>Security Measures</H2>
        <P>Workers Log uses: AES-256 local database encryption at all times, hardware-backed key storage via Android Keystore or iOS Keychain, HTTPS-only network communication, Android USB backup disabled, local data cleared from device on sign-out, and row-level security enforced on cloud database tables.</P>

        <H2>Children's Privacy</H2>
        <P>Workers Log is not intended for children under the age of 18. We do not knowingly collect personal information from children.</P>

        <H2>Your Rights</H2>
        <P>Under the Digital Personal Data Protection Act 2023 (India) and other applicable laws, you may have the right to access personal data stored about you, request correction of inaccurate information, request permanent deletion of your data, and withdraw consent for optional data processing activities.</P>
        <P>To exercise any of these rights, contact us at: <a href="mailto:workers-log.dev@gmail.com" style={{ color: 'var(--color-primary)' }}>workers-log.dev@gmail.com</a></P>

        <H2>Changes to This Privacy Policy</H2>
        <P>This Privacy Policy may be updated periodically. Updated versions take effect immediately upon publication inside the app or on the official policy page.</P>

        <H2>Contact</H2>
        <P>For privacy-related questions or support: <a href="mailto:workers-log.dev@gmail.com" style={{ color: 'var(--color-primary)' }}>workers-log.dev@gmail.com</a></P>
      </main>
      <SiteFooter />
    </>
  );
}