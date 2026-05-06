import type { Metadata } from "next";
import "./globals.css";
import ScrollAnimations from "./components/ScrollAnimations";

export const metadata: Metadata = {
  title: "AGNES — Never Miss a Customer Call Again",
  description: "AGNES is an AI-powered missed call recovery service for local home service businesses. Catch every lead, book more appointments.",
  icons: {
    icon: "/agnes-logo.png",
    shortcut: "/agnes-logo.png",
    apple: "/agnes-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-gray-400">
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
