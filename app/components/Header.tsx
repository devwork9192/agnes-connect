"use client";

import Link from "next/link";
import GoogleSignIn from "./GoogleSignIn";

export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              AGNES
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <Link href="/#how-it-works" className="hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/#pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <GoogleSignIn />
        </div>
      </div>
    </header>
  );
}
