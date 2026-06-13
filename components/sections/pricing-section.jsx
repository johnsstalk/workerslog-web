"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Check, X, Sparkles } from "lucide-react";

const BASIC_FEATURES = [
  "Up to 3 workers",
  "Daily attendance (P/H/A/OT/PH)",
  "Settlement and payment entries",
  "1 project per worker",
  "Balance and ledger view",
  "Local encrypted storage",
  "Works offline — no internet needed",
];

const LOCKED_FEATURES = [
  "Cloud backup and sync",
  "Multi-device access",
  "PDF salary slip export",
  "Salary reports",
];

const PRO_FEATURES = [
  "Unlimited workers",
  "Daily attendance (P/H/A/OT/PH)",
  "Settlement and payment entries",
  "Unlimited projects per worker",
  "Balance and ledger view",
  "Local encrypted storage",
  "Works offline — no internet needed",
  "Cloud backup and sync",
  "Multi-device access",
  "PDF salary slip export",
  "Salary reports",
  "Auto-sync every 5 minutes",
  "Restore on new phone",
];

function FeatureLine({ label, locked }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 0",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 18,
          height: 18,
          borderRadius: "50%",
          flexShrink: 0,
          background: locked ? "transparent" : "rgba(109, 213, 140, 0.15)",
          color: locked ? "var(--color-outline)" : "var(--color-success)",
          border: locked ? "1px solid var(--color-outline-variant)" : "none",
        }}
      >
        {locked ? <X size={10} strokeWidth={2.5} /> : <Check size={11} strokeWidth={3} />}
      </span>
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          color: locked
            ? "var(--color-outline)"
            : "var(--color-on-surface-variant)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function PriceCard({
  name,
  price,
  period,
  subline,
  features,
  lockedFeatures,
  cta,
  isPro,
  showBadge,
  savingChip,
}) {
  const cardRef = useRef(null);
  const ctaRef = useRef(null);
  const glowRef = useRef(null);

  // HOVER ONLY (no entrance)
  useEffect(() => {
    const card = cardRef.current;
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
      if (isPro && glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.35,
          duration: 0.35,
          ease: "sine.out",
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
      if (isPro && glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.15,
          duration: 0.4,
          ease: "sine.out",
        });
      }
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [isPro]);

  // Pro glow breathing (continuous, not entrance)
  useEffect(() => {
    if (!isPro || !glowRef.current) return;
    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    const tween = gsap.to(glowRef.current, {
      opacity: 0.28,
      duration: 2.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => tween.kill();
  }, [isPro]);

  // CTA hover (user-initiated, kept)
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    const onEnter = () => {
      gsap.to(btn, { y: -1.5, duration: 0.3, ease: "sine.out" });
    };
    const onLeave = () => {
      gsap.to(btn, { y: 0, duration: 0.35, ease: "sine.out" });
    };
    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        position: "relative",
        background: "var(--color-surface-container)",
        border: "1px solid var(--color-outline-variant)",
        borderRadius: "var(--radius-xl)",
        padding: "32px",
        willChange: "transform",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Pro glow halo (continuous breathing) */}
      {isPro && (
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: "var(--radius-xl)",
            background:
              "linear-gradient(135deg, rgba(173,198,255,0.4), rgba(35,72,204,0.25))",
            opacity: 0.15,
            zIndex: -1,
            filter: "blur(14px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Pro accent border */}
      {isPro && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "var(--radius-xl)",
            border: "1.5px solid var(--color-primary)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Most Popular badge */}
      {showBadge && (
        <div
          style={{
            position: "absolute",
            top: -12,
            right: 24,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: "var(--color-primary-brand)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            padding: "5px 12px",
            borderRadius: "var(--radius-full)",
            boxShadow: "0 4px 12px rgba(35,72,204,0.3)",
            fontFamily: "'Sora', sans-serif",
          }}
        >
          <Sparkles size={11} strokeWidth={2.5} />
          Most Popular
        </div>
      )}

      <p
        style={{
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: "var(--color-on-surface)",
          marginBottom: 8,
        }}
      >
        {name}
      </p>

      <div
        style={{
          marginBottom: 4,
          display: "flex",
          alignItems: "baseline",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
            fontSize: 36,
            color: "var(--color-on-surface)",
            display: "inline-block",
          }}
        >
          {price}
        </span>
        {period && (
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15,
              color: "var(--color-on-surface-variant)",
            }}
          >
            {period}
          </span>
        )}
      </div>

      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 13,
          color: isPro ? "var(--color-primary)" : "var(--color-on-surface-variant)",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {subline}
        {savingChip && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--color-primary)",
              background: "rgba(173, 198, 255, 0.12)",
              border: "1px solid rgba(173, 198, 255, 0.3)",
              borderRadius: "var(--radius-xs)",
              padding: "2px 8px",
            }}
          >
            {savingChip}
          </span>
        )}
      </p>

      <div
        style={{
          borderTop: "1px solid var(--color-outline-variant)",
          paddingTop: 20,
          marginBottom: 28,
        }}
      >
        {features.map((f) => (
          <FeatureLine key={f} label={f} />
        ))}
        {lockedFeatures &&
          lockedFeatures.map((f) => (
            <FeatureLine key={f} label={f} locked />
          ))}
      </div>

      <a
        ref={ctaRef}
        href="#download"
        style={{
          display: "block",
          textAlign: "center",
          padding: "13px",
          borderRadius: "var(--radius-m)",
          background: isPro
            ? "var(--color-primary-brand)"
            : "transparent",
          border: isPro
            ? "none"
            : "1px solid var(--color-outline-variant)",
          fontSize: 15,
          fontWeight: 600,
          color: isPro ? "#FFFFFF" : "var(--color-on-surface)",
          fontFamily: "'Outfit', sans-serif",
          textDecoration: "none",
          willChange: "transform",
          boxShadow: isPro ? "0 4px 12px rgba(35,72,204,0.18)" : "none",
        }}
      >
        {cta}
      </a>

      {isPro && (
        <p
          style={{
            textAlign: "center",
            marginTop: 12,
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            color: "var(--color-outline)",
          }}
        >
          Pay via UPI, card, or netbanking · Cancel anytime
        </p>
      )}
    </div>
  );
}

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");
  const toggleRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
  if (!indicatorRef.current) return;

  gsap.fromTo(
    indicatorRef.current,
    {
      scale: 0.95,
    },
    {
      x: billing === "monthly" ? 0 : "100%",
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.4)",
    }
  );
}, [billing]);

  const isYearly = billing === "yearly";
  const proPrice = isYearly ? "₹799" : "₹99";
  const proPeriod = isYearly ? "/year" : "/month";
  const proSub = isYearly
    ? "Billed yearly · best value"
    : "or ₹799/year";
  const savingChip = !isYearly ? "Save 33%" : null;

  return (
    <>
      <section
        id="pricing"
        style={{ padding: "var(--space-3xl) var(--section-px)" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
              Pricing
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
              Simple, honest pricing
            </h2>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 17,
                color: "var(--color-on-surface-variant)",
                marginBottom: 24,
              }}
            >
              All basic features are free. Pay only for cloud sync and Pro features.
            </p>

            {/* Monthly / Yearly toggle (user-initiated, not entrance) */}
            <div
  ref={toggleRef}
  role="tablist"
  aria-label="Billing period"
  style={{
    position: "relative",
    display: "inline-flex",
    width: 220,
    background: "var(--color-surface-container)",
    border: "1px solid var(--color-outline-variant)",
    borderRadius: "999px",
    padding: 4,
    overflow: "hidden",
  }}
>
  {/* Sliding Indicator */}
  <div
    ref={indicatorRef}
    style={{
      position: "absolute",
      top: 4,
      left: 4,
      width: "calc(50% - 4px)",
      height: "calc(100% - 8px)",
      background: "var(--color-primary-brand)",
      borderRadius: "999px",
      zIndex: 0,
      boxShadow: "0 4px 12px rgba(35,72,204,0.2)",
    }}
  />

  {["monthly", "yearly"].map((opt) => (
    <button
      key={opt}
      role="tab"
      aria-selected={billing === opt}
      onClick={() => setBilling(opt)}
      style={{
        flex: 1,
        position: "relative",
        zIndex: 1,
        padding: "10px 20px",
        border: "none",
        background: "transparent",
        color:
          billing === opt
            ? "#fff"
            : "var(--color-on-surface-variant)",
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "'Sora', sans-serif",
        cursor: "pointer",
        transition: "color 0.25s ease",
      }}
    >
      {opt === "monthly" ? "Monthly" : "Yearly"}
    </button>
  ))}
</div>
          </div>

          <div className="wl-pricing-grid">
            <PriceCard
              name="Basic"
              price="₹0"
              period=""
              subline="Free · No credit card"
              features={BASIC_FEATURES}
              lockedFeatures={LOCKED_FEATURES}
              cta="Download APK"
              isPro={false}
              showBadge={false}
            />
            <PriceCard
              name="Pro"
              price={proPrice}
              period={proPeriod}
              subline={proSub}
              savingChip={savingChip}
              features={PRO_FEATURES}
              cta="Upgrade to Pro"
              isPro={true}
              showBadge={true}
            />
          </div>
        </div>
      </section>

      <style>{`
        .wl-pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 680px) {
          .wl-pricing-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}