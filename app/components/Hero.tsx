import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/driveway.png"
          alt="Pressure washed driveway"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0f1f3d]/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <Image
          src="/logo.png"
          alt="512 Pressure Washing"
          width={140}
          height={140}
          className="mx-auto mb-6 rounded-full shadow-2xl"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Georgetown&apos;s #1<br />
          <span className="text-[#4a9fe8]">Pressure Washing</span> Service
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Professional pressure washing &amp; soft washing for homes, driveways,
          patios, gutters, and more. Serving Georgetown, Liberty Hill, Cedar Park,
          Round Rock &amp; Austin.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-[#2e7fd6] hover:bg-[#4a9fe8] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-colors"
          >
            Get a FREE Quote
          </a>
          <a
            href="tel:5126433408"
            className="bg-white/10 hover:bg-white/20 border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-full transition-colors"
          >
            📞 (512) 643-3408
          </a>
        </div>

        <p className="mt-6 text-gray-300 text-sm font-medium">
          ✅ Free Quotes &nbsp;&nbsp; ✅ Licensed &amp; Insured &nbsp;&nbsp; ✅ Serving Central Texas
        </p>
      </div>
    </section>
  );
}
