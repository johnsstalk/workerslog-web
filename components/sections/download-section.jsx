"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Download, Play, Smartphone, HardDrive, Clock } from "lucide-react";

function DownloadButton({ href, primary, icon: Icon, children, external }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    const onEnter = () => {
      gsap.to(btn, { y: -2, duration: 0.3, ease: "sine.out", overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to(btn, { y: 0, duration: 0.35, ease: "sine.out", overwrite: "auto" });
    };

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={typeof children === "string" ? children : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 28px",
        borderRadius: "var(--radius-m)",
        background: primary ? "var(--color-primary-brand)" : "transparent",
        border: primary
          ? "none"
          : "1px solid var(--color-outline-variant)",
        fontSize: 15,
        fontWeight: 600,
        color: primary ? "#FFFFFF" : "var(--color-on-surface)",
        fontFamily: "'Outfit', sans-serif",
        textDecoration: "none",
        willChange: "transform",
        boxShadow: primary ? "0 4px 12px rgba(35,72,204,0.18)" : "none",
        cursor: "pointer",
      }}
    >
      <Icon size={18} strokeWidth={2.2} />
      {children}
    </a>
  );
}

export default function DownloadSection() {
  return (
    <>
      <section
        id="download"
        style={{
          background: "var(--color-surface)",
          padding: "var(--space-3xl) var(--section-px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient accent strip at top (static) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            maxWidth: 400,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(173,198,255,0.5), transparent)",
          }}
        />

        <div style={{ maxWidth: 600, margin: "0 auto" }}>
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
            Download
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
            Start today. Try it out for free.
          </h2>

          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--color-on-surface-variant)",
              marginBottom: 40,
            }}
          >
            Install it from the Google Play Store or download the APK directly.
            Try out the free tier.
          </p>

          <div
            className="wl-dl-btns"
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <DownloadButton href="#" primary icon={Download}>
              Download APK · v1.0.6
            </DownloadButton>
            <DownloadButton href="#" icon={Play} external>
              Google Play Store
            </DownloadButton>
          </div>

          <div
            className="wl-dl-meta"
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              fontFamily: "'Outfit', sans-serif",
              fontSize: 13,
              color: "var(--color-outline)",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Smartphone size={13} strokeWidth={2} />
              Android 7.0+
            </span>
            <span
              aria-hidden="true"
              className="wl-dl-meta-dot"
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "var(--color-outline-variant)",
                flexShrink: 0,
              }}
            />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <HardDrive size={13} strokeWidth={2} />
              ~54 MB
            </span>
            <span
              aria-hidden="true"
              className="wl-dl-meta-dot"
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "var(--color-outline-variant)",
                flexShrink: 0,
              }}
            />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Clock size={13} strokeWidth={2} />
              Updated June 13, 2026
            </span>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 480px) {
          .wl-dl-btns {
            flex-direction: column;
            align-items: stretch;
          }
          .wl-dl-btns a {
            width: 100%;
            justify-content: center;
          }
          .wl-dl-meta {
            gap: 8px !important;
            font-size: 12px !important;
          }
          .wl-dl-meta-dot {
            display: none;
          }
        }
      `}</style>
    </>
  );
}