"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Service = {
  icon: string;
  title: string;
  desc: string;
  featured?: boolean;
  tag?: string;
};

const services: Service[] = [
  {
    icon: "🏠",
    title: "Exterior House Cleaning",
    desc: "Full soft wash treatment that safely removes dirt, mold, algae, and grime from your home's exterior without damaging surfaces.",
  },
  {
    icon: "🚗",
    title: "Driveway Cleaning",
    desc: "High-pressure cleaning that blasts away oil stains, tire marks, and built-up grime from concrete and asphalt driveways.",
  },
  {
    icon: "🌊",
    title: "Soft Washing",
    desc: "Low-pressure chemical treatment that safely cleans roofs, siding, and delicate surfaces while killing mold and algae at the root.",
  },
  {
    icon: "🪟",
    title: "Window Cleaning",
    desc: "Crystal-clear window cleaning that lets in the light. Just $10 per picture window — streak-free guaranteed.",
    featured: true,
    tag: "Customer favorite",
  },
  {
    icon: "🌿",
    title: "Patio & Deck Cleaning",
    desc: "Restore your outdoor living space. We remove mildew, stains, and discoloration from wood, concrete, and stone patios.",
  },
  {
    icon: "🏡",
    title: "Gutters",
    desc: "Exterior gutter brightening removes black streaks and oxidation, making your gutters look brand new again.",
  },
  {
    icon: "🚶",
    title: "Sidewalks & Curbs",
    desc: "Keep your walkways safe and clean. We remove slippery algae, stains, and buildup from all concrete surfaces.",
  },
  {
    icon: "🚪",
    title: "Front Entryways",
    desc: "Make a great first impression. We clean porches, stoops, and entry areas so your home's entrance always looks sharp.",
  },
  {
    icon: "🗑️",
    title: "Trash Can Cleaning",
    desc: "Eliminate foul odors and bacteria with a thorough high-pressure cleaning of your trash and recycling bins.",
  },
];

// Fade + rise into view, staggered by column, when scrolled to.
function Reveal({ index, children }: { index: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delay = (index % 3) * 110;
  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        transform: shown ? "translateY(0)" : "translateY(34px)",
        opacity: shown ? 1 : 0,
        transition: `transform 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 800ms ease ${delay}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24 bg-[#0f1f3d] overflow-hidden">
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#2e7fd6]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-[#2e7fd6]/10 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-14">
          <span className="inline-block text-[#5fb0ff] font-bold tracking-[0.2em] text-xs sm:text-sm mb-3 uppercase">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-[#2e7fd6] mx-auto mb-5 rounded" />
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            From rooftops to driveways — a full range of exterior cleaning to keep your property spotless year-round.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} index={i}>
              <div
                className={`group relative h-full rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1.5 ${
                  s.featured
                    ? "bg-gradient-to-br from-[#2e7fd6] to-[#1c5fa8] border-transparent shadow-xl shadow-[#2e7fd6]/30"
                    : "bg-white/[0.04] border-white/10 hover:border-[#2e7fd6]/60 hover:bg-white/[0.07]"
                }`}
              >
                {s.tag && (
                  <span className="absolute top-4 right-4 bg-[#ffd23f] text-[#0f1f3d] text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wide shadow">
                    ★ {s.tag}
                  </span>
                )}
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-xl text-3xl mb-4 ${
                    s.featured
                      ? "bg-white/20"
                      : "bg-gradient-to-br from-[#2e7fd6] to-[#1c5fa8] shadow-lg shadow-[#2e7fd6]/30"
                  }`}
                >
                  <span>{s.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className={`leading-relaxed text-sm ${s.featured ? "text-white/90" : "text-gray-400"}`}>
                  {s.desc}
                </p>
                <div
                  className={`mt-4 h-0.5 rounded-full transition-all duration-300 ${
                    s.featured ? "bg-white/50 w-12" : "bg-[#2e7fd6] w-8 group-hover:w-16"
                  }`}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 sm:mt-14 text-center">
          <p className="text-gray-300 mb-4 text-base sm:text-lg">
            Don&apos;t see exactly what you need? We probably do it.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#2e7fd6] hover:bg-[#4a9fe8] text-white font-extrabold px-7 py-3.5 rounded-full text-base sm:text-lg shadow-lg shadow-[#2e7fd6]/30 transition-colors"
          >
            Get a Free Quote →
          </a>
        </div>
      </div>
    </section>
  );
}
