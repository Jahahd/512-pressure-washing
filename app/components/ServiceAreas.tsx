const areas = [
  {
    name: "Georgetown, TX",
    sub: "Our Home Base",
    featured: true,
    shade: "from-[#2e7fd6] to-[#1a5fa8]",
  },
  {
    name: "Liberty Hill, TX",
    sub: "NW of Georgetown",
    featured: false,
    shade: "from-[#3a8fd6] to-[#2272b8]",
  },
  {
    name: "Cedar Park, TX",
    sub: "South of Georgetown",
    featured: false,
    shade: "from-[#4a9fe8] to-[#2e7fd6]",
  },
  {
    name: "Round Rock, TX",
    sub: "SE of Georgetown",
    featured: false,
    shade: "from-[#5aafe8] to-[#3a8fd6]",
  },
  {
    name: "Austin, TX",
    sub: "Greater Austin Area",
    featured: false,
    shade: "from-[#3d8fcc] to-[#2a70aa]",
  },
  {
    name: "Pflugerville, TX",
    sub: "East of Austin",
    featured: false,
    shade: "from-[#4a9fe0] to-[#2e7fd0]",
  },
  {
    name: "Surrounding Areas",
    sub: "Ask us — we travel!",
    featured: false,
    shade: "from-[#6ab0ee] to-[#4a9fe8]",
  },
];

export default function ServiceAreas() {
  return (
    <section id="areas" className="py-20 bg-[#dcdcdc]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#161616] mb-3">
            Areas We Serve
          </h2>
          <div className="w-16 h-1 bg-[#2e7fd6] mx-auto mb-4 rounded" />
          <p className="text-[#3d3d3d] text-lg max-w-2xl mx-auto">
            Proudly serving the greater Central Texas area. Not sure if we cover
            your location? Call or text us — we&apos;ll let you know!
          </p>
        </div>

        {/* Shaded area zones */}
        <div className="relative max-w-4xl mx-auto">

          {/* Outer glow backdrop */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1a3a6e]/30 to-[#2e7fd6]/10 blur-2xl -z-10" />

          {/* Featured Georgetown tile */}
          <div className="mb-4">
            <div className="bg-gradient-to-br from-[#1a3a6e] to-[#2e7fd6] rounded-2xl p-6 flex items-center gap-5 shadow-xl border border-[#4a9fe8]/30">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                🏠
              </div>
              <div>
                <p className="text-white font-extrabold text-xl leading-tight">Georgetown, TX</p>
                <p className="text-blue-200 text-sm font-medium">Our Home Base · Primary Service Area</p>
              </div>
              <div className="ml-auto hidden sm:block">
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                  ⭐ Home Base
                </span>
              </div>
            </div>
          </div>

          {/* Surrounding area shaded tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {areas.slice(1).map((a) => (
              <div
                key={a.name}
                className={`bg-gradient-to-br ${a.shade} rounded-xl p-4 flex items-center gap-3 shadow-lg border border-white/20 hover:scale-[1.02] hover:shadow-xl transition-all duration-200`}
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{a.name}</p>
                  <p className="text-blue-100/80 text-xs">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Coverage note */}
          <p className="text-center text-[#3d3d3d] text-sm mt-5 italic">
            Not seeing your city? We likely still cover it — just ask!
          </p>
        </div>

        {/* CTA banner */}
        <div className="mt-12 bg-[#161616] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-2">
              Ready to get started?
            </h3>
            <p className="text-gray-400">
              Call, text, or fill out our form for a FREE quote. Fast response
              guaranteed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href="tel:5126433408"
              className="bg-white text-[#161616] font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors text-center"
            >
              📞 (512) 643-3408
            </a>
            <a
              href="#contact"
              className="bg-[#2e7fd6] hover:bg-[#4a9fe8] text-white font-bold px-6 py-3 rounded-full transition-colors text-center"
            >
              Free Quote
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
