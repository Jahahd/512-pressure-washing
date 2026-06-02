"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SeasonalPromoBanner from "./SeasonalPromoBanner";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#areas", label: "Service Areas" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const touchStyle = {
    touchAction: "manipulation" as const,
    WebkitTapHighlightColor: "transparent",
    WebkitUserSelect: "none" as const,
    userSelect: "none" as const,
    WebkitTouchCallout: "none" as const,
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm select-none">
        {/* Promo strip rides along inside the sticky header so it stays pinned to the top while scrolling */}
        <SeasonalPromoBanner />
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt="512 Pressure Washing Logo"
              width={70}
              height={70}
              className="rounded-full"
            />
            <span className="text-[#161616] font-bold text-base sm:text-xl block leading-tight">
              512 Pressure<br />Washing
            </span>
          </Link>

          {/* Desktop nav — unchanged */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-[#3d3d3d] hover:text-[#2e7fd6] transition-colors font-medium">
                {l.label}
              </a>
            ))}
            <a href="tel:5126433408" className="text-[#3d3d3d] hover:text-[#2e7fd6] transition-colors font-medium">
              📞 (512) 643-3408
            </a>
            <a href="#contact" className="bg-[#2e7fd6] hover:bg-[#4a9fe8] text-white font-bold px-5 py-2 rounded-full transition-colors">
              Free Quote
            </a>
          </nav>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center rounded-xl text-[#161616] select-none active:bg-gray-100"
            style={{ width: 48, height: 48, ...touchStyle }}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay backdrop — mobile only */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out drawer — mobile only */}
      <aside
        className={`md:hidden fixed top-0 right-0 z-[70] h-full w-72 max-w-[82%] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        style={touchStyle}
      >
        {/* Drawer header with close button */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <span className="text-[#161616] font-extrabold text-lg">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center rounded-xl text-[#161616] active:bg-gray-100"
            style={{ width: 44, height: 44, ...touchStyle }}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-4 py-2 overflow-y-auto flex-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ minHeight: 52, display: "flex", alignItems: "center", ...touchStyle }}
              className="text-[#3d3d3d] font-medium border-b border-gray-100 text-base"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:5126433408"
            onClick={() => setOpen(false)}
            style={{ minHeight: 52, display: "flex", alignItems: "center", ...touchStyle }}
            className="text-[#3d3d3d] font-medium border-b border-gray-100 text-base"
          >
            📞 (512) 643-3408
          </a>
        </nav>

        {/* Quote button pinned at the bottom of the drawer */}
        <div className="px-4 py-4 border-t border-gray-200">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block bg-[#2e7fd6] text-white font-bold px-5 py-4 rounded-full text-center text-base"
          >
            Get Free Quote
          </a>
        </div>
      </aside>
    </>
  );
}
