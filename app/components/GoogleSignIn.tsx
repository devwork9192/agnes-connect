"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function GoogleSignIn() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    try {
      setLoading(true);
      await supabase.auth.signInWithOAuth({ provider: "google" });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Google sign-in failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSignIn}
      className="inline-flex items-center gap-2 rounded-md bg-white text-sm px-3 py-2 shadow-sm border border-gray-200 hover:bg-gray-50"
      disabled={loading}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-4 h-4"
      >
        <path fill="#EA4335" d="M24 9.5c3.9 0 7.1 1.4 9.6 3.4l7.1-7.1C36.6 2.6 30.7 0 24 0 14.9 0 6.9 4.9 2.6 12.1l8.3 6.5C12.9 14 18 9.5 24 9.5z"/>
        <path fill="#34A853" d="M46.5 24c0-1.6-.2-3.1-.6-4.6H24v9h12.7c-.6 3.5-2.5 6.5-5.3 8.5l8.2 6.4C43.8 38.9 46.5 31.9 46.5 24z"/>
      </svg>
      <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
    </button>
  );
}
