export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#161616] mb-3">
            Simple, Transparent Pricing
          </h2>
          <div className="w-16 h-1 bg-[#2e7fd6] mx-auto mb-4 rounded" />
          <p className="text-[#3d3d3d] text-lg max-w-2xl mx-auto">
            No hidden fees. No surprises. Just honest pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Flat Rate */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-gray-200">
            <div className="text-5xl mb-4">🚗</div>
            <h3 className="text-2xl font-extrabold text-[#161616] mb-2">
              2-Car Driveway
            </h3>
            <div className="text-5xl font-extrabold text-[#2e7fd6] my-4">
              $200
            </div>
            <p className="text-[#3d3d3d] font-medium">Flat Rate</p>
            <ul className="mt-4 text-[#3d3d3d] text-sm space-y-1 text-left">
              <li>✅ Full driveway cleaning</li>
              <li>✅ Stain &amp; oil removal</li>
              <li>✅ Algae &amp; mildew treatment</li>
            </ul>
          </div>

          {/* Window Cleaning — featured card keeps blue */}
          <div className="bg-[#2e7fd6] rounded-2xl p-8 text-center shadow-xl border-4 border-[#4a9fe8] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4a9fe8] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
              Popular
            </div>
            <div className="text-5xl mb-4">🪟</div>
            <h3 className="text-2xl font-extrabold text-white mb-2">
              Window Cleaning
            </h3>
            <div className="text-5xl font-extrabold text-white my-4">
              $10
            </div>
            <p className="text-white/80 font-medium">Per Picture Window</p>
            <ul className="mt-4 text-white/90 text-sm space-y-1 text-left">
              <li>✅ Interior &amp; exterior</li>
              <li>✅ Streak-free finish</li>
              <li>✅ Screens cleaned too</li>
            </ul>
          </div>

          {/* Custom Quote */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-gray-200">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-2xl font-extrabold text-[#161616] mb-2">
              Everything Else
            </h3>
            <div className="text-4xl font-extrabold text-[#2e7fd6] my-4">
              FREE<br />
              <span className="text-2xl">Quote</span>
            </div>
            <p className="text-[#3d3d3d] font-medium">Custom Pricing</p>
            <ul className="mt-4 text-[#3d3d3d] text-sm space-y-1 text-left">
              <li>✅ House exterior</li>
              <li>✅ Roof soft wash</li>
              <li>✅ Patios, gutters &amp; more</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-block bg-[#2e7fd6] hover:bg-[#4a9fe8] text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transition-colors"
          >
            Get Your Free Quote Today
          </a>
        </div>
      </div>
    </section>
  );
}
