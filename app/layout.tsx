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

const title = "Fahad & Zurtashey — Wedding Invitation";
const description =
  "You are cordially invited to the wedding of Fahad Rasool & Zurtashey Malik. Mehndi 12 Nov · Barat 13 Nov · Walima 15 Nov 2026 · Hasilpur.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Fahad & Zurtashey Wedding",
  keywords: ["Fahad Rasool", "Zurtashey Malik", "Fahad weds Zurtashey", "wedding invitation", "Mehndi", "Barat", "Walima", "Hasilpur"],
  authors: [{ name: "Fahad Rasool" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Fahad & Zurtashey — Wedding",
    title: "You're invited — Fahad & Zurtashey 💍",
    description,
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "You're invited — Fahad & Zurtashey 💍",
    description,
  },
  robots: { index: true, follow: true },
  appleWebApp: { title: "Fahad & Zurtashey", statusBarStyle: "default" },
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
