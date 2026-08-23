"use client";
import { useState } from "react";

const services = [
  "Exterior House Cleaning",
  "Driveway Cleaning",
  "Soft Washing / Roof",
  "Window Cleaning",
  "Patio / Deck Cleaning",
  "Gutter Brightening",
  "Sidewalks & Curbs",
  "Front Entryway",
  "Trash Can Cleaning",
  "512 Club Membership",
  "Multiple Services",
];

const windows = ["Morning", "Afternoon", "Anytime"] as const;
type Win = (typeof windows)[number];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function ymd(y: number, m: number, d: number) {
  return `${y}${pad(m + 1)}${pad(d)}`;
}
function prettyDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
function icsEscape(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

// Builds the calendar event for the chosen date (all-day, with a 1-day-before reminder).
function calendarLinks(date: Date, win: Win) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const next = new Date(y, m, d + 1);
  const startStr = ymd(y, m, d);
  const endStr = ymd(next.getFullYear(), next.getMonth(), next.getDate());

  const title = "512 Pressure Washing — Free Quote";
  const details =
    `Your requested visit with 512 Pressure Washing. Preferred time: ${win}. ` +
    `We'll confirm with you shortly. Questions? Call or text (512) 643-3408.`;
  const location = "Your property — 512 Pressure Washing (San Marcos, TX area)";

  const now = new Date();
  const stamp =
    `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}` +
    `T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//512 Pressure Washing//Booking//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@512pressurewashing.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${startStr}`,
    `DTEND;VALUE=DATE:${endStr}`,
    `SUMMARY:${icsEscape(title)}`,
    `DESCRIPTION:${icsEscape(details)}`,
    `LOCATION:${icsEscape(location)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:512 Pressure Washing visit tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const apple = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  const google =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${startStr}/${endStr}` +
    `&details=${encodeURIComponent(details)}` +
    `&location=${encodeURIComponent(location)}`;

  return { apple, google };
}

function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = startOfDay(new Date());
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const atCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          aria-label="Previous month"
          disabled={atCurrentMonth}
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="w-10 h-10 flex items-center justify-center rounded-full text-[#0f1f3d] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent text-xl"
        >
          ‹
        </button>
        <span className="font-extrabold text-[#0f1f3d] text-lg">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="w-10 h-10 flex items-center justify-center rounded-full text-[#0f1f3d] hover:bg-gray-100 text-xl"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="text-center text-xs font-bold text-gray-400 py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />;
          const date = new Date(year, month, day);
          const isPast = date < today;
          const isToday = date.getTime() === today.getTime();
          const isSelected =
            !!selected &&
            selected.getFullYear() === year &&
            selected.getMonth() === month &&
            selected.getDate() === day;
          return (
            <button
              key={i}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(date)}
              className={`aspect-square rounded-lg text-sm font-semibold flex items-center justify-center transition-colors ${
                isSelected
                  ? "bg-[#2e7fd6] text-white shadow"
                  : isPast
                  ? "text-gray-300 cursor-not-allowed"
                  : isToday
                  ? "text-[#2e7fd6] ring-1 ring-[#2e7fd6] hover:bg-blue-50"
                  : "text-[#0f1f3d] hover:bg-blue-50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AddToCalendar({ date, win }: { date: Date; win: Win }) {
  const { apple, google } = calendarLinks(date, win);
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
      <p className="text-sm font-bold text-[#0f1f3d] mb-3">📅 Save this date to your calendar</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={apple}
          download="512-pressure-washing.ics"
          className="flex-1 text-center bg-[#0f1f3d] hover:bg-[#1c3a66] text-white font-bold py-2.5 px-4 rounded-full text-sm transition-colors"
        >
           Apple Calendar
        </a>
        <a
          href={google}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-white border border-gray-300 hover:border-[#2e7fd6] text-[#0f1f3d] font-bold py-2.5 px-4 rounded-full text-sm transition-colors"
        >
          📆 Google Calendar
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Apple Calendar works on iPhone, iPad &amp; Mac · Google Calendar works on Android &amp; the web.
      </p>
    </div>
  );
}

export default function Booking() {
  const [selected, setSelected] = useState<Date | null>(null);
  const [win, setWin] = useState<Win>("Anytime");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selected) {
      alert("Please pick a preferred date on the calendar first.");
      return;
    }
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
    } else {
      alert("Something went wrong. Please call or text us at (512) 643-3408.");
    }
  }

  return (
    <main>
      {/* HERO */}
      <section className="relative bg-[#0f1f3d] overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2e7fd6]/25 blur-3xl" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-[#9fd0ff] font-bold tracking-[0.15em] text-xs px-4 py-1.5 rounded-full uppercase mb-4">
            Free Quote · No Obligation
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Book your free quote in <span className="text-[#5fb0ff]">60 seconds</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">
            Pick the day that works for you, drop your info, and we&apos;ll confirm fast — usually same day. Open 7 days, 9 AM–8 PM.
          </p>
        </div>
      </section>

      {/* BOOKING */}
      <section className="py-12 sm:py-16 bg-[#f7f7f7]">
        <div className="max-w-2xl mx-auto px-4">
          {submitted ? (
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-[#0f1f3d] mb-2">Request sent!</h2>
              <p className="text-[#3d3d3d] mb-6">
                Thanks! We got your preferred date{selected ? ` (${prettyDate(selected)})` : ""} and we&apos;ll text or call to confirm shortly.
              </p>
              {selected && (
                <div className="max-w-sm mx-auto">
                  <AddToCalendar date={selected} win={win} />
                </div>
              )}
              <p className="text-sm text-gray-500 mt-6">
                Need us sooner? Call or text{" "}
                <a href="tel:5126433408" className="text-[#2e7fd6] font-semibold">(512) 643-3408</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1 — DATE */}
              <div>
                <h2 className="text-xl font-extrabold text-[#0f1f3d] mb-1">
                  <span className="text-[#2e7fd6]">1.</span> Pick your preferred date
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  Choose a day that fits your schedule — we&apos;ll confirm it with you.
                </p>
                <Calendar selected={selected} onSelect={setSelected} />
              </div>

              {/* STEP 2 — TIME + ADD TO CALENDAR (after a date is picked) */}
              {selected && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0f1f3d] mb-1">
                      <span className="text-[#2e7fd6]">2.</span> Preferred time
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">
                      Selected: <span className="font-bold text-[#0f1f3d]">{prettyDate(selected)}</span>
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {windows.map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setWin(w)}
                          className={`py-3 rounded-full font-bold text-sm border transition-colors ${
                            win === w
                              ? "bg-[#2e7fd6] text-white border-[#2e7fd6]"
                              : "bg-white text-[#0f1f3d] border-gray-300 hover:border-[#2e7fd6]"
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                  <AddToCalendar date={selected} win={win} />
                </div>
              )}

              {/* STEP 3 — DETAILS */}
              <div>
                <h2 className="text-xl font-extrabold text-[#0f1f3d] mb-3">
                  <span className="text-[#2e7fd6]">3.</span> Your details
                </h2>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 space-y-4">
                  <input type="hidden" name="_subject" value="New Booking / Quote Request (from poster)" />
                  <input type="hidden" name="source" value="Booking page (/book)" />
                  <input type="hidden" name="preferredDate" value={selected ? prettyDate(selected) : ""} />
                  <input type="hidden" name="preferredTime" value={win} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#161616] mb-1">First Name *</label>
                      <input name="firstName" required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#161616] mb-1">Last Name *</label>
                      <input name="lastName" required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-1">Phone Number *</label>
                    <input name="phone" type="tel" required className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-1">Email Address</label>
                    <input name="email" type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-1">Service Address *</label>
                    <input name="address" required placeholder="123 Main St, San Marcos TX" className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-1">Service Needed *</label>
                    <select name="service" required defaultValue="" className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616]">
                      <option value="" disabled>Select a service...</option>
                      {services.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-1">Additional Details</label>
                    <textarea name="message" rows={3} placeholder="Anything else we should know?" className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-[#2e7fd6] text-[#161616] resize-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2e7fd6] hover:bg-[#4a9fe8] text-white font-extrabold py-3.5 rounded-full text-lg transition-colors disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Request my free quote →"}
                  </button>
                  <p className="text-center text-xs text-gray-500">
                    This requests your preferred date — we&apos;ll text or call to confirm. Not a locked appointment yet.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
