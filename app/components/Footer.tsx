import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#161616] text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="512 Pressure Washing Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="text-white font-bold text-lg leading-tight">
                512 Pressure<br />Washing
              </span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Professional exterior cleaning services in Georgetown TX and
              surrounding Central Texas areas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["#services", "Services"],
                ["#pricing", "Pricing"],
                ["#areas", "Service Areas"],
                ["#gallery", "Gallery"],
                ["#contact", "Get a Free Quote"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-[#4a9fe8] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                📞{" "}
                <a
                  href="tel:5126433408"
                  className="hover:text-[#4a9fe8] transition-colors"
                >
                  (512) 643-3408
                </a>
              </li>
              <li>
                ✉️{" "}
                <a
                  href="mailto:512washing@gmail.com"
                  className="hover:text-[#4a9fe8] transition-colors"
                >
                  512washing@gmail.com
                </a>
              </li>
              <li>📍 Georgetown, TX 78626</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61578914597478"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a2a2a] hover:bg-[#2e7fd6] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/512pressurewashing/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a2a2a] hover:bg-[#2e7fd6] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@512pressurewashing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2a2a2a] hover:bg-[#2e7fd6] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-600">
          © {year} 512 Pressure Washing — All Rights Reserved. Georgetown, TX
        </div>
      </div>
    </footer>
  );
}
