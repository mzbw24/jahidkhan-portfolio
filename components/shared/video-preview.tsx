"use client";

import { useEffect, useRef, useState } from "react";

export function VideoPreview({
  src,
  type = "video/mp4",
  title,
  aspectRatio = "16 / 9",
}: {
  src: string;
  type?: string;
  title: string;
  aspectRatio?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden bg-navy"
      style={{ aspectRatio }}
    >
      {active ? (
        <video
          muted
          playsInline
          preload="metadata"
          aria-label={title}
          className="absolute inset-0 h-full w-full object-contain"
        >
          <source src={src} type={type} />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/.42),transparent_34%),linear-gradient(135deg,hsl(var(--navy)),hsl(var(--navy-soft)))]"
          aria-hidden="true"
        />
      )}
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
