import type { Metadata } from "next";
import { Inter, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

// Font imports
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Muneem Timber Store - Hardoi, UP",
  description: "Timber Kiraya aur Construction Services - Hardoi ke sabse bharosemand timber store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} ${dmMono.variable} min-h-full flex flex-col font-body`}
      >
        {children}
      </body>
    </html>
  );
}
