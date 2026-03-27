"use client";
import Image from "next/image";
import { useState } from "react";

// Tap/click only. No hover. No scroll. No auto-flip.
function FlipBeforeAfter({
  beforeSrc, afterSrc, label,
}: {
  beforeSrc: string; afterSrc: string; label: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      className="h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg relative cursor-pointer select-none active:scale-[0.985]"
      style={{
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
        cursor: "pointer",
      }}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* BEFORE */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: flipped ? 0 : 1 }}
      >
        <img
          src={beforeSrc}
          alt={`Before – ${label}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="bg-red-600 text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wide">Before</span>
        </div>
        <div className="absolute bottom-3 right-3 z-10 text-white/90 text-xs font-semibold bg-black/50 px-2 py-1 rounded pointer-events-none">
          Tap to reveal →
        </div>
      </div>

      {/* AFTER */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: flipped ? 1 : 0 }}
      >
        <img
          src={afterSrc}
          alt={`After – ${label}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span className="bg-green-500 text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wide">After</span>
        </div>
        <div className="absolute bottom-3 left-3 z-10 text-white/90 text-xs font-semibold bg-black/50 px-2 py-1 rounded pointer-events-none">
          Tap to go back ←
        </div>
      </div>

      {/* LABEL */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap pointer-events-none">
        {label}
      </div>
    </div>
  );
}

function OverlapBeforeAfter({
  beforeSrc, afterSrc, label,
}: {
  beforeSrc: string; afterSrc: string; label: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg h-64 sm:h-72 relative">
      <Image src={afterSrc} alt={`After – ${label}`} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: "51%" }}>
        <div className="relative w-full h-full" style={{ height: "200%" }}>
          <Image src={beforeSrc} alt={`Before – ${label}`} fill
            style={{ objectFit: "cover", objectPosition: "center top" }} sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      </div>
      <div className="absolute inset-x-0 z-10 h-[3px] bg-white shadow-[0_0_14px_4px_rgba(255,255,255,0.85)]" style={{ top: "calc(50% - 1.5px)" }} />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{label}</div>
      <div className="absolute z-20" style={{ top: "calc(50% - 42px)", left: "12px" }}>
        <span className="bg-red-600 text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wide">Before</span>
      </div>
      <div className="absolute z-20" style={{ top: "calc(50% + 10px)", right: "12px" }}>
        <span className="bg-green-500 text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wide">After</span>
      </div>
    </div>
  );
}

function VideoHero() {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl aspect-square">
      <video className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "blur(20px) brightness(0.5)", transform: "scale(1.15)" }}
        autoPlay muted loop playsInline poster="/house-after.jpeg">
        <source src="/pressure-washing-web.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-y-0 left-0 z-10 w-12 sm:w-16 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-10 w-12 sm:w-16 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
      <video className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 80%" }}
        autoPlay muted loop playsInline poster="/house-after.jpeg">
        <source src="/pressure-washing-web.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white font-extrabold text-sm sm:text-base drop-shadow">512 Pressure Washing — In Action</p>
        <p className="text-gray-300 text-xs">Georgetown, TX</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f3d] mb-3">Before &amp; After</h2>
          <div className="w-16 h-1 bg-[#2e7fd6] mx-auto mb-4 rounded" />
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">Real results from real Georgetown-area jobs.</p>
        </div>
        <div className="flex justify-center mb-8"><VideoHero /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
          <OverlapBeforeAfter beforeSrc="/deck-before.jpeg" afterSrc="/deck-after.jpeg" label="Deck &amp; Patio Cleaning" />
          <FlipBeforeAfter beforeSrc="/driveway-new-before.jpeg" afterSrc="/driveway-new-after.jpeg" label="Driveway Pressure Wash" />
          <FlipBeforeAfter beforeSrc="/entryway-after.jpeg" afterSrc="/entryway-clean.jpeg" label="Front Entryway" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
          <FlipBeforeAfter beforeSrc="/driveway-action.jpeg" afterSrc="/sidewalk-clean.jpeg" label="Sidewalk &amp; Curb Cleaning" />
          <FlipBeforeAfter beforeSrc="/housewash-before.jpg" afterSrc="/housewash-after.jpg" label="House Exterior Soft Wash" />
          <FlipBeforeAfter beforeSrc="/gutter-after.jpg" afterSrc="/gutter-before.jpg" label="Gutter Brightening" />
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
