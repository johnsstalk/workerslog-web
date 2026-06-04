export default function GuideContent() {
  return (
    <section style={{ maxWidth: 980, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 700 }}>Workers Log — User Guide</h1>
        <p style={{ color: 'var(--color-on-surface-variant)', fontFamily: "'Outfit', sans-serif" }}>Complete step-by-step guide to terminology, screens, and workflows.</p>
      </div>

      <nav style={{ marginBottom: 28 }}>
        <strong style={{ display: 'block', marginBottom: 8 }}>Contents</strong>
        <ul>
          <li><a href="#terminology">Terminology</a></li>
          <li><a href="#step-1">Step 1 — Workers List</a></li>
          <li><a href="#step-2">Step 2 — Daily Records</a></li>
          <li><a href="#step-3">Step 3 — Projects</a></li>
          <li><a href="#step-4">Step 4 — Add Records</a></li>
          <li><a href="#step-5">Step 5 — Reports</a></li>
        </ul>
      </nav>

      <section id="terminology" style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700 }}>Workers Log Terminology</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--color-outline-variant)' }}>Term</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid var(--color-outline-variant)' }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {[
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
            ].map(([t, m]) => (
              <tr key={t}>
                <td style={{ padding: 8, borderBottom: '1px solid var(--color-outline-variant)', width: 160 }}>{t}</td>
                <td style={{ padding: 8, borderBottom: '1px solid var(--color-outline-variant)' }}>{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="step-1" style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700 }}>STEP 1 — WORKERS LIST</h2>
        <p>The main screen where you can manage all workers and add worker details like worker name, category, payment cycle, daily/weekly/monthly rates.</p>
        <ul>
          <li>Add new workers using <strong>+ Add Worker</strong></li>
          <li>Search and filter workers instantly</li>
          <li>Tap worker card and see worker details screen</li>
          <li>Edit or delete workers anytime</li>
        </ul>
        <p><em>Important Note:</em> All worker activity is stored in a single ledger timeline while daily wages and project/site balances are calculated separately for accurate tracking.</p>
      </section>

      <section id="step-2" style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700 }}>STEP 2 — DAILY RECORDS</h2>
        <p>Tap any worker to open the worker screen and view the complete worker ledger with attendance, payments, advances, and pending balances, project attendance with "PRJ" and project paid all in single unified ledger timeline.</p>
        <h3>Worker Screen Includes</h3>
        <ul>
          <li>Attendance</li>
          <li>Daily ATP (Amount to Pay)</li>
          <li>Paid amount</li>
          <li>Advance amount</li>
          <li>Pending balance</li>
          <li>Settlement entries (With PAY)</li>
          <li>Project attendance (With PRJ)</li>
          <li>Project Paid entries</li>
          <li>Notes</li>
        </ul>
        <h4>Attendance Status</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {[
              ['P', 'Present / Full Day'],
              ['H', 'Half Day'],
              ['A', 'Absent'],
              ['OT', 'Overtime × 1.5'],
              ['PH', 'Public Holiday'],
              ['PAY', 'Settlement Entry'],
              ['PRJ', 'Project/Site Work Entry'],
            ].map(([k, v]) => (
              <tr key={k}>
                <td style={{ width: 80, padding: 8, borderBottom: '1px solid var(--color-outline-variant)' }}><strong>{k}</strong></td>
                <td style={{ padding: 8, borderBottom: '1px solid var(--color-outline-variant)' }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="step-3" style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700 }}>STEP 3 — PROJECTS</h2>
        <p>Open the Worker Projects screen from bottom navigation to add project and track worker-specific project/site earnings separately from daily work accounting.</p>
        <h3>Add Project</h3>
        <ul>
          <li>Project/Site Name</li>
          <li>Total Project Value (for share calculation if any)</li>
          <li>Share% if any</li>
          <li>Project Rate if any or if project rate and daily rate are same just add daily rate in project rate.</li>
        </ul>
        <h3>Projects Includes</h3>
        <ul>
          <li>Worker assigned projects/sites</li>
          <li>Total project due</li>
          <li>Total paid</li>
          <li>Total Advance</li>
          <li>Total Pending balance</li>
          <li>Share percentage</li>
          <li>Project rate</li>
          <li>Project attendance records</li>
          <li>Notes and payment history</li>
        </ul>
        <p><em>Important Note:</em> If multiple workers work on the same project/site, create separate project entries for each worker to maintain accurate balances, attendance, earnings, and payment history individually.</p>
      </section>

      <section id="step-4" style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700 }}>STEP 4 — ADD RECORDS</h2>
        <p>Use the <strong>+ Add Record</strong> button to create worker entries. Workers Log supports two entry types: Work Entry and Settlement Entry</p>
        <h3>Entry Types</h3>
        <ul>
          <li>Work Entry</li>
          <li>Settlement Entry</li>
        </ul>
        <h4>Work Entry</h4>
        <p>Used for attendance, daily ATP, paid and project/site work entries.</p>
        <h5>Mode 1 — Daily Work</h5>
        <ul>
          <li>Work date</li>
          <li>Attendance status</li>
          <li>Auto ATP calculation from daily rate</li>
          <li>Paid amount</li>
          <li>Advance amount</li>
          <li>Payment method (Cash/Online)</li>
          <li>Notes</li>
        </ul>
        <h5>Mode 2 — Project/Site Work</h5>
        <ul>
          <li>Project work date</li>
          <li>Project/Site selection</li>
          <li>Attendance status</li>
          <li>Project paid amount</li>
          <li>Project advance amount</li>
          <li>Payment method (Cash/Online)</li>
          <li>Notes</li>
        </ul>
        <p><em>Important Note:</em> Project entries do not affect the worker’s normal daily balance. They only update project/site accounting and appear in the unified ledger with "PRJ".</p>

        <h4>Settlement Entry</h4>
        <p>Used to clear pending balances separately from attendance records.</p>
        <ul>
          <li>Settlement date</li>
          <li>Settlement amount</li>
          <li>Payment method (Cash/Online)</li>
          <li>Notes</li>
        </ul>
        <p><em>Important Note:</em> Settlement entries do not create attendance records and are marked as "PAY" in the worker ledger timeline.</p>
      </section>

      <section id="step-5" style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700 }}>STEP 5 — REPORTS</h2>
        <p>Tap <strong>View Report</strong> from the worker screen to generate a detailed worker salary and project report.</p>
        <h3>Reports Includes</h3>
        <ul>
          <li>Worker overview</li>
          <li>Daily Overview Card</li>
          <li>Whole attendance for selected period</li>
          <li>Project-wise overview</li>
          <li>Project payment details</li>
          <li>Final grand total</li>
        </ul>
        <h4>Export Options</h4>
        <ul>
          <li>Export as PDF</li>
          <li>Print report</li>
          <li>Share salary slips directly</li>
        </ul>
        <p><em>Important Note:</em> Reports automatically combine daily and project/site records from the unified ledger while calculating balances separately for accurate worker payment tracking.</p>
      </section>

    </section>
  );
}
