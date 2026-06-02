'use client';

import { useState } from "react";
import {
  WifiOff, Shield, Zap, BarChart2, CreditCard, Cloud,
  Check, X, Download, ChevronRight, Smartphone, Menu, XCircle
} from "lucide-react";

const S = {
  bg:       "#0C0C0D",
  surface:  "#111114",
  card:     "#16161A",
  border:   "#242430",
  orange:   "#F97316",
  orangeLo: "#1A1008",
  text:     "#F0F0F5",
  muted:    "#8A8A9A",
  dim:      "#50505F",
  green:    "#22C55E",
};

const sora = { fontFamily: "'Sora', sans-serif" };
const outfit = { fontFamily: "'Outfit', sans-serif" };

export default function WorkersLogSite() {
  const [nav, setNav] = useState(false);

  return (
    <div style={{ ...outfit, background: S.bg, color: S.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: rgba(249,115,22,0.3); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0C0C0D; }
        ::-webkit-scrollbar-thumb { background: #242430; border-radius: 3px; }

        .wl-nav-link { color: #8A8A9A; transition: color 0.2s; font-size: 14px; }
        .wl-nav-link:hover { color: #F0F0F5; }

        .wl-btn-orange {
          background: #F97316; color: white; border: none; cursor: pointer;
          padding: 11px 22px; border-radius: 8px; font-size: 14px; font-weight: 600;
          font-family: 'Outfit', sans-serif;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background 0.2s, transform 0.15s;
        }
        .wl-btn-orange:hover { background: #EA6910; transform: translateY(-1px); }

        .wl-btn-ghost {
          background: transparent; color: #F0F0F5;
          border: 1px solid #2A2A38; cursor: pointer;
          padding: 11px 22px; border-radius: 8px; font-size: 14px;
          font-family: 'Outfit', sans-serif;
          display: inline-flex; align-items: center; gap: 8px;
          transition: border-color 0.2s, background 0.2s;
        }
        .wl-btn-ghost:hover { border-color: #4A4A5A; background: #1A1A20; }

        .wl-card {
          background: #16161A; border: 1px solid #222230;
          border-radius: 14px; padding: 26px;
          transition: border-color 0.25s, transform 0.2s;
        }
        .wl-card:hover { border-color: rgba(249,115,22,0.35); transform: translateY(-2px); }

        .wl-feat-icon {
          width: 46px; height: 46px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
        }

        .wl-section { padding: 88px 24px; max-width: 1100px; margin: 0 auto; }

        .wl-feat-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
        }
        .wl-price-row {
          display: flex; gap: 22px; justify-content: center; align-items: flex-start; flex-wrap: wrap;
        }
        .wl-steps {
          display: flex; gap: 48px; justify-content: center;
        }
        .wl-hero-inner {
          display: flex; align-items: center; gap: 80px;
        }

        @media (max-width: 900px) {
          .wl-feat-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .wl-feat-grid { grid-template-columns: 1fr !important; }
          .wl-hero-inner { flex-direction: column !important; text-align: center; gap: 48px !important; }
          .wl-hero-btns { justify-content: center !important; }
          .wl-hero-stats { justify-content: center !important; }
          .wl-steps { flex-direction: column !important; align-items: center !important; }
          .wl-phone-wrap { display: none !important; }
          .wl-nav-links { display: none !important; }
          .wl-nav-ctas { display: none !important; }
          .wl-hamburger { display: flex !important; }
          .wl-footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
        }

        .wl-hamburger { display: none; cursor: pointer; background: none; border: none; color: #F0F0F5; }

        .wl-mobile-menu {
          position: fixed; inset: 0; background: rgba(12,12,13,0.97);
          z-index: 200; display: flex; flex-direction: column;
          padding: 24px; gap: 24px;
        }
        .wl-mobile-link {
          font-size: 22px; font-weight: 600; color: #F0F0F5;
          font-family: 'Sora', sans-serif; padding: 12px 0;
          border-bottom: 1px solid #22222A;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wl-fadein { animation: fadeUp 0.6s ease forwards; }

        .wl-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.25);
          border-radius: 100px; padding: 6px 14px;
          font-size: 12px; font-weight: 500; color: #F97316;
          margin-bottom: 28px;
        }
        .wl-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #F97316; display: inline-block;
        }

        .wl-tag {
          display: inline-block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #F97316; margin-bottom: 14px;
        }
      `}</style>

      {/* MOBILE MENU */}
      {nav && (
        <div className="wl-mobile-menu">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setNav(false)} style={{ background: "none", border: "none", color: S.text, cursor: "pointer" }}>
              <XCircle size={28} />
            </button>
          </div>
          {["Features", "Pricing", "Download"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="wl-mobile-link" onClick={() => setNav(false)}>{l}</a>
          ))}
          <button className="wl-btn-orange" style={{ marginTop: 16 }}>
            <Download size={15} /> Download Free
          </button>
        </div>
      )}

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(12,12,13,0.88)", backdropFilter: "blur(18px)",
        borderBottom: `1px solid ${S.border}`, padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: S.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>⚒️</div>
            <span style={{ ...sora, fontSize: 16, fontWeight: 700 }}>Workers<span style={{ color: S.orange }}>Log</span></span>
          </div>

          {/* Desktop links */}
          <div className="wl-nav-links" style={{ display: "flex", gap: 32 }}>
            {["Features", "Pricing", "Download"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="wl-nav-link">{l}</a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="wl-nav-ctas" style={{ display: "flex", gap: 10 }}>
            <button className="wl-btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }}>
              <Download size={13} /> Download APK
            </button>
            <button className="wl-btn-orange" style={{ padding: "8px 16px", fontSize: 13 }}>
              Get Pro
            </button>
          </div>

          {/* Hamburger */}
          <button className="wl-hamburger" onClick={() => setNav(true)}>
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        minHeight: "calc(100vh - 62px)",
        background: `radial-gradient(ellipse at 75% 40%, rgba(249,115,22,0.07) 0%, transparent 60%), ${S.bg}`,
        display: "flex", alignItems: "center",
        padding: "80px 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div className="wl-hero-inner wl-fadein">
            {/* LEFT */}
            <div style={{ flex: 1 }}>
              <div className="wl-badge">
                <span className="wl-dot" /> Version 1.0.6 · Android
              </div>

              <h1 style={{
                ...sora, fontSize: "clamp(36px, 5.5vw, 64px)",
                fontWeight: 800, lineHeight: 1.08,
                letterSpacing: "-0.03em", marginBottom: 22,
              }}>
                Track workers.<br />
                <span style={{ color: S.orange }}>Not paperwork.</span>
              </h1>

              <p style={{ fontSize: 17, lineHeight: 1.75, color: S.muted, marginBottom: 36, maxWidth: 440 }}>
                Offline-first attendance and wage tracking for construction contractors.
                Works without internet. AES-256 encrypted. Built for how India works.
              </p>

              <div className="wl-hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
                <button className="wl-btn-orange" style={{ padding: "13px 26px", fontSize: 15 }}>
                  <Download size={16} /> Download Free APK
                </button>
                <button className="wl-btn-ghost" style={{ padding: "13px 26px", fontSize: 15 }}>
                  See Pricing <ChevronRight size={16} />
                </button>
              </div>

              <div className="wl-hero-stats" style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
                {[["100%", "Offline capable"], ["AES-256", "Encrypted locally"], ["₹0", "To get started"]].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ ...sora, fontSize: 22, fontWeight: 700 }}>{v}</div>
                    <div style={{ fontSize: 12, color: S.dim, marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — phone mockup */}
            <div className="wl-phone-wrap" style={{ flexShrink: 0, position: "relative" }}>
              <div style={{
                position: "absolute", inset: -50,
                background: "radial-gradient(ellipse, rgba(249,115,22,0.13) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <div style={{
                width: 230, height: 450, borderRadius: 36,
                border: `2px solid ${S.border}`, background: S.card,
                position: "relative", overflow: "hidden",
                boxShadow: "0 0 60px rgba(249,115,22,0.12)",
              }}>
                {/* Notch */}
                <div style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 56, height: 5, borderRadius: 3, background: S.border }} />
                </div>
                {/* App bar */}
                <div style={{ padding: "10px 16px", borderBottom: `1px solid ${S.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ ...sora, fontSize: 10, color: S.orange, fontWeight: 700 }}>WORKERSLOG</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>June 2026</div>
                  </div>
                  <div style={{
                    fontSize: 10, background: "rgba(249,115,22,0.15)", color: S.orange,
                    padding: "3px 8px", borderRadius: 6, fontWeight: 600,
                  }}>SYNCED</div>
                </div>
                {/* Worker rows */}
                {[
                  { n: "Ramesh Kumar", r: "₹650/day", s: "P", sc: "#22C55E", sb: "rgba(34,197,94,0.1)" },
                  { n: "Sunil Thakur", r: "₹500/day", s: "H", sc: "#F97316", sb: "rgba(249,115,22,0.1)" },
                  { n: "Pappu Singh", r: "₹700/day", s: "P", sc: "#22C55E", sb: "rgba(34,197,94,0.1)" },
                  { n: "Manoj Yadav", r: "₹600/day", s: "A", sc: "#EF4444", sb: "rgba(239,68,68,0.1)" },
                ].map(w => (
                  <div key={w.n} style={{
                    padding: "9px 16px", borderBottom: `1px solid #1A1A20`,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>{w.n}</div>
                      <div style={{ fontSize: 10, color: S.dim, marginTop: 1 }}>{w.r}</div>
                    </div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: w.sc,
                      background: w.sb, padding: "3px 9px", borderRadius: 5,
                    }}>{w.s}</div>
                  </div>
                ))}
                {/* Balance card */}
                <div style={{ margin: "12px 12px 0", background: "#1C1C22", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ fontSize: 9, color: S.dim, marginBottom: 4 }}>TOTAL PENDING</div>
                  <div style={{ ...sora, fontSize: 20, fontWeight: 800, color: S.orange }}>₹12,450</div>
                  <div style={{ fontSize: 9, color: S.dim, marginTop: 3 }}>3 workers · Last paid 3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{ background: S.surface, borderTop: `1px solid ${S.border}`, borderBottom: `1px solid ${S.border}`, padding: "14px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px 40px" }}>
          {["🔒 AES-256 Encrypted", "📶 100% Offline Capable", "🇮🇳 Made for Indian Contractors", "☁️ Cloud Backup on Pro", "💳 UPI Payments Accepted"].map(item => (
            <span key={item} style={{ fontSize: 12, color: S.dim, fontWeight: 500 }}>{item}</span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div id="features" className="wl-section">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="wl-tag">Features</span>
          <h2 style={{ ...sora, fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 14 }}>
            Everything you need.<br />Nothing you don't.
          </h2>
          <p style={{ fontSize: 16, color: S.muted, maxWidth: 460, margin: "0 auto" }}>
            Built around how contractors actually work on-site. No training needed.
          </p>
        </div>

        <div className="wl-feat-grid">
          {[
            { icon: <WifiOff size={20} color="#F97316" />, bg: "rgba(249,115,22,0.1)", title: "Fully Offline", desc: "All data lives on your device. Mark attendance, record wages, and settle payments — even in areas with zero signal." },
            { icon: <Shield size={20} color="#60A5FA" />, bg: "rgba(96,165,250,0.1)", title: "AES-256 Encrypted", desc: "Your worker records and wages are encrypted on your phone. No one can read them — not even us." },
            { icon: <Zap size={20} color="#FBBF24" />, bg: "rgba(251,191,36,0.1)", title: "Instant Attendance", desc: "Mark P / H / A / OT in one tap. Wages calculated automatically. Check exact balance in seconds." },
            { icon: <BarChart2 size={20} color="#34D399" />, bg: "rgba(52,211,153,0.1)", title: "Project Accounting", desc: "Track contract work separately from daily labour. Set project rates, assign workers, see what you owe." },
            { icon: <CreditCard size={20} color="#A78BFA" />, bg: "rgba(167,139,250,0.1)", title: "Settlement Tracking", desc: "Record advances, cash payments, and final settlements. The ledger auto-updates. No disputes." },
            { icon: <Cloud size={20} color="#F97316" />, bg: "rgba(249,115,22,0.08)", title: "Cloud Backup (Pro)", desc: "Sync to secure cloud automatically. Switch phones without losing a single record. Restore in seconds." },
          ].map(f => (
            <div key={f.title} className="wl-card">
              <div className="wl-feat-icon" style={{ background: f.bg }}>{f.icon}</div>
              <h3 style={{ ...sora, fontSize: 15, fontWeight: 600, marginBottom: 9 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: S.muted, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: S.surface, borderTop: `1px solid ${S.border}`, borderBottom: `1px solid ${S.border}`, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="wl-tag">How it works</span>
            <h2 style={{ ...sora, fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 14 }}>
              Up and running in 3 minutes
            </h2>
            <p style={{ fontSize: 16, color: S.muted }}>No setup fee. No training. No paperwork.</p>
          </div>

          <div className="wl-steps">
            {[
              { n: "01", title: "Add your workers", desc: "Name, job category, daily rate. Takes under a minute per worker." },
              { n: "02", title: "Mark attendance daily", desc: "P / H / A / OT per worker. One tap each. Done in 60 seconds for 10 workers." },
              { n: "03", title: "Record & settle", desc: "Add advances and payments. Running balance auto-updates. No calculator needed." },
            ].map((step, i) => (
              <div key={step.n} style={{ flex: 1, maxWidth: 300, textAlign: "center" }}>
                <div style={{
                  width: 58, height: 58, borderRadius: "50%",
                  border: `2px solid ${S.orange}`,
                  background: "rgba(249,115,22,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <span style={{ ...sora, fontSize: 16, fontWeight: 700, color: S.orange }}>{step.n}</span>
                </div>
                <h3 style={{ ...sora, fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: S.muted, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" className="wl-section">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="wl-tag">Pricing</span>
          <h2 style={{ ...sora, fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 14 }}>
            Simple, honest pricing
          </h2>
          <p style={{ fontSize: 16, color: S.muted, maxWidth: 440, margin: "0 auto" }}>
            All core features are free forever. Pay only for cloud sync and Pro tools.
          </p>
        </div>

        <div className="wl-price-row">
          {/* FREE CARD */}
          <div style={{
            background: S.card, border: `1px solid ${S.border}`,
            borderRadius: 18, padding: "32px 28px", width: 320,
          }}>
            <div style={{ marginBottom: 26 }}>
              <div style={{ fontSize: 13, color: S.muted, marginBottom: 8, fontWeight: 500 }}>Free</div>
              <div style={{ ...sora, fontSize: 48, fontWeight: 800 }}>₹0</div>
              <div style={{ fontSize: 13, color: S.dim, marginTop: 5 }}>Forever free · No credit card</div>
            </div>
            <button className="wl-btn-ghost" style={{ width: "100%", justifyContent: "center", marginBottom: 28, padding: "12px" }}>
              <Download size={15} /> Download APK
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {[
                "Unlimited workers",
                "Daily attendance (P/H/A/OT)",
                "Settlement & payment entries",
                "Project accounting",
                "Balance & ledger view",
                "Local encrypted storage",
                "Works offline — no internet",
              ].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Check size={14} color={S.green} strokeWidth={2.5} />
                  <span style={{ fontSize: 14, color: S.muted }}>{f}</span>
                </div>
              ))}
              {["Cloud backup & sync", "Multi-device access", "PDF salary slip export", "Salary reports"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <X size={14} color="#30303A" strokeWidth={2.5} />
                  <span style={{ fontSize: 14, color: "#38383A" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PRO CARD */}
          <div style={{
            background: `linear-gradient(145deg, ${S.orangeLo} 0%, #16161A 100%)`,
            border: "1px solid rgba(249,115,22,0.38)",
            borderRadius: 18, padding: "32px 28px", width: 320,
            position: "relative",
            boxShadow: "0 0 70px rgba(249,115,22,0.09)",
          }}>
            <div style={{
              position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
              background: S.orange, color: "white", fontSize: 10, fontWeight: 800,
              padding: "4px 14px", borderRadius: 100, letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}>MOST POPULAR</div>
            <div style={{ marginBottom: 26 }}>
              <div style={{ fontSize: 13, color: S.orange, marginBottom: 8, fontWeight: 600 }}>Pro</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                <span style={{ ...sora, fontSize: 48, fontWeight: 800 }}>₹99</span>
                <span style={{ fontSize: 14, color: S.muted, paddingBottom: 10 }}>/month</span>
              </div>
              <div style={{ fontSize: 13, color: S.dim, marginTop: 5 }}>or ₹799/year · save 33%</div>
            </div>
            <button className="wl-btn-orange" style={{ width: "100%", justifyContent: "center", marginBottom: 28, padding: "12px" }}>
              Get Pro — Pay via UPI/Card
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ChevronRight size={14} color={S.orange} strokeWidth={2.5} />
                <span style={{ fontSize: 14, color: S.muted, fontStyle: "italic" }}>Everything in Free, plus:</span>
              </div>
              {[
                "Cloud backup & sync",
                "Multi-device access",
                "PDF salary slip export",
                "Salary reports",
                "Auto-sync every 5 minutes",
                "Restore on new phone",
              ].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Check size={14} color={S.orange} strokeWidth={2.5} />
                  <span style={{ fontSize: 14, color: S.text, fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: S.dim }}>
          Pay via UPI, card, or netbanking · Powered by Razorpay · Cancel anytime
        </p>
      </div>

      {/* DOWNLOAD CTA */}
      <div id="download" style={{
        background: `linear-gradient(135deg, #180F06 0%, ${S.surface} 100%)`,
        borderTop: "1px solid rgba(249,115,22,0.15)",
        padding: "88px 24px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <span className="wl-tag">Download</span>
          <h2 style={{ ...sora, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 16 }}>
            Start today.<br /><span style={{ color: S.orange }}>Always free.</span>
          </h2>
          <p style={{ fontSize: 16, color: S.muted, marginBottom: 36 }}>
            Download the APK directly or install from Google Play Store. No sign-up required for the free tier.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="wl-btn-orange" style={{ padding: "14px 28px", fontSize: 15 }}>
              <Download size={17} /> Download APK (v1.0.6)
            </button>
            <button className="wl-btn-ghost" style={{ padding: "14px 28px", fontSize: 15 }}>
              <Smartphone size={17} /> Google Play Store
            </button>
          </div>
          <p style={{ marginTop: 18, fontSize: 12, color: S.dim }}>Android 7.0 and above · ~15 MB</p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#080809", borderTop: `1px solid #1A1A20`, padding: "28px 24px" }}>
        <div className="wl-footer-inner" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: S.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>⚒️</div>
            <span style={{ ...sora, fontSize: 14, fontWeight: 600 }}>Workers<span style={{ color: S.orange }}>Log</span></span>
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: S.dim }}>
            <a href="#" style={{ color: S.dim, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = S.muted} onMouseLeave={e => e.target.style.color = S.dim}>Privacy Policy</a>
            <a href="#" style={{ color: S.dim, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = S.muted} onMouseLeave={e => e.target.style.color = S.dim}>Contact</a>
            <a href="#" style={{ color: S.dim, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = S.muted} onMouseLeave={e => e.target.style.color = S.dim}>Support</a>
          </div>
          <div style={{ fontSize: 12, color: "#2A2A35" }}>© 2026 WorkersLog · Made in India 🇮🇳</div>
        </div>
      </div>
    </div>
  );
}