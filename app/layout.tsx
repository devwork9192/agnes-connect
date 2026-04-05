import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AGNES — Missed Call Recovery",
  description: "AI-powered missed call recovery for home service businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
