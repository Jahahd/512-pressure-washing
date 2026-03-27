"use client";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/xpwzknoa", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      alert("Something went wrong. Please call us at (512) 643-3408.");
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#161616] mb-3">
            Get Your FREE Quote
          </h2>
          <div className="w-16 h-1 bg-[#2e7fd6] mx-auto mb-4 rounded" />
          <p className="text-[#3d3d3d] text-lg">
            Fill out the form below and we&apos;ll get back to you fast — usually
            same day!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="md:col-span-2 flex flex-col gap-6 text-[#161616]">
            <div>
              <h3 className="text-xl font-bold mb-1 text-[#2e7fd6]">Phone / Text</h3>
              <a
                href="tel:5126433408"
                className="text-[#161616] hover:text-[#2e7fd6] text-lg font-semibold transition-colors"
              >
                (512) 643-3408
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1 text-[#2e7fd6]">Email</h3>
              <a
                href="mailto:512washing@gmail.com"
                className="text-[#3d3d3d] hover:text-[#2e7fd6] transition-colors"
              >
                512washing@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1 text-[#2e7fd6]">Location</h3>
              <p className="text-[#3d3d3d]">Georgetown, TX 78626</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-[#2e7fd6]">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61578914597478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#dcdcdc] hover:bg-[#2e7fd6] hover:text-white text-[#161616] px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/512pressurewashing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#dcdcdc] hover:bg-[#2e7fd6] hover:text-white text-[#161616] px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@512pressurewashing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#dcdcdc] hover:bg-[#2e7fd6] hover:text-white text-[#161616] px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 bg-[#f7f7f7] rounded-2xl p-8 shadow-md border border-gray-200">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-[#161616] mb-2">
                  Quote Request Sent!
                </h3>
                <p className="text-[#3d3d3d]">
                  Thanks! We&apos;ll reach out to you shortly. For urgent needs,
                  call or text{" "}
                  <a
                    href="tel:5126433408"
                    className="text-[#2e7fd6] font-semibold"
                  >
                    (512) 643-3408
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-1">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-1">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#161616] mb-1">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#161616] mb-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#161616] mb-1">
                    Service Address *
                  </label>
                  <input
                    name="address"
                    required
                    placeholder="123 Main St, Georgetown TX"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#161616] mb-1">
                    Service(s) Needed *
                  </label>
                  <select
                    name="service"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]"
                  >
                    <option value="">Select a service...</option>
                    <option>Exterior House Cleaning</option>
                    <option>Driveway Cleaning</option>
                    <option>Soft Washing / Roof</option>
                    <option>Window Cleaning</option>
                    <option>Patio / Deck Cleaning</option>
                    <option>Gutter Brightening</option>
                    <option>Sidewalks &amp; Curbs</option>
                    <option>Front Entryway</option>
                    <option>Trash Can Cleaning</option>
                    <option>Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#161616] mb-1">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Any additional info about your project..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2e7fd6] hover:bg-[#4a9fe8] text-white font-bold py-3 rounded-full text-lg transition-colors disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Request Free Quote →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
