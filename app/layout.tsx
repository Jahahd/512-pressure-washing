import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "512 Pressure Washing | Georgetown TX",
  description:
    "Professional pressure washing, soft washing, house exterior cleaning, driveway, patio, gutter, and window cleaning in Georgetown TX, Liberty Hill, Cedar Park, Round Rock, and Austin TX. Free quotes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
