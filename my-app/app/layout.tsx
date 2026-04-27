import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

// Fonts
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// Metadata
export const metadata: Metadata = {
  title: "Muneem Timber Store - Hardoi, UP",
  description:
    "Timber Kiraya aur Construction Services - Hardoi ke sabse bharosemand timber store",
};

// Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional"
          rel="stylesheet"
        />
      </head>

      <body
        className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}