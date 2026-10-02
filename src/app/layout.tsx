import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdBoard \u2014 Put Your Business on Any Billboard in Seconds",
  description:
    "Scan a QR code on a digital billboard, design your ad on your phone, pay, and go live instantly on premium LED screens across the city.",
  keywords: [
    "digital billboard advertising",
    "self-serve billboard",
    "outdoor advertising",
    "QR code billboard",
    "billboard marketplace",
  ],
  openGraph: {
    title: "AdBoard \u2014 Put Your Business on Any Billboard in Seconds",
    description:
      "Scan, design on your phone, pay, and go live instantly on premium digital screens across the city.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
