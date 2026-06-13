"use client";

import { useState, useEffect } from "react";
import {
  BookOpen, Users, CalendarDays, BriefcaseBusiness,
  FilePlus2, BarChart3, Search, ArrowUp, Zap,
  Info, ChevronRight, Layers,
} from "lucide-react";

// ─── Section config ─────────────────────────────────────
const SECTIONS = [
  { id: "overview",     label: "Overview",        Icon: Layers },
  { id: "quick-ref",    label: "Quick Reference", Icon: Zap },
  { id: "terminology",  label: "Terminology",     Icon: BookOpen },
  { id: "step-1",       label: "Workers List",    Icon: Users },
  { id: "step-2",       label: "Daily Records",   Icon: CalendarDays },
  { id: "step-3",       label: "Projects",        Icon: BriefcaseBusiness },
  { id: "step-4",       label: "Add Records",     Icon: FilePlus2 },
  { id: "step-5",       label: "Reports",         Icon: BarChart3 },
];

// ─── Terminology ─────────────────────────────────────────
const TERMS = [
  ["ATP", "Amount To Pay — calculated daily wage based on attendance status and daily rate"],
  ["Daily Rate", "Worker's base wage per day, used to calculate ATP"],
  ["P", "Present / Full Day"],
  ["H", "Half Day"],
  ["A", "Absent"],
  ["OT", "Overtime × 1.5"],
  ["PH", "Public Holiday"],
  ["PAY", "Settlement Entry — manual balance clearance without attendance"],
  ["PRJ", "Project/Site Work Entry"],
  ["Mode 1", "Daily accounting mode — affects daily ATP and balance only"],
  ["Mode 2", "Project accounting mode — affects project balance only, not daily"],
  ["Advance", "Pre-payment given to a worker before final settlement"],
  ["Pending Balance", "Remaining unpaid amount owed to a worker"],
  ["Settlement", "Manual payment used to clear outstanding balance"],
  ["Share %", "Worker percentage share of total project value"],
  ["Project Rate", "Separate payment rate applied to project/site work"],
  ["Total Outstanding", "Cumulative unpaid balance across all records and history"],
];

// ─── Status color map (light-theme accents) ─────────────
const COLORS = {
  P:   { bg: "rgba(109,213,140,0.12)", border: "rgba(109,213,140,0.32)", text: "#3A8B5A" },
  H:   { bg: "rgba(255,186,10, 0.12)", border: "rgba(255,186,10, 0.32)", text: "#B07A00" },
  A:   { bg: "rgba(255,180,171,0.12)", border: "rgba(255,180,171,0.32)", text: "#B85A4A" },
  OT:  { bg: "rgba(124,108,222,0.10)",  border: "rgba(124,108,222,0.28)",  text: "#5B4FB8" },
  PH:  { bg: "rgba(35,72,204,0.10)",    border: "rgba(35,72,204,0.28)",    text: "#2348CC" },
  PAY: { bg: "rgba(20,160,140,0.10)",   border: "rgba(20,160,140,0.28)",   text: "#0E8C7A" },
  PRJ: { bg: "rgba(220,130,60,0.10)",   border: "rgba(220,130,60,0.28)",   text: "#B26820" },
};

// ─── Quick reference rows ────────────────────────────────
const QUICK_REF = [
  { code: "P",   label: "Present",        formula: "Rate × 1.0", example: "₹500" },
  { code: "H",   label: "Half Day",       formula: "Rate × 0.5", example: "₹250" },
  { code: "A",   label: "Absent",         formula: "No pay",     example: "₹0"   },
  { code: "OT",  label: "Overtime",       formula: "Rate × 1.5", example: "₹750" },
  { code: "PH",  label: "Public Holiday", formula: "Rate × 1.0", example: "₹500" },
  { code: "PAY", label: "Settlement",     formula: "Clears balance", example: "—" },
  { code: "PRJ", label: "Project Work",   formula: "Project rate",   example: "—" },
];

const STATUS_LABELS = {
  P: "Present", H: "Half Day", A: "Absent",
  OT: "Overtime", PH: "Public Holiday", PAY: "Settlement", PRJ: "Project Work",
};

// ─── Reusable sub-components ─────────────────────────────
function CardHead({ iconBg, iconColor, icon: Icon, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: iconBg,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={18} />
      </div>
      <div>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: "var(--color-on-surface)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>
        {sub && (
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 12,
              color: "var(--color-on-surface-variant)",
              margin: "3px 0 0",
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

function Note({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        marginTop: 16,
        padding: "13px 16px",
        background: "rgba(173, 198, 255, 0.06)",
        border: "1px solid rgba(173, 198, 255, 0.18)",
        borderLeft: "3px solid var(--color-primary)",
        borderRadius: 10,
        fontFamily: "'Outfit', sans-serif",
        fontSize: 13.5,
        lineHeight: 1.65,
        color: "var(--color-on-surface-variant)",
      }}
    >
      <Info
        size={14}
        style={{ flexShrink: 0, color: "var(--color-primary)", marginTop: 1 }}
      />
      <span>{children}</span>
    </div>
  );
}

function GuideList({ items }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "flex", flexDirection: "column", gap: 7 }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 9,
            fontFamily: "'Outfit', sans-serif",
            fontSize: 14.5,
            lineHeight: 1.6,
            color: "var(--color-on-surface-variant)",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--color-primary)",
              flexShrink: 0,
              marginTop: 8,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function InnerCard({ title, items }) {
  return (
    <div
      style={{
        background: "var(--color-surface-container-high)",
        border: "1px solid var(--color-outline-variant)",
        borderRadius: 12,
        padding: "16px 18px",
      }}
    >
      <p
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-on-surface-variant)",
          margin: "0 0 10px",
        }}
      >
        {title}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 9,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "var(--color-on-surface-variant)",
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--color-primary)",
                flexShrink: 0,
                marginTop: 8,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────
export default function GuideContent() {
  const [active, setActive] = useState("overview");
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);

  // Scroll progress + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowBackTop(scrolled > 420);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const filtered = TERMS.filter(([t, m]) =>
    `${t} ${m}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Reading progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 200,
          pointerEvents: "none",
          height: 3,
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, var(--color-primary-brand) 0%, var(--color-primary) 100%)",
          borderRadius: "0 2px 2px 0",
          transition: "width 0.12s linear",
        }}
      />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 50,
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "var(--color-primary-brand)",
          border: "none",
          color: "#ffffff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(35, 72, 204, 0.4)",
          opacity: showBackTop ? 1 : 0,
          transform: showBackTop ? "translateY(0)" : "translateY(14px)",
          pointerEvents: showBackTop ? "auto" : "none",
          transition:
            "opacity 0.26s ease, transform 0.26s ease, box-shadow 0.2s ease, background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(35, 72, 204, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = showBackTop ? "translateY(0)" : "translateY(14px)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(35, 72, 204, 0.4)";
        }}
      >
        <ArrowUp size={17} />
      </button>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "60px 24px 100px",
        }}
      >
        {/* ── Page header ── */}
        <header style={{ textAlign: "center", marginBottom: 52 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(173, 198, 255, 0.12)",
              border: "1px solid rgba(173, 198, 255, 0.25)",
              color: "var(--color-primary)",
              borderRadius: "var(--radius-full)",
              padding: "4px 14px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "'Sora', sans-serif",
              marginBottom: 16,
            }}
          >
            <BookOpen size={11} />
            User Guide
          </span>
          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(30px, 5vw, 46px)",
              fontWeight: 800,
              color: "var(--color-on-surface)",
              letterSpacing: "-0.025em",
              margin: "0 0 12px",
            }}
          >
            Workers Log
          </h1>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 16,
              color: "var(--color-on-surface-variant)",
              maxWidth: 420,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Complete guide to managing workers, wages, and project tracking.
          </p>
        </header>

        {/* ── Body grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "208px 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Sidebar (desktop) */}
          <aside
            style={{
              position: "sticky",
              top: 80,
            }}
          >
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.11em",
                textTransform: "uppercase",
                color: "var(--color-on-surface-variant)",
                margin: "0 0 10px",
                padding: "0 10px",
              }}
            >
              In this guide
            </p>
            <nav>
              {SECTIONS.map(({ id, label, Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "9px 10px",
                    borderRadius: 8,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 13,
                    color:
                      active === id
                        ? "var(--color-primary)"
                        : "var(--color-on-surface-variant)",
                    textDecoration: "none",
                    background:
                      active === id
                        ? "rgba(173, 198, 255, 0.12)"
                        : "transparent",
                    fontWeight: active === id ? 600 : 500,
                    marginBottom: 2,
                    transition: "background 0.16s ease, color 0.16s ease",
                  }}
                >
                  <Icon size={13} style={{ flexShrink: 0 }} />
                  <span>{label}</span>
                  {active === id && (
                    <ChevronRight
                      size={11}
                      style={{ marginLeft: "auto", flexShrink: 0, color: "var(--color-primary)" }}
                    />
                  )}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main>
            {/* Mobile nav chips */}
            <nav
              style={{
                display: "none",
                overflowX: "auto",
                gap: 7,
                paddingBottom: 4,
                marginBottom: 22,
                scrollbarWidth: "none",
              }}
            >
              {SECTIONS.map(({ id, label, Icon }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    flexShrink: 0,
                    padding: "7px 13px",
                    borderRadius: 999,
                    border: `1px solid ${
                      active === id
                        ? "var(--color-primary)"
                        : "var(--color-outline-variant)"
                    }`,
                    background:
                      active === id
                        ? "rgba(173, 198, 255, 0.12)"
                        : "var(--color-surface-container)",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 12,
                    fontWeight: active === id ? 600 : 500,
                    color:
                      active === id
                        ? "var(--color-primary)"
                        : "var(--color-on-surface-variant)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "background 0.16s ease, color 0.16s ease, border-color 0.16s ease",
                  }}
                >
                  <Icon size={11} />
                  {label}
                </a>
              ))}
            </nav>

            {/* ── Overview ── */}
            <section
              id="overview"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                borderRadius: 16,
                padding: 28,
                marginBottom: 18,
                transition: "border-color 0.2s ease",
              }}
            >
              <CardHead
                icon={Layers}
                iconBg="rgba(173, 198, 255, 0.12)"
                iconColor="var(--color-primary)"
                title="System Overview"
              />
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "var(--color-on-surface-variant)",
                  margin: "0 0 14px",
                }}
              >
                Workers Log is a unified ledger system that combines daily attendance,
                wages, and project/site accounting in a single structured workflow.
                Everything lives in one timeline per worker.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 18,
                  padding: 16,
                  background: "var(--color-surface-container-high)",
                  border: "1px solid var(--color-outline-variant)",
                  borderRadius: 12,
                }}
              >
                {["Add Workers", "Record Attendance", "Track Projects", "Log Payments", "Generate Reports"].map(
                  (step, i, arr) => (
                    <div key={step} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 14px",
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-outline-variant)",
                          borderRadius: 8,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: 10,
                            fontWeight: 800,
                            color: "var(--color-primary)",
                          }}
                        >
                          0{i + 1}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 13,
                            color: "var(--color-on-surface-variant)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {step}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <span style={{ color: "var(--color-on-surface-variant)", fontSize: 14, flexShrink: 0 }}>
                          →
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            </section>

            {/* ── Quick Reference ── */}
            <section
              id="quick-ref"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                borderRadius: 16,
                padding: 28,
                marginBottom: 18,
              }}
            >
              <CardHead
                icon={Zap}
                iconBg="rgba(255,186,10,0.14)"
                iconColor="#B07A00"
                title="Quick Reference"
                sub="ATP formulas — based on ₹500/day example rate"
              />
              <div
                style={{
                  marginTop: 16,
                  borderRadius: 12,
                  border: "1px solid var(--color-outline-variant)",
                  overflow: "hidden",
                  background: "var(--color-surface-container-high)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "58px 1fr 1fr 68px",
                    alignItems: "center",
                    gap: 10,
                    padding: "11px 16px",
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-on-surface-variant)",
                    background: "var(--color-surface-container-high)",
                    borderBottom: "1px solid var(--color-outline-variant)",
                  }}
                >
                  <span>Code</span>
                  <span>Meaning</span>
                  <span>ATP Formula</span>
                  <span style={{ textAlign: "right" }}>Example</span>
                </div>
                {QUICK_REF.map(({ code, label, formula, example }) => {
                  const c = COLORS[code];
                  return (
                    <div
                      key={code}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "58px 1fr 1fr 68px",
                        alignItems: "center",
                        gap: 10,
                        padding: "11px 16px",
                        borderBottom: "1px solid var(--color-outline-variant)",
                        transition: "background 0.14s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(173, 198, 255, 0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "3px 8px",
                          borderRadius: 6,
                          background: c.bg,
                          border: `1px solid ${c.border}`,
                          color: c.text,
                          fontFamily: "'Sora', sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {code}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: 14,
                          color: "var(--color-on-surface)",
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: 12,
                          color: "var(--color-on-surface-variant)",
                        }}
                      >
                        {formula}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--color-primary)",
                          textAlign: "right",
                        }}
                      >
                        {example}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Terminology ── */}
            <section
              id="terminology"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                borderRadius: 16,
                padding: 28,
                marginBottom: 18,
              }}
            >
              <CardHead
                icon={BookOpen}
                iconBg="rgba(173, 198, 255, 0.12)"
                iconColor="var(--color-primary)"
                title="Terminology"
                sub={`${TERMS.length} terms defined`}
              />
              <div style={{ position: "relative", marginBottom: 16 }}>
                <Search
                  size={13}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-on-surface-variant)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search terms..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px 10px 34px",
                    borderRadius: 10,
                    border: "1px solid var(--color-outline-variant)",
                    background: "var(--color-surface-container-high)",
                    color: "var(--color-on-surface)",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-outline-variant)";
                  }}
                />
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "9px 12px",
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-on-surface-variant)",
                        borderBottom: "1px solid var(--color-outline-variant)",
                      }}
                    >
                      Term
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "9px 12px",
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-on-surface-variant)",
                        borderBottom: "1px solid var(--color-outline-variant)",
                      }}
                    >
                      Meaning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(([term, meaning]) => (
                    <tr key={term}>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--color-outline-variant)" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            background: "rgba(173, 198, 255, 0.1)",
                            border: "1px solid rgba(173, 198, 255, 0.22)",
                            borderRadius: 6,
                            fontFamily: "'Sora', sans-serif",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "var(--color-primary)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {term}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          borderBottom: "1px solid var(--color-outline-variant)",
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: 14,
                          lineHeight: 1.55,
                          color: "var(--color-on-surface-variant)",
                          overflowWrap: "break-word",
                        }}
                      >
                        {meaning}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={2}
                        style={{
                          textAlign: "center",
                          padding: "28px 12px",
                          color: "var(--color-on-surface-variant)",
                          fontStyle: "italic",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        No terms match "{search}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>

            {/* ── Step 1: Workers List ── */}
            <section
              id="step-1"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                borderRadius: 16,
                padding: 28,
                marginBottom: 18,
              }}
            >
              <CardHead
                icon={Users}
                iconBg="rgba(20,160,140,0.10)"
                iconColor="#0E8C7A"
                title="Workers List"
              />
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "var(--color-on-surface-variant)",
                  margin: "0 0 14px",
                }}
              >
                The main screen where you manage all workers. Each worker has a name, job category,
                daily rate, and payment cycle.
              </p>
              <GuideList
                items={[
                  "Add workers with name, category, and daily rate",
                  "Search and filter workers instantly",
                  "Tap any worker card to open their full ledger",
                  "Edit or delete workers at any time",
                ]}
              />
              <Note>
                All worker activity is stored in a single unified ledger timeline.
                Daily wages and project balances are calculated separately for accurate tracking.
              </Note>
            </section>

            {/* ── Step 2: Daily Records ── */}
            <section
              id="step-2"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                borderRadius: 16,
                padding: 28,
                marginBottom: 18,
              }}
            >
              <CardHead
                icon={CalendarDays}
                iconBg="rgba(255,186,10,0.12)"
                iconColor="#B07A00"
                title="Daily Records"
              />
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "var(--color-on-surface-variant)",
                  margin: "0 0 14px",
                }}
              >
                Tap any worker to view the complete unified ledger — attendance, payments,
                advances, and project entries all in one timeline.
              </p>
              <GuideList
                items={[
                  "Attendance tracking with automatic ATP calculation",
                  "Paid amount, advance, and pending balance",
                  "Settlement entries (PAY) and notes",
                  "Project attendance (PRJ) and project payment entries",
                ]}
              />

              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-on-surface-variant)",
                  margin: "18px 0 10px",
                }}
              >
                Attendance Status Codes
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {Object.entries(COLORS).map(([code, c]) => (
                  <div
                    key={code}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 13px",
                      borderRadius: 10,
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 700,
                        fontSize: 12,
                        color: c.text,
                      }}
                    >
                      {code}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--color-on-surface-variant)",
                      }}
                    >
                      {STATUS_LABELS[code]}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Step 3: Projects ── */}
            <section
              id="step-3"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                borderRadius: 16,
                padding: 28,
                marginBottom: 18,
              }}
            >
              <CardHead
                icon={BriefcaseBusiness}
                iconBg="rgba(220,130,60,0.10)"
                iconColor="#B26820"
                title="Projects"
              />
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "var(--color-on-surface-variant)",
                  margin: "0 0 14px",
                }}
              >
                Open the Worker Projects screen from bottom navigation to create projects
                and track site-specific earnings separately from daily accounting.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
                <InnerCard
                  title="Add Project"
                  items={[
                    "Project / Site name",
                    "Total project value",
                    "Share % (if applicable)",
                    "Project rate (or use daily rate)",
                  ]}
                />
                <InnerCard
                  title="Project Tracks"
                  items={[
                    "Total project due and paid",
                    "Advance and pending balance",
                    "Attendance and payment history",
                    "Share % and project rate",
                  ]}
                />
              </div>
              <Note>
                Create separate project entries per worker on the same site — this maintains
                accurate individual balances and payment history.
              </Note>
            </section>

            {/* ── Step 4: Add Records ── */}
            <section
              id="step-4"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                borderRadius: 16,
                padding: 28,
                marginBottom: 18,
              }}
            >
              <CardHead
                icon={FilePlus2}
                iconBg="rgba(124,108,222,0.10)"
                iconColor="#5B4FB8"
                title="Add Records"
              />
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "var(--color-on-surface-variant)",
                  margin: "0 0 14px",
                }}
              >
                Use <strong>+ Add Record</strong> to create entries. Two types: Work Entry and Settlement Entry.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
                <InnerCard
                  title="Mode 1 — Daily Work"
                  items={[
                    "Work date and attendance status",
                    "Auto ATP from daily rate",
                    "Paid + advance amount",
                    "Payment method and notes",
                  ]}
                />
                <InnerCard
                  title="Mode 2 — Project Work"
                  items={[
                    "Project/site selection",
                    "Project work date",
                    "Project paid + advance",
                    "Payment method and notes",
                  ]}
                />
              </div>
              <div
                style={{
                  background: "var(--color-surface-container-high)",
                  border: "1px solid var(--color-outline-variant)",
                  borderRadius: 12,
                  padding: "16px 18px",
                  marginTop: 14,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-on-surface-variant)",
                    margin: "0 0 10px",
                  }}
                >
                  Settlement Entry (PAY)
                </p>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--color-on-surface-variant)",
                    margin: 0,
                  }}
                >
                  Clears pending balances without marking attendance. Appears as{" "}
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      background: "rgba(173, 198, 255, 0.1)",
                      border: "1px solid rgba(173, 198, 255, 0.22)",
                      borderRadius: 6,
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--color-primary)",
                    }}
                  >
                    PAY
                  </span>{" "}
                  in the ledger. Requires date, amount, payment method, and optional notes.
                </p>
              </div>
              <Note>
                Project entries never affect the worker's daily balance — they only update
                project accounting and appear in the unified ledger marked PRJ.
              </Note>
            </section>

            {/* ── Step 5: Reports ── */}
            <section
              id="step-5"
              style={{
                background: "var(--color-surface-container)",
                border: "1px solid var(--color-outline-variant)",
                borderRadius: 16,
                padding: 28,
                marginBottom: 18,
              }}
            >
              <CardHead
                icon={BarChart3}
                iconBg="rgba(109,213,140,0.12)"
                iconColor="#3A8B5A"
                title="Reports"
              />
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "var(--color-on-surface-variant)",
                  margin: "0 0 14px",
                }}
              >
                Tap <strong>View Report</strong> to generate a detailed salary and project
                breakdown for any selected period.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
                <InnerCard
                  title="Report Includes"
                  items={[
                    "Worker overview card",
                    "Full attendance for period",
                    "Project-wise breakdown",
                    "Final grand total",
                  ]}
                />
                <InnerCard
                  title="Export Options"
                  items={[
                    "Export as PDF",
                    "Print report directly",
                    "Share salary slips",
                  ]}
                />
              </div>
              <Note>
                Reports automatically combine daily and project records from the unified ledger
                while calculating balances separately for accurate payment tracking.
              </Note>
            </section>
          </main>
        </div>
      </div>

      {/* ── Responsive styles ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .g-body-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </>
  );
}