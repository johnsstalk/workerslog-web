"use client";

import {
  BookOpen,
  Users,
  CalendarDays,
  BriefcaseBusiness,
  FilePlus2,
  BarChart3,
} from "lucide-react";

export default function GuideContent() {
  const NAV = [
    ["#overview", "Overview"],
    ["#terminology", "Terminology"],
    ["#step-1", "Workers List"],
    ["#step-2", "Daily Records"],
    ["#step-3", "Projects"],
    ["#step-4", "Add Records"],
    ["#step-5", "Reports"],
  ];

  const TERMS = [
    ["ATP", "Amount To Pay — daily wage calculation"],
    ["Daily Rate", "Base wage per day"],
    ["P", "Present / Full Day"],
    ["H", "Half Day"],
    ["A", "Absent"],
    ["OT", "Overtime"],
    ["PH", "Public Holiday"],
    ["PAY", "Settlement Entry"],
    ["PRJ", "Project Entry"],
    ["Mode 1", "Daily accounting mode"],
    ["Mode 2", "Project accounting mode"],
    ["Advance", "Pre-payment given to worker"],
    ["Pending Balance", "Remaining unpaid amount"],
    ["Settlement", "Manual balance clearance"],
    ["Share %", "Worker share in project profit"],
    ["Project Rate", "Rate for project work"],
    ["Total Outstanding", "Unpaid total across history"],
  ];

  const STATUS = [
    ["P", "Present / Full Day"],
    ["H", "Half Day"],
    ["A", "Absent"],
    ["OT", "Overtime × 1.5"],
    ["PH", "Public Holiday"],
    ["PAY", "Settlement Entry"],
    ["PRJ", "Project Work"],
  ];

  return (
    <div className="wrap">

      {/* HEADER */}
      <div className="header">
        <BookOpen size={32} />
        <h1>Workers Log — Complete Guide</h1>
        <p>
          Clean documentation for managing workers, wages, and project tracking.
        </p>
      </div>

      {/* NAV */}
      <div className="nav">
        {NAV.map(([href, label]) => (
          <a key={href} href={href} className="navItem">
            {label}
          </a>
        ))}
      </div>

      {/* OVERVIEW */}
      <section id="overview" className="card">
        <h2>System Overview</h2>
        <p>
          Unified ledger system combining attendance, wages, and project accounting
          in a single structured workflow.
        </p>
      </section>

      {/* TERMINOLOGY */}
      <section id="terminology" className="card">
        <h2><BookOpen size={18} /> Terminology</h2>

        <table>
          <tbody>
            {TERMS.map(([term, meaning]) => (
              <tr key={term} className="row">
                <td className="term">{term}</td>
                <td>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* STEP 1 */}
      <section id="step-1" className="card">
        <h2><Users size={18} /> Workers List</h2>
        <p>Manage all workers from a centralized system.</p>

        <ul>
          <li>Add workers with name, rate, category</li>
          <li>Search and filter instantly</li>
          <li>Edit or delete workers anytime</li>
        </ul>

        <div className="note">
          All worker data is stored in a unified ledger timeline.
        </div>
      </section>

      {/* STEP 2 */}
      <section id="step-2" className="card">
        <h2><CalendarDays size={18} /> Daily Records</h2>

        <ul>
          <li>Attendance tracking (P, H, A, OT, PH)</li>
          <li>Automatic ATP calculation</li>
          <li>PAY settlement entries</li>
          <li>PRJ project entries</li>
        </ul>

        <div className="badgeWrap">
          {STATUS.map(([c, l]) => (
            <div key={c} className="badge">
              <b>{c}</b> {l}
            </div>
          ))}
        </div>
      </section>

      {/* STEP 3 */}
      <section id="step-3" className="card">
        <h2><BriefcaseBusiness size={18} /> Projects</h2>

        <ul>
          <li>Project-based tracking system</li>
          <li>Share percentage system</li>
          <li>Separate from daily wage system</li>
        </ul>

        <div className="note">
          Each worker should have separate project entries for accurate accounting.
        </div>
      </section>

      {/* STEP 4 */}
      <section id="step-4" className="card">
        <h2><FilePlus2 size={18} /> Add Records</h2>

        <ul>
          <li>Daily work entries</li>
          <li>Project work entries</li>
          <li>Settlement (PAY) entries</li>
          <li>Payment notes and method</li>
        </ul>
      </section>

      {/* STEP 5 */}
      <section id="step-5" className="card">
        <h2><BarChart3 size={18} /> Reports</h2>

        <ul>
          <li>Attendance summary</li>
          <li>Wage calculation report</li>
          <li>Project breakdown report</li>
          <li>PDF export</li>
        </ul>

        <div className="note">
          Reports combine daily + project ledger automatically.
        </div>
      </section>

      {/* STYLE */}
      <style jsx>{`
        .wrap {
          background: var(--color-bg);
          color: var(--color-on-surface);
          padding: 60px 20px;
        }

        /* HEADER */
        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .header h1 {
          font-size: 34px;
          margin-top: 10px;
        }

        .header p {
          opacity: 0.75;
        }

        /* NAV */
        .nav {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 30px;
        }

        .navItem {
          padding: 8px 14px;
          border-radius: 999px;
          background: var(--color-surface-container);
          font-size: 13px;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        /* ONLY INTERACTION (HOVER FEEL) */
        .navItem:hover {
          transform: translateY(-2px);
          background: var(--color-surface-container-high);
        }

        /* CARD */
        .card {
          max-width: 820px;
          margin: 18px auto;
          padding: 22px;
          border-radius: 14px;
          background: var(--color-surface-container);
          border: 1px solid var(--color-outline-variant);
          transition: transform 0.2s ease;
        }

        /* ONLY INTERACTION (HOVER FEEL) */
        .card:hover {
          transform: translateY(-3px);
        }

        h2 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        ul {
          margin-top: 10px;
          padding-left: 18px;
          line-height: 1.7;
        }

        /* TABLE */
        table {
          width: 100%;
          margin-top: 10px;
        }

        td {
          padding: 8px;
          border-bottom: 1px solid var(--color-outline-variant);
        }

        .term {
          font-weight: 600;
        }

        /* BADGES */
        .badgeWrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }

        .badge {
          padding: 8px 12px;
          background: var(--color-surface-container-high);
          border-radius: 10px;
          font-size: 13px;
        }

        /* NOTE */
        .note {
          margin-top: 12px;
          padding: 10px;
          border-left: 3px solid var(--color-primary);
          background: rgba(173,198,255,0.08);
          border-radius: 8px;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}