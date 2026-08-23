import type { Metadata } from "next";
import "./globals.css";
import MobileCTABar from "./components/MobileCTABar";

export const metadata: Metadata = {
  title: "512 Pressure Washing | San Marcos TX",
  description:
    "Professional pressure washing, soft washing, house exterior cleaning, driveway, patio, gutter, and window cleaning in San Marcos TX, Wimberley, New Braunfels, Buda, Lockhart, Dripping Springs, Georgetown, and the surrounding Central Texas Hill Country. Free quotes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        {children}
        <MobileCTABar />
      </body>
    </html>
  );
}
