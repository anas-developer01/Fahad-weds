export const couple = {
  groom: "Fahad Rasool",
  bride: "Zurtashey Malik",
  short: "Fahad & Zurtashey",
  groomFirst: "Fahad",
  brideFirst: "Zurtashey",
  monogram: ["F", "Z"] as const,
  groomProfession: "Civil Engineer",
};

export const families = {
  groom: { father: "Mr. Ghulam Rasool", mother: "Mrs. Shazia Erum", relation: "Son of" },
  bride: { father: "Mr. Ghulam Nabi", mother: "Mrs. Sumaira Rasheed", relation: "Daughter of" },
  lookingForward: [
    "Malik Aslam",
    "Malik Shahid Iqbal",
    "Malik Ajmal Shahzad",
    "Malik Shahbaz",
    "Malik Ali Raza",
    "Malik Mudassir",
  ],
  brother: "Malik Anas Rasool",
  cousins: [
    "Malik Uzair",
    "Malik Hassan",
    "Malik Shahzaib",
    "Malik Bilal Shahid",
    "Malik Ali",
    "Malik Abdul Rehman",
    "Malik Abdul Hadi",
    "Malik Musa",
    "Malik Azhan",
    "Malik Noraiz",
  ],
};

/** Contacts for guest queries — numbers in local Pakistani format */
export const contacts = [
  { name: "Mr. Ghulam Rasool", role: "Father of the Groom", phone: "03059654192" },
];

/** 03059654192 -> 923059654192 (for tel: and WhatsApp links) */
export const intlPhone = (local: string) => `92${local.replace(/\D/g, "").replace(/^0/, "")}`;
/** 03059654192 -> 0305 9654192 */
export const prettyPhone = (local: string) => local.replace(/^(\d{4})(\d+)$/, "$1 $2");

export type WeddingEvent = {
  key: "mehndi" | "barat" | "walima";
  title: string;
  day: string;
  time: string;
  venue: string;
  map: string;
  accent: string;
  /** UTC timestamps for Google Calendar (Pakistan = UTC+5) */
  start: string;
  end: string;
};

export const events: WeddingEvent[] = [
  {
    key: "mehndi",
    title: "Mehndi",
    day: "Thursday, 12 November 2026",
    time: "7:00 PM onwards",
    venue: "Al Madina Grand Marquee, Hasilpur",
    map: "https://share.google/h7aaqnPoEZzM0liaJ",
    accent: "#b07a12",
    start: "20261112T140000Z",
    end: "20261112T180000Z",
  },
  {
    key: "barat",
    title: "Barat",
    day: "Friday, 13 November 2026",
    time: "5:00 PM",
    venue: "Hasilpur",
    map: "https://www.google.com/maps/search/?api=1&query=Hasilpur",
    accent: "#1f3a5f",
    start: "20261113T120000Z",
    end: "20261113T170000Z",
  },
  {
    key: "walima",
    title: "Walima",
    day: "Sunday, 15 November 2026",
    time: "12:00 PM",
    venue: "Al Madina Grand Marquee, Hasilpur",
    map: "https://share.google/h7aaqnPoEZzM0liaJ",
    accent: "#2f6f73",
    start: "20261115T070000Z",
    end: "20261115T110000Z",
  },
];

/** Barat — 13 Nov 2026, 5:00 PM Pakistan time */
export const countdownTarget = "2026-11-13T17:00:00+05:00";

export function calendarUrl(e: WeddingEvent) {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.title} — ${couple.short}`,
    dates: `${e.start}/${e.end}`,
    location: e.venue,
    details: `${e.title} of ${couple.groom} & ${couple.bride}`,
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}
