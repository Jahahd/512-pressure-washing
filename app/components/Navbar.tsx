"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Pricing" },
    { href: "#areas", label: "Service Areas" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm select-none">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
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

        <button
          type="button"
          className="md:hidden flex items-center justify-center rounded-xl text-[#161616] select-none active:bg-gray-100"
          style={{
            width: 48,
            height: 48,
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
          }}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="md:hidden bg-white border-t border-gray-200 px-4 pb-5 shadow-lg select-none"
          style={{
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ minHeight: 52, display: "flex", alignItems: "center" }}
              className="text-[#3d3d3d] font-medium border-b border-gray-100 text-base select-none"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:5126433408"
            onClick={() => setOpen(false)}
            style={{ minHeight: 52, display: "flex", alignItems: "center" }}
            className="text-[#3d3d3d] font-medium border-b border-gray-100 text-base select-none"
          >
            📞 (512) 643-3408
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block mt-4 bg-[#2e7fd6] text-white font-bold px-5 py-4 rounded-full text-center text-base select-none"
          >
            Get Free Quote
          </a>
        </div>
      )}
    </header>
  );
}
