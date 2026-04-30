"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-30 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="4" width="28" height="20" rx="4" fill="#F59E0B" />
            <polygon points="8,24 8,29 14,24" fill="#F59E0B" />
            <path d="M10 12h6M10 16h10" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
            <circle cx="24" cy="10" r="5" fill="#0a0a0a" stroke="#F59E0B" strokeWidth="1.5" />
            <path d="M22 10l1.5 1.5L26 8.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-white">
            AGNES
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <a href="mailto:hello@agnesconnect.com" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        <a
          href="mailto:hello@agnesconnect.com?subject=AGNES%20Early%20Access"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-accent-400 transition-colors"
        >
          Request Early Access
        </a>
      </div>
    </header>
  );
}
