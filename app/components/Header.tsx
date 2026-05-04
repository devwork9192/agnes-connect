"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-30 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/agnes-logo-1.png"
            alt="Agnes"
            width={120}
            height={30}
            className="h-8 w-auto shrink-0" style={{mixBlendMode:'lighten'}}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <a href="mailto:info@agnesai.ca" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto text-gray-400 hover:text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <nav className="md:hidden border-t border-white/5 bg-[#0a0a0a] px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-400">
          <Link href="/#how-it-works" onClick={() => setOpen(false)} className="hover:text-white transition-colors">
            How It Works
          </Link>
          <Link href="/#pricing" onClick={() => setOpen(false)} className="hover:text-white transition-colors">
            Pricing
          </Link>
          <a href="mailto:info@agnesai.ca" onClick={() => setOpen(false)} className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
