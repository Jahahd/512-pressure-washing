import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Booking from "../components/Booking";

export const metadata: Metadata = {
  title: "Book a Free Quote | 512 Pressure Washing — Georgetown TX",
  description:
    "Book your free pressure washing quote in 60 seconds. Pick a date that fits your schedule and add it to your Apple or Google calendar. Serving Georgetown & Central Texas.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <Booking />
      <Footer />
    </>
  );
}
