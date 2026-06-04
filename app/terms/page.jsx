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

export default function TermsPage() {
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
        }}>Terms of Service</h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 14,
          color: 'var(--color-outline)', marginBottom: 40,
        }}>Last Updated: May 18, 2026</p>

        <H2>Acceptance of Terms</H2>
        <P>By downloading, installing, or using Workers Log, you agree to these Terms and Conditions. If you do not agree with these Terms, you must stop using the application.</P>

        <H2>What Workers Log Is For</H2>
        <P>Workers Log is a wage, attendance, and payment management application designed specifically for contractors, site managers, and supervisors in construction and worker maintenance industries. This application is built for the person managing and paying workers, not for workers themselves.</P>

        <H2>Your Responsibilities as a User</H2>
        <P>You are solely responsible for: the accuracy of all worker information, daily rates, and attendance records you enter; verifying all wage calculations and payments before making actual payments to workers; maintaining your own backups of important records; ensuring your use of worker data complies with all applicable laws; and protecting your account login, device security, and access to the application.</P>

        <H2>How the App Records Work</H2>
        <P><strong style={{ color: 'var(--color-on-surface)' }}>Work Entries</strong> record attendance and wages for a worker on a given day. Mode 1 applies to regular daily wages. Mode 2 applies to project or site assignment. These two types are always calculated independently.</P>
        <P><strong style={{ color: 'var(--color-on-surface)' }}>Settlement Entries</strong> record a payment made to a worker without marking attendance. They record the payment only and do not mark any attendance for that day.</P>

        <H2>Attendance and Wage Calculations</H2>
        <P>Wages for each recorded day are calculated based on the attendance status you mark and the daily rate you have set. A worker's outstanding balance is calculated from total wages accumulated minus all payments, advances, and settlements you have recorded. Balances are always derived from the full record history and update automatically.</P>
        <P>Project accounting is always calculated separately from daily wage accounting. Project balances and daily wage balances are independent and are never combined.</P>

        <H2>Offline Functionality</H2>
        <P>All core features of Workers Log work without internet. Cloud synchronization runs in the background when internet is available. Internet access is never required to use the application for daily operations.</P>

        <H2>Reports and Exported Files</H2>
        <P>Workers Log is not responsible for: reports generated from incorrect or incomplete data entry, wage disputes arising from app records, financial losses resulting from inaccurate information, or how exported files are stored or shared after export.</P>

        <H2>Indian Labour Laws and Compliance</H2>
        <P>Workers Log is a record-keeping and wage calculation tool. It does not verify, enforce, or ensure compliance with any Indian labour legislation, including the Minimum Wages Act 1948, the Building and Other Construction Workers Act 1996, the Unorganised Workers' Social Security Act 2008, the Contract Labour Act 1970, the Payment of Wages Act 1936, or state-specific labour regulations.</P>
        <P>You are solely responsible for ensuring that all wages and payment practices comply with applicable laws.</P>

        <H2>Limitation of Liability</H2>
        <P>To the maximum extent permitted by law, Workers Log and its developer shall not be liable for financial loss or payment disputes, wage calculation errors arising from incorrect data entry, data loss or synchronisation failures, business interruptions, regulatory non-compliance, or any indirect or consequential damages.</P>

        <H2>Governing Law</H2>
        <P>These Terms and Conditions are governed by the laws of India. Any disputes are subject to applicable jurisdiction within Maharashtra, India.</P>

        <H2>Contact</H2>
        <P>For support or legal inquiries: <a href="mailto:workers-log.dev@gmail.com" style={{ color: 'var(--color-primary)' }}>workers-log.dev@gmail.com</a></P>
      </main>
      <SiteFooter />
    </>
  );
}