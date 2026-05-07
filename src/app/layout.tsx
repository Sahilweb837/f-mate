import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CupDate | Find Your Perfect Coffee Date & New Connections",
  description:
    "CupDate is the world's first dating platform dedicated to coffee lovers. Find verified singles near you, match randomly with boys or girls, and start meaningful conversations over your favorite brew. Free to join and 100% secure.",
  keywords: "coffee dating app, find coffee partner, random match dating, verified singles near me, indian dating app, local coffee dates, meet new people, CupDate app",
  authors: [{ name: "CupDate Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "CupDate | Start Your Love Story Over Coffee",
    description: "The premium dating platform for coffee enthusiasts. Join the CupDate community today.",
    url: "https://CupDate.app",
    siteName: "CupDate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CupDate | Coffee & Connections",
    description: "Find your next coffee date instantly with our random matcher.",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
