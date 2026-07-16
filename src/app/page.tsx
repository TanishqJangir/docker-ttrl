"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthenticated(true);
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col justify-between bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Navbar Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-800/30 z-10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <span className="font-bold text-white text-base">Ω</span>
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
            ControlCenter
          </span>
        </div>

        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {authenticated ? (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700 text-white rounded-xl transition-all duration-200 active:scale-95 shadow-md shadow-black/40"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-200 active:scale-95 shadow-md shadow-purple-600/10"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 z-10 max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-400">
            ✨ Secure JWT & Mongoose authentication schema active
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-zinc-50">
            Secure Authentication,{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent block mt-2 sm:inline">
              Built Instantly
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed pt-2">
            A premium full-stack starter kit incorporating MongoDB database schemas, robust JWT session cookies, password salting, and glassmorphic UI design.
          </p>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md">
          {loading ? (
            <div className="h-12 w-full flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-xl">
              <svg className="animate-spin h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : authenticated ? (
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_4px_20px_rgba(147,51,234,0.3)] text-center text-sm"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_4px_20px_rgba(147,51,234,0.3)] text-center text-sm"
              >
                Create Account
              </Link>
              <Link
                href="/signin"
                className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-medium rounded-xl transition-all duration-200 transform active:scale-95 text-center text-sm shadow-md"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-900/60 z-10 text-xs text-zinc-500">
        <p>© 2026 ControlCenter App. MongoDB Placeholder Setup.</p>
        <p className="mt-2 sm:mt-0">Next.js App Router Architecture</p>
      </footer>
    </div>
  );
}
