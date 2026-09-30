import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-serif" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const arabic = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-arabic" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const title = "Anas & Iram — Wedding Invitation";
const description =
  "You are cordially invited to the wedding of Anas Rasool & Iram Nasir. Mehndi 12 Nov · Barat 14 Nov · Walima 15 Nov 2026 · Hasilpur.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Anas & Iram Wedding",
  keywords: ["Anas Rasool", "Iram Nasir", "Anas weds Iram", "wedding invitation", "Mehndi", "Barat", "Walima", "Hasilpur", "Multan"],
  authors: [{ name: "Anas Rasool" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Anas & Iram — Wedding",
    title: "You're invited — Anas & Iram 💍",
    description,
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "You're invited — Anas & Iram 💍",
    description,
  },
  robots: { index: true, follow: true },
  appleWebApp: { title: "Anas & Iram", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#7e2a38",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${script.variable} ${arabic.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
