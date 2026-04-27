"use client";

import { useRef, useState, useEffect, useCallback } from "react";

type Props = {
  children: React.ReactNode;
  cardWidth?: number;
};

const FRICTION = 0.95;
const MIN_VELOCITY = 0.3;

export default function HorizontalScrollWithBar({ children, cardWidth = 272 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress]   = useState(0);
  const [showLeft, setShowLeft]   = useState(false);
  const [showRight, setShowRight] = useState(true);

  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);
  const velocity    = useRef(0);
  const lastX       = useRef(0);
  const lastT       = useRef(0);
  const rafId       = useRef<number | null>(null);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setShowLeft(el.scrollLeft > 8);
    setShowRight(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => { update(); }, [update]);

  const cancelMomentum = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const applyMomentum = () => {
    const el = ref.current;
    if (!el) return;
    if (Math.abs(velocity.current) < MIN_VELOCITY) {
      update();
      return;
    }
    el.scrollLeft += velocity.current;
    velocity.current *= FRICTION;
    update();
    rafId.current = requestAnimationFrame(applyMomentum);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    cancelMomentum();
    isDragging.current  = true;
    startX.current      = e.pageX - el.offsetLeft;
    scrollStart.current = el.scrollLeft;
    lastX.current       = e.pageX;
    lastT.current       = performance.now();
    velocity.current    = 0;
    el.style.cursor     = "grabbing";
    el.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = ref.current;
    if (!el) return;
    e.preventDefault();

    const now = performance.now();
    const dt  = now - lastT.current;
    if (dt > 0) {
      velocity.current = -(e.pageX - lastX.current) / dt * 12;
    }
    lastX.current = e.pageX;
    lastT.current = now;

    el.scrollLeft = scrollStart.current - (e.pageX - el.offsetLeft - startX.current);
  };

  const stopDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (ref.current) {
      ref.current.style.cursor     = "grab";
      ref.current.style.userSelect = "";
    }
    rafId.current = requestAnimationFrame(applyMomentum);
  };

  const shift = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      <div
        ref={ref}
        onScroll={update}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="scrollbar-none"
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "1rem",
          width: "100%",
          maxWidth: "100%",
          overflowX: "scroll",
          WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingBottom: "0.5rem",
          cursor: "grab",
        }}
      >
        {children}
      </div>

      {showLeft && (
        <button
          onClick={() => shift(-1)}
          aria-label="Scroll left"
          style={{
            position: "absolute", top: "50%", left: "0.25rem",
            transform: "translateY(-60%)", zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "2rem", height: "2rem", borderRadius: "9999px",
            border: "1px solid var(--color-border)", background: "white",
            cursor: "pointer", boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
            transition: "border-color 0.15s, color 0.15s",
            color: "var(--color-heading)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--color-accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--color-heading)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}

      {showRight && (
        <button
          onClick={() => shift(1)}
          aria-label="Scroll right"
          style={{
            position: "absolute", top: "50%", right: "0.25rem",
            transform: "translateY(-60%)", zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "2rem", height: "2rem", borderRadius: "9999px",
            border: "1px solid var(--color-border)", background: "white",
            cursor: "pointer", boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
            transition: "border-color 0.15s, color 0.15s",
            color: "var(--color-heading)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--color-accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--color-heading)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}

      <div style={{ paddingLeft: "2rem", paddingRight: "2rem", marginTop: "0.75rem" }}>
        <div style={{ width: "100%", height: "3px", background: "#E5E1DC", borderRadius: "9999px" }}>
          <div style={{ height: "100%", width: `${progress * 100}%`, background: "var(--color-accent)", borderRadius: "9999px", transition: "width 0.1s linear" }} />
        </div>
      </div>

    </div>
  );
}
