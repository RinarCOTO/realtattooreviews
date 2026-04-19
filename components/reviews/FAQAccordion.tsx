"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ borderTop: "1px solid var(--line)" }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: "100%",
              padding: "24px 0",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 24,
              border: "none",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
              color: "var(--ink)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "baseline",
                flex: 1,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "var(--muted)",
                  flexShrink: 0,
                }}
              >
                Q.{String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.25,
                  letterSpacing: "-0.015em",
                  flex: 1,
                }}
              >
                {item.q}
              </span>
            </div>
            <span
              style={{
                fontSize: 22,
                color: "var(--accent)",
                transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform .2s ease",
                width: 24,
                textAlign: "center",
                lineHeight: "1",
                flexShrink: 0,
              }}
            >
              +
            </span>
          </button>
          <div
            style={{
              maxHeight: open === i ? 400 : 0,
              overflow: "hidden",
              transition: "max-height .3s ease, opacity .2s ease",
              opacity: open === i ? 1 : 0,
            }}
          >
            <div
              style={{
                paddingLeft: "calc(20px + 7ch)",
                paddingRight: 48,
                paddingBottom: 24,
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: 720,
              }}
            >
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
