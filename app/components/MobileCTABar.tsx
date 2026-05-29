import Image from "next/image";

export default function MobileCTABar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-3 pt-3"
      style={{
        boxShadow: "0 -2px 12px rgba(0,0,0,0.10)",
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
    >
      <a
        href="#contact"
        className="relative w-full flex items-center justify-center bg-[#2e7fd6] hover:bg-[#4a9fe8] active:bg-[#2569b8] text-white font-extrabold rounded-full text-lg"
        style={{ minHeight: 56 }}
      >
        <span className="absolute left-2.5 inset-y-0 flex items-center">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="rounded-full bg-white ring-2 ring-white shrink-0"
          />
        </span>
        Get a Free Quote
      </a>
    </div>
  );
}
