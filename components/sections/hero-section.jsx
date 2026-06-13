"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const phoneRef = useRef(null);
const phoneInnerRef = useRef(null);
const screenRef = useRef(null);

const statsRef = useRef(null);
const downloadBtnRef = useRef(null);
const pricingBtnRef = useRef(null);
const pricingArrowRef = useRef(null);

  // stats
  const stats = [
  { value: "100%",          label: "Offline capable" },
  { value: "AES-256",       label: "Encrypted locally" },
  { value: "₹0",            label: "To get started" },
  { value: "Multi-project", label: "Support enabled" },
];

  const screenshots = [
    "/screenshots/workerslist.png",
    "/screenshots/dailyledger.png",
    "/screenshots/workerproject.png",
  ];

  const [activeScreen, setActiveScreen] = useState(0);
  const [prevScreen, setPrevScreen] = useState(0);
  const userClickedRef = useRef(false);

  // FLOAT ANIMATION + MOUSE TILT (unchanged)
  useEffect(() => {
    const phone = phoneRef.current;
    const inner = phoneInnerRef.current;
    if (!phone || !inner) return;

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    const floatAnim = gsap.to(phone, {
      y: -14,
      duration: 2.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const onMove = (e) => {
      const rect = phone.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(inner, {
        rotateY: x * 14,
        rotateX: -y * 14,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1200,
        transformOrigin: "center center",
      });
    };
    const onLeave = () => {
      gsap.to(inner, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    phone.addEventListener("mousemove", onMove);
    phone.addEventListener("mouseleave", onLeave);

    return () => {
      floatAnim.kill();
      phone.removeEventListener("mousemove", onMove);
      phone.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // DOWNLOAD BUTTON HOVER (unchanged)
  useEffect(() => {
    const btn = downloadBtnRef.current;
    if (!btn) return;

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    const onEnter = () => {
      gsap.to(btn, { y: -2, duration: 0.18, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(btn, { y: 0, duration: 0.22, ease: "power2.out" });
    };
    const onDown = () => {
      gsap.to(btn, { y: 0, duration: 0.08, ease: "power2.out" });
    };
    const onUp = () => {
      gsap.to(btn, { y: -2, duration: 0.12, ease: "power2.out" });
    };

    btn.addEventListener("pointerenter", onEnter);
    btn.addEventListener("pointerleave", onLeave);
    btn.addEventListener("pointerdown", onDown);
    btn.addEventListener("pointerup", onUp);

    return () => {
      btn.removeEventListener("pointerenter", onEnter);
      btn.removeEventListener("pointerleave", onLeave);
      btn.removeEventListener("pointerdown", onDown);
      btn.removeEventListener("pointerup", onUp);
    };
  }, []);

  // PRICING BUTTON HOVER (unchanged)
  useEffect(() => {
    const btn = pricingBtnRef.current;
    const arrow = pricingArrowRef.current;
    if (!btn || !arrow) return;

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    const onEnter = () => {
      gsap.to(arrow, { x: 4, duration: 0.18, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(arrow, { x: 0, duration: 0.22, ease: "power2.out" });
    };

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // AUTO-ADVANCE PHONE SCREENS (unchanged)
  useEffect(() => {
    const id = setInterval(() => {
      if (userClickedRef.current) {
        userClickedRef.current = false;
        return;
      }
      setActiveScreen((prev) => {
  setPrevScreen(prev);
  return (prev + 1) % screenshots.length;
});
    }, 4000);

    return () => clearInterval(id);
  }, []);

  // SCREEN TRANSITION
useEffect(() => {
  if (!screenRef.current) return;

  gsap.fromTo(
    screenRef.current,
    {
      opacity: 0,
      scale: 1.02,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    }
  );
}, [activeScreen]);

  // STATS: subtle hover lift only (no value pop)
useEffect(() => {
  const container = statsRef.current;
  if (!container) return;

  const prefersReduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduce) return;

  const cleanups = [];
  Array.from(container.children).forEach((item) => {
    const onEnter = () => {
      gsap.to(item, {
        y: -1.5,            // ↓ was -3
        duration: 0.35,      // ↑ was 0.25 (slower = softer)
        ease: "sine.out",    // ↓ was power2.out (sine feels lighter)
        overwrite: "auto",
      });
    };
    const onLeave = () => {
      gsap.to(item, {
        y: 0,
        duration: 0.4,      // ↑ was 0.3
        ease: "sine.out",
        overwrite: "auto",
      });
    };

    item.addEventListener("mouseenter", onEnter);
    item.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      item.removeEventListener("mouseenter", onEnter);
      item.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}, []);

  const handleScreenClick = () => {
    userClickedRef.current = true;
    setActiveScreen((prev) => (prev + 1) % screenshots.length);
  };

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
          {/* <span
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
</span> */}

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
                ref={downloadBtnRef}
                href="#download"
                style={{
                  padding: "14px 28px",
                  borderRadius: "var(--radius-m)",
                  background: "var(--color-primary-brand)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(35,72,204,.18)",
                  willChange: "transform",
                }}
              >
                Download Free APK
              </a>

              <a
                ref={pricingBtnRef}
                href="#pricing"
                className="wl-link-underline"
                style={{
                  padding: "14px 28px",
                  borderRadius: "var(--radius-m)",
                  border: "1px solid var(--color-outline-variant)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--color-on-surface)",
                  fontFamily: "'Outfit', sans-serif",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                See Pricing
                <span
                  ref={pricingArrowRef}
                  style={{ display: "inline-block" }}
                >
                  →
                </span>
              </a>
            </div>

            {/* ← UPDATED: stats block with class hooks + animated bar */}
            <div
              ref={statsRef}
              style={{ display: "flex", gap: 36, flexWrap: "wrap" }}
            >
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  style={{
                    cursor: "default",
                    willChange: "transform",
                  }}
                >
                  <div
                    className="wl-stat-value"
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 800,
                      fontSize: 22,
                      color: "var(--color-primary)",
                      display: "inline-block",
                      transformOrigin: "left center",
                      willChange: "transform",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 13,
                      color: "var(--color-on-surface-variant)",
                      marginTop: 2,
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
              onClick={handleScreenClick}
              style={{
                width: 248,
                height: 550,
                position: "relative",
                cursor: "pointer",
                willChange: "transform",
              }}
            >
              <div
                ref={phoneInnerRef}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#111",
                  borderRadius: 40,
                  padding: 6,
                  position: "relative",
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
                  <div
  style={{
    position: "relative",
    width: "100%",
    height: "100%",
  }}
>
  {/* Previous */}
  <img
    src={screenshots[prevScreen]}
    alt=""
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "top",
    }}
  />

  {/* Current */}
  <img
  ref={screenRef}
  src={screenshots[activeScreen]}
  alt="app screen"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top",
  }}
/>
</div>
                </div>

                {/* screen indicators */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 6,
                    zIndex: 3,
                  }}
                >
                  {screenshots.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: i === activeScreen ? 18 : 6,
                        height: 6,
                        borderRadius: 999,
                        background:
                          i === activeScreen
                            ? "var(--color-primary)"
                            : "rgba(255,255,255,0.35)",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}