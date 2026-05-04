"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
      </div>
    </header>
  );
}
