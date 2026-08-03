"use client";
import Image from "next/image";
import { useState, useEffect, useRef, type ReactNode } from "react";

// Drag the divider to wipe between the "before" (left) and "after" (right) photos.
// Works with mouse, touch, and keyboard. touch-action: pan-y keeps vertical scroll working.
function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  label,
}: {
  beforeSrc: string;
  afterSrc: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(55);
  const [touched, setTouched] = useState(false);

  const moveTo = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(0, Math.min(100, p));
    setPos(p);
  };

  return (
    <div
      ref={ref}
      className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg select-none"
      style={{ touchAction: "pan-y", cursor: "ew-resize", WebkitTapHighlightColor: "transparent" }}
      role="slider"
      tabIndex={0}
      aria-label={`Before and after slider: ${label}`}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      onPointerDown={(e) => {
        dragging.current = true;
        setTouched(true);
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) moveTo(e.clientX);
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
      }}
      onPointerCancel={() => { dragging.current = false; }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { setTouched(true); setPos((p) => Math.max(0, p - 4)); }
        if (e.key === "ArrowRight") { setTouched(true); setPos((p) => Math.min(100, p + 4)); }
      }}
    >
      {/* AFTER — base layer */}
      <Image
        src={afterSrc}
        alt={`After – ${label}`}
        fill
        sizes="(max-width: 640px) 96vw, (max-width: 768px) 48vw, 32vw"
        className="object-cover pointer-events-none"
        style={{ objectFit: "cover" }}
        draggable={false}
      />

      {/* BEFORE — clipped to the left of the divider */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={`Before – ${label}`}
          fill
          sizes="(max-width: 640px) 96vw, (max-width: 768px) 48vw, 32vw"
          className="object-cover"
          style={{ objectFit: "cover" }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
        <span className="bg-red-600 text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wide">Before</span>
      </div>
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
        <span className="bg-green-500 text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wide">After</span>
      </div>

      {/* Title */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap pointer-events-none">
        {label}
      </div>

      {/* Divider + grab handle */}
      <div
        className="absolute inset-y-0 z-20 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-0.5 h-full bg-white shadow-[0_0_10px_2px_rgba(0,0,0,0.4)] mx-auto" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0f1f3d] font-extrabold text-sm">
          ⇆
        </div>
      </div>

      {/* One-time hint */}
      {!touched && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/60 text-white text-[11px] font-semibold px-3 py-1 rounded-full pointer-events-none animate-pulse">
          ⇆ Drag to reveal
        </div>
      )}
    </div>
  );
}

// Short clip of a real job. Compressed for the web so it loads + autoplays fast.
function VideoHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const fgRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vids = [bgRef.current, fgRef.current].filter(Boolean) as HTMLVideoElement[];
    const playAll = () => vids.forEach((v) => { const p = v.play(); if (p) p.catch(() => {}); });
    playAll();
    const el = wrapRef.current;
    const obs = el
      ? new IntersectionObserver(
          (entries) => { for (const e of entries) if (e.isIntersecting) playAll(); },
          { threshold: 0.1 }
        )
      : undefined;
    if (el && obs) obs.observe(el);
    const onVis = () => { if (!document.hidden) playAll(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { obs?.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-xs sm:max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl aspect-square">
      <video
        ref={bgRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "blur(20px) brightness(0.5)", transform: "scale(1.15)" }}
        autoPlay muted loop playsInline preload="auto" poster="/video-poster.jpg"
      >
        <source src="/pw-clip.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-y-0 left-0 z-10 w-12 sm:w-16 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-10 w-12 sm:w-16 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
      <video
        ref={fgRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 80%" }}
        autoPlay muted loop playsInline preload="auto" poster="/video-poster.jpg"
      >
        <source src="/pw-clip.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white font-extrabold text-sm sm:text-base drop-shadow">512 Pressure Washing — In Action</p>
        <p className="text-gray-300 text-xs">Georgetown, TX</p>
      </div>
    </div>
  );
}

// Slides its child in from the left or right edge when it scrolls into view.
function RevealOnScroll({
  from,
  delay = 0,
  children,
}: {
  from: "left" | "right";
  delay?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect users who prefer reduced motion — show instantly, no slide.
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: shown
          ? "translateX(0)"
          : `translateX(${from === "left" ? "-90px" : "90px"})`,
        opacity: shown ? 1 : 0,
        transition: `transform 1400ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 1400ms ease ${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#f7f7f7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f3d] mb-3">Before &amp; After</h2>
          <div className="w-16 h-1 bg-[#2e7fd6] mx-auto mb-4 rounded" />
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Real results from real Georgetown-area jobs. <span className="font-semibold text-[#0f1f3d]">Drag the sliders</span> to see the difference.
          </p>
        </div>
        <div className="flex justify-center mb-8"><VideoHero /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
          <RevealOnScroll from="left" delay={0}>
            <BeforeAfterSlider beforeSrc="/deck-before.jpeg" afterSrc="/deck-after.jpeg" label="Deck &amp; Patio Cleaning" />
          </RevealOnScroll>
          <RevealOnScroll from="right" delay={150}>
            <BeforeAfterSlider beforeSrc="/driveway-new-before.jpeg" afterSrc="/driveway-new-after.jpeg" label="Driveway Pressure Wash" />
          </RevealOnScroll>
          <RevealOnScroll from="left" delay={300}>
            <BeforeAfterSlider beforeSrc="/entryway-before-v4.jpeg" afterSrc="/entryway-clean.jpeg" label="Front Entryway" />
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
          <RevealOnScroll from="right" delay={0}>
            <BeforeAfterSlider beforeSrc="/sidewalk-before-v4.jpeg" afterSrc="/sidewalk-after-v4.jpeg" label="Sidewalk" />
          </RevealOnScroll>
          <RevealOnScroll from="left" delay={150}>
            <BeforeAfterSlider beforeSrc="/housewash-before.jpg" afterSrc="/housewash-after.jpg" label="House Exterior Soft Wash" />
          </RevealOnScroll>
          <RevealOnScroll from="right" delay={300}>
            <BeforeAfterSlider beforeSrc="/gutter-before.jpg" afterSrc="/gutter-after.jpg" label="Gutter Brightening" />
          </RevealOnScroll>
        </div>
        <p className="text-center text-gray-500 text-sm mt-10">
          📸 More photos &amp; videos on{" "}
          <a href="https://www.instagram.com/512pressurewashing/" target="_blank" rel="noopener noreferrer" className="text-[#2e7fd6] font-semibold hover:underline">Instagram</a>
          {" "}&amp;{" "}
          <a href="https://www.facebook.com/profile.php?id=61578914597478" target="_blank" rel="noopener noreferrer" className="text-[#2e7fd6] font-semibold hover:underline">Facebook</a>
        </p>
      </div>
    </section>
  );
}
