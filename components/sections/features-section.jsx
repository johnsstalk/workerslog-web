"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  WifiOff, Shield, Zap, BarChart2, CreditCard, Cloud,
  LayoutDashboard, FileText, FileOutput,
} from "lucide-react";

const CORE_FEATURES = [
  {
    Icon: WifiOff,
    title: "Works Without Internet",
    desc: "All data lives on your device. Mark attendance, record wages, and settle payments — even in areas with zero signal.",
  },
  {
    Icon: Shield,
    title: "AES-256 Encrypted",
    desc: "Your worker records and wages are encrypted on your phone. No one can read them — not even us.",
  },
  {
    Icon: Zap,
    title: "Instant Attendance",
    desc: "Mark attendance in one tap. Wages calculate automatically. See exact balances in seconds.",
  },
  {
    Icon: BarChart2,
    title: "Project Accounting",
    desc: "Track up to 1 project per worker (max 3 projects with 3 workers). Set rates and see what you owe.",
  },
  {
    Icon: CreditCard,
    title: "Settlement Tracking",
    desc: "Record advances, cash payments, and final settlements. The ledger updates automatically. No disputes.",
  },
  {
    Icon: LayoutDashboard,
    title: "Overview Dashboard",
    desc: "See daily and project-wise attendance, payments, and balances at a glance on dedicated pages.",
  },
];

const PRO_FEATURES = [
  {
    Icon: Cloud,
    title: "Cloud Backup",
    desc: "Auto-sync every 5 minutes. Switch phones easily with full data restore. Access from multiple devices.",
    isPro: true,
  },
  {
    Icon: FileText,
    title: "Salary Reports",
    desc: "Generate detailed worker salary slips with full attendance, wage, and project-wise breakdown.",
    isPro: true,
  },
  {
    Icon: FileOutput,
    title: "PDF Export",
    desc: "Export professional attendance sheets and salary reports as PDF. Share with workers or keep records.",
    isPro: true,
  },
];

function FeatureCard({ Icon, title, desc, isPro }) {
  const cardRef = useRef(null);
  const iconWrapRef = useRef(null);
  const iconRef = useRef(null);
  const shimmerRef = useRef(null);

  // HOVER ONLY (no entrance)
  useEffect(() => {
    const card = cardRef.current;
    const iconWrap = iconWrapRef.current;
    const icon = iconRef.current;
    if (!card) return;

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    const onEnter = () => {
      gsap.to(card, {
        y: -2,
        duration: 0.35,
        ease: "sine.out",
        overwrite: "auto",
      });
      if (iconWrap) {
        gsap.to(iconWrap, {
          backgroundColor: "rgba(173, 198, 255, 0.22)",
          duration: 0.3,
          ease: "sine.out",
        });
      }
      if (icon) {
        gsap.to(icon, {
          scale: 1.08,
          duration: 0.3,
          ease: "back.out(1.5)",
        });
      }
    };

    const onLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: "sine.out",
        overwrite: "auto",
      });
      if (iconWrap) {
        gsap.to(iconWrap, {
          backgroundColor: isPro
            ? "rgba(173, 198, 255, 0.12)"
            : "rgba(173, 198, 255, 0.08)",
          duration: 0.35,
          ease: "sine.out",
        });
      }
      if (icon) {
        gsap.to(icon, { scale: 1, duration: 0.35, ease: "sine.out" });
      }
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [isPro]);

  // Pro shimmer line (continuous, not entrance)
  useEffect(() => {
    const shimmer = shimmerRef.current;
    if (!shimmer || !isPro) return;

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    const tween = gsap.fromTo(
      shimmer,
      { x: "-100%" },
      {
        x: "100%",
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        repeatDelay: 1.5,
      }
    );
    return () => tween.kill();
  }, [isPro]);

  return (
    <div
      ref={cardRef}
      style={{
        position: "relative",
        background: "var(--color-surface-container)",
        border: isPro
          ? "1px solid rgba(173, 198, 255, 0.35)"
          : "1px solid var(--color-outline-variant)",
        borderRadius: "var(--radius-card)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        willChange: "transform",
      }}
    >
      {/* Pro shimmer line */}
      {isPro && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            ref={shimmerRef}
            style={{
              width: "60%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(173,198,255,0.7), transparent)",
            }}
          />
        </div>
      )}

      <div
        ref={iconWrapRef}
        style={{
          width: 44,
          height: 44,
          borderRadius: "var(--radius-s)",
          background: isPro
            ? "rgba(173, 198, 255, 0.12)"
            : "rgba(173, 198, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          willChange: "transform, background-color",
        }}
      >
        <div
          ref={iconRef}
          style={{ display: "inline-flex", willChange: "transform" }}
        >
          <Icon size={22} color="var(--color-primary)" strokeWidth={1.8} />
        </div>
      </div>

      <h3
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: "var(--color-on-surface)",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {title}
        {isPro && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
              background: "rgba(173, 198, 255, 0.12)",
              borderRadius: "var(--radius-xs)",
              padding: "2px 8px",
            }}
          >
            PRO
          </span>
        )}
      </h3>

      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          lineHeight: 1.65,
          color: "var(--color-on-surface-variant)",
          flex: 1,
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <>
      <section
        id="features"
        style={{ padding: "var(--space-3xl) var(--section-px)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                display: "inline-block",
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
              Features
            </span>
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: "var(--text-h1)",
                color: "var(--color-on-surface)",
                marginBottom: 16,
              }}
            >
              Everything you need.
              <br />
              Nothing you don&apos;t.
            </h2>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 17,
                color: "var(--color-on-surface-variant)",
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              Built for anyone who manages workers — track attendance, wages, dues, and project-wise earnings in a simple, practical way. No training needed.
            </p>
          </div>

          {/* Core Features */}
          <div style={{ marginBottom: 56 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--color-on-surface)",
                  margin: 0,
                }}
              >
                Core Features
              </h3>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--color-on-surface-variant)",
                  background: "var(--color-surface-container-high)",
                  padding: "2px 10px",
                  borderRadius: "var(--radius-xs)",
                }}
              >
                Free
              </span>
            </div>

            <div className="wl-features-grid">
              {CORE_FEATURES.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>

          {/* Pro Features */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--color-on-surface)",
                  margin: 0,
                }}
              >
                Pro Features
              </h3>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--color-primary)",
                  background: "rgba(173, 198, 255, 0.12)",
                  padding: "2px 10px",
                  borderRadius: "var(--radius-xs)",
                }}
              >
                Unlock with Pro
              </span>
            </div>

            <div className="wl-features-grid">
              {PRO_FEATURES.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .wl-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 900px) {
          .wl-features-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 560px) {
          .wl-features-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}