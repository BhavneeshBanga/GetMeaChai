"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ────────────────────────────────────────────────────────────────
//  Apni images aur unke saath dikhne wale text yahan set karo
// ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    line1: "Where",
    line2: "podcasts grow",
    creatorName: "Ellis Ever After",
    creatorDesc: "is building a family podcasting empire",
    creatorAvatar: "/avatar1.jpg",
  },
  {
    image:   "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80",
    line1: "From you",
    line2: "to your crew",
    creatorName: "Elliott Wilson",
    creatorDesc: "is building community around hip-hop journalism",
    creatorAvatar: "/avatar2.jpg",
  },
  {
    image:   "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
    line1: "Make it",
    line2: "making art",
    creatorName: "RossDraws",
    creatorDesc: "is creating, sharing, and teaching the art of worldbuilding",
    creatorAvatar: "/avatar3.jpg",
  },
];

const DISK_SIZE = 240; // px

export default function CursorReveal() {
  const containerRef    = useRef(null);
  const diskRef         = useRef(null);   // outer disk wrapper (moves with cursor)
  const diskImgRef      = useRef(null);   // next image inside disk
  const revealLayerRef  = useRef(null);   // full-screen reveal layer on click
  const mousePos        = useRef({ x: -999, y: -999 });
  const diskPos         = useRef({ x: -999, y: -999 });
  const rafId           = useRef(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx,    setNextIdx]    = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visible,     setVisible]     = useState(false); // disk visibility

  const current = SLIDES[currentIdx];
  const next    = SLIDES[nextIdx];

  // ── Lerp smooth follow ──────────────────────────────────────────
  const lerp = (a, b, t) => a + (b - a) * t;

  const tick = useCallback(() => {
    diskPos.current.x = lerp(diskPos.current.x, mousePos.current.x, 0.1);
    diskPos.current.y = lerp(diskPos.current.y, mousePos.current.y, 0.1);

    if (diskRef.current) {
      diskRef.current.style.transform =
        `translate(${diskPos.current.x}px, ${diskPos.current.y}px) translate(-50%, -50%)`;
    }

    // ── Disk ke andar image ko COUNTER-offset karna ──────────────
    // Disk move karta hai, lekin uske andar ki image screen ke
    // saath fixed rehni chahiye (jaise Patreon mein dikhta hai).
    // Trick: image ko disk ke opposite direction mein utna hi move karo.
    // Result: image screen-space mein still dikhti hai, disk sirf window hai.
    if (diskImgRef.current) {
      diskImgRef.current.style.transform =
        `translate(${-diskPos.current.x + window.innerWidth  / 2 - DISK_SIZE / 2}px,
                   ${-diskPos.current.y + window.innerHeight / 2 - DISK_SIZE / 2}px)`;
    }

    rafId.current = requestAnimationFrame(tick);
  }, []);

  // ── Mouse events ────────────────────────────────────────────────
  const onMouseMove = useCallback((e) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mousePos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    setVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => setVisible(false), []);

  // ── Click reveal ────────────────────────────────────────────────
  const onMouseClick = useCallback((e) => {
    if (isAnimating) return;
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;

    const px = ((e.clientX - r.left) / r.width)  * 100;
    const py = ((e.clientY - r.top)  / r.height) * 100;

    setIsAnimating(true);

    const layer = revealLayerRef.current;
    if (layer) {
      layer.style.transition = "none";
      layer.style.clipPath   = `circle(0% at ${px}% ${py}%)`;

      requestAnimationFrame(() => requestAnimationFrame(() => {
        layer.style.transition = "clip-path 1s cubic-bezier(0.76, 0, 0.24, 1)";
        layer.style.clipPath   = `circle(150% at ${px}% ${py}%)`;
      }));
    }

    setTimeout(() => {
      setCurrentIdx(nextIdx);
      setNextIdx(i => (i + 1) % SLIDES.length);
      setIsAnimating(false);
      if (layer) {
        layer.style.transition = "none";
        layer.style.clipPath   = "circle(150% at 50% 50%)";
      }
    }, 1050);
  }, [isAnimating, nextIdx]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    rafId.current = requestAnimationFrame(tick);
    el.addEventListener("mousemove",  onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("click",      onMouseClick);
    return () => {
      cancelAnimationFrame(rafId.current);
      el.removeEventListener("mousemove",  onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("click",      onMouseClick);
    };
  }, [tick, onMouseMove, onMouseLeave, onMouseClick]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        cursor: "none",
        userSelect: "none",
        backgroundColor: "#111",
      }}
    >
      {/* ═══ LAYER 1 — Current image, FULL BRIGHTNESS ════════════════ */}
      <img
        src={current.image}
        alt=""
        draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      {/* ═══ LAYER 2 — Next image, reveals on click ══════════════════
          clip-path starts at 0% and expands to 150% on click        */}
      <img
        ref={revealLayerRef}
        src={next.image}
        alt=""
        draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          clipPath: "circle(0% at 50% 50%)",
          pointerEvents: "none",
        }}
      />

      {/* ═══ DISK — circular lens showing next image ══════════════════
          
          Structure:
          ┌────────────────────────────────┐
          │  outer div (moves w/ cursor)   │
          │  ┌──────────────────────────┐  │
          │  │ overflow:hidden circle   │  │
          │  │  ┌────────────────────┐  │  │
          │  │  │  next image        │  │  │
          │  │  │  (counter-offset   │  │  │
          │  │  │   so it looks      │  │  │
          │  │  │   screen-fixed)    │  │  │
          │  │  └────────────────────┘  │  │
          │  └──────────────────────────┘  │
          │  center arrow overlay          │
          └────────────────────────────────┘
      */}
      <div
        ref={diskRef}
        style={{
          position: "absolute",
          top: 0, left: 0,
          width:  `${DISK_SIZE}px`,
          height: `${DISK_SIZE}px`,
          pointerEvents: "none",
          zIndex: 50,
          willChange: "transform",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        {/* Circular clipping container */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          overflow: "hidden",
          // Subtle border so disk edge is visible against current image
          outline: "2px solid rgba(255,255,255,0.25)",
        }}>
          {/* Next image — counter-offset so it appears screen-fixed */}
          <img
            ref={diskImgRef}
            src={next.image}
            alt=""
            draggable={false}
            style={{
              position: "absolute",
              // Make it big enough to always cover the disk
              width: "100vw",
              height: "100vh",
              maxWidth: "none",
              objectFit: "cover",
              // Initial transform; JS will keep updating this
              transform: `translate(${window.innerWidth/2  - DISK_SIZE/2}px,
                                    ${window.innerHeight/2 - DISK_SIZE/2}px)`,
              willChange: "transform",
            }}
          />
        </div>

        {/* Arrow icon in center */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2,
        }}>
          <div style={{
            width: "38px", height: "38px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.30)",
            backdropFilter: "blur(6px)",
            border: "1.5px solid rgba(255,255,255,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
            fontSize: "18px",
            lineHeight: 1,
            paddingLeft: "2px", // optical center for ›
          }}>
            ›
          </div>
        </div>
      </div>

      {/* ═══ BIG TYPOGRAPHY ══════════════════════════════════════════ */}
      <div style={{
        position: "absolute",
        bottom: "80px",
        left: 0, right: 0,
        padding: "0 48px",
        pointerEvents: "none",
        zIndex: 10,
        color: "#fff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontWeight: 300,
      }}>
        <div style={{ fontSize: "clamp(48px, 8vw, 110px)", lineHeight: 1.05 }}>
          {current.line1}
        </div>
        <div style={{ fontSize: "clamp(48px, 8vw, 110px)", lineHeight: 1.05, paddingLeft: "30%" }}>
          {current.line2}
        </div>
      </div>

      {/* ═══ CREATOR CARD (bottom right) ═════════════════════════════ */}
      <div style={{
        position: "absolute",
        bottom: "80px", right: "48px",
        display: "flex", alignItems: "center", gap: "14px",
        zIndex: 10,
        pointerEvents: "none",
      }}>
        <img
          src={current.creatorAvatar}
          alt=""
          style={{
            width: "56px", height: "56px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid rgba(255,255,255,0.4)",
          }}
        />
        <div style={{ color: "#fff", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          <span style={{ fontWeight: 600, fontSize: "15px" }}>{current.creatorName} </span>
          <span style={{ fontWeight: 300, fontSize: "15px" }}>{current.creatorDesc}</span>
          <span style={{ marginLeft: "6px", fontSize: "15px" }}>→</span>
        </div>
      </div>

      {/* ═══ DOWN ARROW (bottom left) ════════════════════════════════ */}
      <div style={{
        position: "absolute",
        bottom: "36px", left: "48px",
        color: "#fff", fontSize: "28px",
        zIndex: 10, pointerEvents: "none",
        opacity: 0.8,
      }}>
        ↓
      </div>
    </div>
  );
}