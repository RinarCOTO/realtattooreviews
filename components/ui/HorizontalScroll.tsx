"use client";

import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function HorizontalScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
    if (!ref.current) return;
    setIsDragging(true);
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.style.cursor = "grabbing";
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    ref.current.scrollLeft = scrollLeft.current - walk;
  }

  function onMouseUp() {
    setIsDragging(false);
    if (ref.current) ref.current.style.cursor = "grab";
  }

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className={`flex items-stretch gap-4 overflow-x-scroll pb-4 scrollbar-thin select-none cursor-grab ${className}`}
    >
      {children}
    </div>
  );
}
