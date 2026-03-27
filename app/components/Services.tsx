const services = [
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

export default function Services() {
  return (
    <section id="services" className="py-20 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#161616] mb-3">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-[#2e7fd6] mx-auto mb-4 rounded" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We offer a full range of exterior cleaning services to keep your
            property looking its best year-round.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-xl font-bold text-[#161616] mb-2">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
