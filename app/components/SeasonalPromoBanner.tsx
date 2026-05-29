"use client";
import { useState } from "react";

/**
 * Seasonal promo banner — drives quote bookings with an urgency hook.
 * Update `offer` each season/holiday (see the recurring reminder).
 */
const offer = {
  emoji: "☀️",
  label: "SUMMER SPECIAL",
  deal: "15% OFF any service",
  urgency: "Book your FREE quote this month",
};

export default function SeasonalPromoBanner() {
  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white">
      <a
        href="#contact"
        className="block text-center font-extrabold px-10 py-2.5 text-sm sm:text-base leading-snug"
      >
        <span className="mr-1">{offer.emoji}</span>
        {offer.label} — {offer.deal}!{" "}
        <span className="font-bold underline underline-offset-2">
          {offer.urgency} →
        </span>
      </a>
      <button
        type="button"
        onClick={() => setShow(false)}
        aria-label="Dismiss offer"
        className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center text-white/90 hover:text-white"
        style={{ width: 36, height: 36 }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
