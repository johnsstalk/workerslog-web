export default function GuideContent() {
  const NAV = [
    ['#terminology', 'Terminology'],
    ['#step-1', '01 · Workers List'],
    ['#step-2', '02 · Daily Records'],
    ['#step-3', '03 · Projects'],
    ['#step-4', '04 · Add Records'],
    ['#step-5', '05 · Reports'],
  ];

  const TERMS = [
    ['ATP', 'Amount To Pay / Daily Rates'],
    ['P', 'Present / Full Day'],
    ['H', 'Half Day'],
    ['A', 'Absent'],
    ['OT', 'Overtime'],
    ['PH', 'Public Holiday'],
    ['PAY', 'Settlement Entry'],
    ['PRJ', 'Project/Site Work Entry'],
    ['Daily Ledger', 'Daily wage and settlement accounting'],
    ['Project Accounting', 'Separate accounting for project/site earnings'],
    ['Advance', 'Extra payment given before final settlement'],
    ['Pending Balance', 'Remaining unpaid worker balance'],
    ['Settlement', 'Manual payment used to clear balances'],
    ['Share %', 'Worker share percentage from project value'],
    ['Project Rate', 'Worker payment rate for project/site work'],
    ['Unified Ledger Timeline', 'Single timeline containing all worker activity'],
    ['Payment Cycle', 'Daily, Weekly, or Monthly payment structure'],
  ];

  const STATUS = [
    ['P', 'Present / Full Day'],
    ['H', 'Half Day'],
    ['A', 'Absent'],
    ['OT', 'Overtime × 1.5'],
    ['PH', 'Public Holiday'],
    ['PAY', 'Settlement Entry'],
    ['PRJ', 'Project/Site Work'],
  ];

  return (
    <>
      <div className="wl-guide-wrap">

        {/* ── Page Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="wl-eyebrow">User Guide</span>
          <h1 style={{
            fontFamily: "'Sora', sans-serif", fontWeight: 700,
            fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--color-on-surface)',
            margin: '0 0 12px',
          }}>Workers Log — Complete Guide</h1>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 17,
            color: 'var(--color-on-surface-variant)',
            maxWidth: 480, margin: '0 auto',
          }}>Step-by-step guide to terminology, screens, and workflows.</p>
        </div>

        {/* ── Contents Nav ── */}
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48, justifyContent: 'center' }}>
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="wl-chip">{label}</a>
          ))}
        </nav>

        {/* ── Terminology ── */}
        <section id="terminology" className="wl-card">
          <div className="wl-card-head">
            <div className="wl-step-num">📋</div>
            <h2 className="wl-card-title">Terminology</h2>
          </div>
          <table className="wl-table">
            <thead>
              <tr>
                <th>Term</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {TERMS.map(([term, meaning]) => (
                <tr key={term}>
                  <td><span className="wl-code">{term}</span></td>
                  <td>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Step 1 ── */}
        <section id="step-1" className="wl-card">
          <div className="wl-card-head">
            <div className="wl-step-num">01</div>
            <h2 className="wl-card-title">Workers List</h2>
          </div>
          <p className="wl-body">The main screen where you manage all workers. Add worker name, category, payment cycle, and daily/weekly/monthly rates.</p>
          <ul className="wl-list">
            <li>Add new workers using <strong>+ Add Worker</strong></li>
            <li>Search and filter workers instantly</li>
            <li>Tap a worker card to open the worker details screen</li>
            <li>Edit or delete workers anytime</li>
          </ul>
          <div className="wl-note">All worker activity is stored in a single ledger timeline while daily wages and project/site balances are calculated separately for accurate tracking.</div>
        </section>

        {/* ── Step 2 ── */}
        <section id="step-2" className="wl-card">
          <div className="wl-card-head">
            <div className="wl-step-num">02</div>
            <h2 className="wl-card-title">Daily Records</h2>
          </div>
          <p className="wl-body">Tap any worker to view the complete unified ledger — attendance, payments, advances, pending balances, project entries — all in one timeline.</p>
          <h3 className="wl-sub-title">Worker Screen Includes</h3>
          <ul className="wl-list">
            <li>Attendance and Daily ATP (Amount to Pay)</li>
            <li>Paid amount, Advance amount, Pending balance</li>
            <li>Settlement entries (marked PAY) and Notes</li>
            <li>Project attendance (marked PRJ) and Project paid entries</li>
          </ul>
          <h3 className="wl-sub-title">Attendance Status Codes</h3>
          <div className="wl-status-grid">
            {STATUS.map(([code, label]) => (
              <div key={code} className="wl-status-item">
                <span className="wl-status-code">{code}</span>
                <span className="wl-status-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Step 3 ── */}
        <section id="step-3" className="wl-card">
          <div className="wl-card-head">
            <div className="wl-step-num">03</div>
            <h2 className="wl-card-title">Projects</h2>
          </div>
          <p className="wl-body">Open the Worker Projects screen from bottom navigation to add projects and track worker-specific project/site earnings separately from daily work accounting.</p>
          <div className="wl-two-col">
            <div className="wl-inner-card">
              <h3 className="wl-sub-title" style={{ marginTop: 0 }}>Add Project</h3>
              <ul className="wl-list">
                <li>Project / Site Name</li>
                <li>Total Project Value (for share calculation)</li>
                <li>Share % if applicable</li>
                <li>Project Rate (or use daily rate if same)</li>
              </ul>
            </div>
            <div className="wl-inner-card">
              <h3 className="wl-sub-title" style={{ marginTop: 0 }}>Project Tracks</h3>
              <ul className="wl-list">
                <li>Total project due and total paid</li>
                <li>Total advance and pending balance</li>
                <li>Share % and project rate</li>
                <li>Project attendance and payment history</li>
              </ul>
            </div>
          </div>
          <div className="wl-note">If multiple workers work on the same project/site, create separate project entries for each worker to maintain accurate balances, attendance, and payment history individually.</div>
        </section>

        {/* ── Step 4 ── */}
        <section id="step-4" className="wl-card">
          <div className="wl-card-head">
            <div className="wl-step-num">04</div>
            <h2 className="wl-card-title">Add Records</h2>
          </div>
          <p className="wl-body">Use <strong>+ Add Record</strong> to create entries. Two types: Work Entry and Settlement Entry.</p>
          <div className="wl-two-col">
            <div className="wl-inner-card">
              <h3 className="wl-sub-title" style={{ marginTop: 0 }}>Work Entry — Mode 1 (Daily)</h3>
              <ul className="wl-list">
                <li>Work date and attendance status</li>
                <li>Auto ATP calculated from daily rate</li>
                <li>Paid amount and advance amount</li>
                <li>Payment method (Cash / Online) and notes</li>
              </ul>
            </div>
            <div className="wl-inner-card">
              <h3 className="wl-sub-title" style={{ marginTop: 0 }}>Work Entry — Mode 2 (Project)</h3>
              <ul className="wl-list">
                <li>Project work date and Project/Site selection</li>
                <li>Attendance status</li>
                <li>Project paid and advance amount</li>
                <li>Payment method (Cash / Online) and notes</li>
              </ul>
            </div>
          </div>
          <div className="wl-inner-card" style={{ marginTop: 16 }}>
            <h3 className="wl-sub-title" style={{ marginTop: 0 }}>Settlement Entry (PAY)</h3>
            <p className="wl-body" style={{ margin: 0 }}>Used to clear pending balances without marking attendance. Appears as <strong>PAY</strong> in the ledger. Requires settlement date, amount, payment method, and optional notes.</p>
          </div>
          <div className="wl-note">Project entries do not affect the worker's normal daily balance — they only update project/site accounting and appear in the unified ledger with "PRJ".</div>
        </section>

        {/* ── Step 5 ── */}
        <section id="step-5" className="wl-card">
          <div className="wl-card-head">
            <div className="wl-step-num">05</div>
            <h2 className="wl-card-title">Reports</h2>
          </div>
          <p className="wl-body">Tap <strong>View Report</strong> from the worker screen to generate a detailed salary and project report.</p>
          <div className="wl-two-col">
            <div className="wl-inner-card">
              <h3 className="wl-sub-title" style={{ marginTop: 0 }}>Report Includes</h3>
              <ul className="wl-list">
                <li>Worker overview and Daily Overview Card</li>
                <li>Full attendance for selected period</li>
                <li>Project-wise overview</li>
                <li>Project payment details</li>
                <li>Final grand total</li>
              </ul>
            </div>
            <div className="wl-inner-card">
              <h3 className="wl-sub-title" style={{ marginTop: 0 }}>Export Options</h3>
              <ul className="wl-list">
                <li>Export as PDF</li>
                <li>Print report</li>
                <li>Share salary slips directly</li>
              </ul>
            </div>
          </div>
          <div className="wl-note">Reports automatically combine daily and project/site records from the unified ledger while calculating balances separately for accurate worker payment tracking.</div>
        </section>

      </div>

      <style>{`
        .wl-guide-wrap {
          max-width: 860px;
          margin: 0 auto;
          padding: var(--space-3xl) 24px 80px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .wl-eyebrow {
          display: block;
          font-family: 'Sora', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 12px;
        }
        .wl-chip {
          display: inline-block;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          background: rgba(173, 198, 255, 0.1);
          border: 1px solid rgba(173, 198, 255, 0.2);
          color: var(--color-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 500;
          text-decoration: none;
          transition: background 200ms ease;
        }
        .wl-chip:hover { background: rgba(173, 198, 255, 0.18); }
        .wl-card {
          background: var(--color-surface-container);
          border: 1px solid var(--color-outline-variant);
          border-radius: var(--radius-l);
          padding: 28px;
        }
        .wl-card-head {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 16px;
        }
        .wl-step-num {
          flex-shrink: 0; width: 48px; height: 48px;
          border-radius: var(--radius-s);
          background: var(--color-primary-brand);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif; font-weight: 800; font-size: 14px;
          color: #FFFFFF;
        }
        .wl-card-title {
          font-family: 'Sora', sans-serif;
          font-weight: 700; font-size: 20px;
          color: var(--color-on-surface); margin: 0;
        }
        .wl-sub-title {
          font-family: 'Sora', sans-serif;
          font-weight: 700; font-size: 11px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--color-outline);
          margin: 20px 0 8px;
        }
        .wl-body {
          font-family: 'Outfit', sans-serif;
          font-size: 15px; line-height: 1.7;
          color: var(--color-on-surface-variant);
          margin: 0 0 12px;
        }
        .wl-list {
          font-family: 'Outfit', sans-serif;
          font-size: 15px; line-height: 1.8;
          color: var(--color-on-surface-variant);
          padding-left: 20px; margin: 8px 0 0;
        }
        .wl-note {
          background: rgba(173, 198, 255, 0.06);
          border: 1px solid rgba(173, 198, 255, 0.15);
          border-left: 3px solid var(--color-primary-brand);
          border-radius: var(--radius-m);
          padding: 14px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; line-height: 1.6;
          color: var(--color-on-surface-variant);
          margin-top: 16px;
        }
        .wl-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .wl-table th {
          text-align: left; padding: 10px 12px;
          font-family: 'Sora', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--color-outline);
          border-bottom: 1px solid var(--color-outline-variant);
        }
        .wl-table td {
          padding: 10px 12px;
          border-bottom: 1px solid var(--color-outline-variant);
          font-family: 'Outfit', sans-serif;
          font-size: 14px; line-height: 1.5;
          color: var(--color-on-surface-variant);
        }
        .wl-table tr:last-child td { border-bottom: none; }
        .wl-code {
          display: inline-block; padding: 2px 8px;
          background: rgba(173, 198, 255, 0.1);
          border: 1px solid rgba(173, 198, 255, 0.2);
          border-radius: var(--radius-xs);
          font-family: 'Sora', sans-serif;
          font-size: 12px; font-weight: 700;
          color: var(--color-primary);
        }
        .wl-inner-card {
          background: var(--color-surface-container-high);
          border: 1px solid var(--color-outline-variant);
          border-radius: var(--radius-card);
          padding: 18px 20px;
        }
        .wl-two-col {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px; margin-top: 16px;
        }
        .wl-status-grid {
          display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px;
        }
        .wl-status-item {
          display: flex; align-items: center; gap: 8px;
          background: var(--color-surface-container-high);
          border: 1px solid var(--color-outline-variant);
          border-radius: var(--radius-m);
          padding: 8px 14px;
        }
        .wl-status-code {
          font-family: 'Sora', sans-serif;
          font-size: 12px; font-weight: 700;
          color: var(--color-primary);
          min-width: 30px;
        }
        .wl-status-label {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          color: var(--color-on-surface-variant);
        }
        @media (max-width: 640px) {
          .wl-guide-wrap { padding: 40px 16px 64px; }
          .wl-card { padding: 20px 16px; }
          .wl-two-col { grid-template-columns: 1fr; }
          .wl-status-grid { gap: 8px; }
        }
      `}</style>
    </>
  );
}