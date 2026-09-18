import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.livingspace.in"),
  title: {
    default: "LIVING SPACE | Property Discovery & Advisory",
    template: "%s | LIVING SPACE",
  },
  description:
    "LIVING SPACE helps buyers and investors discover quality residential and commercial properties across Delhi NCR through a trusted, modern advisory experience.",
  keywords: [
    "LIVING SPACE",
    "property in Delhi NCR",
    "real estate advisory",
    "homes",
    "apartments",
    "villa",
    "commercial property",
  ],
  openGraph: {
    title: "LIVING SPACE",
    description:
      "Discover residential and commercial properties with a modern, trusted property advisory experience.",
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f8f5f0] text-[#1a2b2f]">{children}</body>
    </html>
  );
}
