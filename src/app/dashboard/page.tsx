"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signoutLoading, setSignoutLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.status === 401) {
          router.push("/signin");
          return;
        }
        
        const data = await res.json();
        if (data.authenticated) {
          setUser(data.user);
        } else {
          router.push("/signin");
        }
      } catch (err) {
        console.error("Failed to load user info:", err);
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSignout = async () => {
    setSignoutLoading(true);
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/signin");
      }
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
      setSignoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <svg className="animate-spin h-10 w-10 text-purple-500 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-sm text-zinc-400 font-medium">Authorizing secure session...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
              <span className="font-bold text-white text-base">Ω</span>
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
              ControlCenter
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs font-semibold bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">
              Environment: Sandbox
            </span>
            <button
              onClick={handleSignout}
              disabled={signoutLoading}
              className="px-4 py-2 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {signoutLoading ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-2xl bg-zinc-900/30 border border-zinc-800/80 p-8 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
          
          <div className="space-y-2 z-10">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Welcome, <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">{user.name}</span>!
            </h1>
            <p className="text-sm text-zinc-400 max-w-md">
              Your account details and statistics are updated and active for today.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-950/60 border border-zinc-800/60 p-4 rounded-xl z-10 w-fit">
            <div className="h-10 w-10 rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-700/50">
              <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Log Identity</p>
              <p className="text-sm font-semibold text-zinc-200">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-[30px]" />
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-zinc-400">Account Status</h3>
            <p className="text-2xl font-bold mt-1 text-zinc-100">Verified</p>
            <p className="text-xs text-zinc-500 mt-2">Active since {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-[30px]" />
            <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4">
              <svg className="h-5 w-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-zinc-400">Session Security</h3>
            <p className="text-2xl font-bold mt-1 text-zinc-100">JWT Cookie</p>
            <p className="text-xs text-zinc-500 mt-2">httpOnly & Secure flags applied</p>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-[30px]" />
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
              <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-zinc-400">Connected Database</h3>
            <p className="text-2xl font-bold mt-1 text-zinc-100">MongoDB</p>
            <p className="text-xs text-zinc-500 mt-2">Mongoose schema structure cached</p>
          </div>

        </section>

        {/* Detailed Info Card */}
        <section className="bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-zinc-200 mb-4">System Identity Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Property</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400 font-medium">User Database ID</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-200 font-mono text-xs">{user.id}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400 font-medium">Name Attribute</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-200">{user.name}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400 font-medium">Registered Address</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-200">{user.email}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-400 font-medium">Created On</td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-200">{new Date(user.createdAt).toString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
