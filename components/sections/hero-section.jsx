import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const phoneRef = useRef(null);

  const stats = [
    { value: "100%", label: "Offline capable" },
    { value: "AES-256", label: "Encrypted locally" },
    { value: "₹0", label: "To get started" },
    { value: "Multi-project", label: "Support enabled" },
  ];

  const screenshots = [
    "/screenshots/workerslist.png",
    "/screenshots/dailyledger.png",
    "/screenshots/workerproject.png",
  ];

  const [activeScreen, setActiveScreen] = useState(0);

  // FLOAT ANIMATION (kept)
  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;

    const floatAnim = gsap.to(el, {
      y: -14,
      duration: 2.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => floatAnim.kill();
  }, []);

  return (
    <>
      <section
        style={{
          padding: "var(--space-3xl) var(--section-px) 60px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          className="wl-hero-inner"
          style={{ display: "flex", alignItems: "center", gap: 56 }}
        >
          {/* ── LEFT CONTENT ── */}
          <div style={{ flex: "1 1 340px", minWidth: 280 }}>
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
                marginBottom: 24,
              }}
            >
              Version 1.0.6 · Android
            </span>

            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "var(--text-display)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "var(--color-on-surface)",
                marginBottom: 20,
              }}
            >
              Manage Your Workforce Smarter.
              <br />
              <span style={{ color: "var(--color-primary)" }}>
                Not paperwork.
              </span>
            </h1>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--color-on-surface-variant)",
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              Track attendance, wages, dues, and project-wise earnings for every
              worker you manage—all in one place.
            </p>

            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 44,
              }}
            >
              <a
                href="#download"
                style={{
                  padding: "14px 28px",
                  borderRadius: "var(--radius-m)",
                  background: "var(--color-primary-brand)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Download Free APK
              </a>

              <a
                href="#pricing"
                style={{
                  padding: "14px 28px",
                  borderRadius: "var(--radius-m)",
                  border: "1px solid var(--color-outline-variant)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--color-on-surface)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                See Pricing →
              </a>
            </div>

            <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 800,
                      fontSize: 22,
                      color: "var(--color-primary)",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 13,
                      color: "var(--color-on-surface-variant)",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: SINGLE PHONE MOCKUP ── */}
          <div
            className="wl-hero-phone"
            style={{
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "center",
              perspective: 1200,
            }}
          >
            <div
              ref={phoneRef}
              onClick={() =>
                setActiveScreen((prev) => (prev + 1) % screenshots.length)
              }
              style={{
                width: 248,
                height: 550,
                background: "#111",
                borderRadius: 40,
                padding: 6,
                position: "relative",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                willChange: "transform",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px var(--color-outline-variant)",
              }}
            >
              {/* notch */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 72,
                  height: 20,
                  background: "#111",
                  borderRadius: "999px",
                  zIndex: 2,
                }}
              />

              {/* SCREEN */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 35,
                  overflow: "hidden",
                }}
              >
                <img
                  key={activeScreen}
                  src={screenshots[activeScreen]}
                  alt="app screen"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    animation: "fadeIn 0.35s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMATION + MOBILE FIX */}
      <style>{`
        @media (max-width: 840px) {
          .wl-hero-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .wl-hero-phone {
            display: none;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}