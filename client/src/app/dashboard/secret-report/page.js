"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import StatsCard from "../../../components/StatsCard";
import api from "../../../lib/api";

export default function SecretDashboard() {
  const [stats, setStats] = useState({
    trustScore: "0%",
    avgLatency: "0ms",
    activeSessions: 0,
  });

  // 🔹 Fetch real stats from backend
  useEffect(() => {
    api
      .get("/links/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("STATS ERROR 👉", err));
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[520px] h-[520px] bg-green-500/20 rounded-full blur-[200px] top-32 left-1/4" />
        <div className="absolute w-[420px] h-[420px] bg-blue-500/20 rounded-full blur-[200px] bottom-24 right-1/4" />
      </div>
      
      <main className="relative pt-28 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5
            border border-green-500/30 bg-green-500/10 rounded-full
            text-green-400 text-xs tracking-widest uppercase">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Access Granted via Secure Token
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-4
            bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">
            Confidential Analytics
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            This data is encrypted and only accessible via a signed JWT deep link.
            If you are seeing this, your signature verification was successful.
          </p>
        </div>

        {/* Dashboard Grid (REAL DATA) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="User Trust Score"
            value={stats.trustScore}
            icon="🛡️"
            color="blue"
          />
          <StatsCard
            title="Deep Link Latency"
            value={stats.avgLatency}
            icon="⚡"
            color="green"
          />
          <StatsCard
            title="Active Sessions"
            value={stats.activeSessions}
            icon="🟢"
            color="purple"
          />
        </div>

        {/* Decrypted Data Section */}
        <div className="mt-10 p-8 rounded-3xl
          bg-gradient-to-br from-gray-900/70 to-black/70
          border border-white/10 backdrop-blur-xl
          shadow-[0_0_60px_-20px_rgba(34,197,94,0.35)]">

          <h3 className="text-xl font-bold mb-4
            bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
            Decrypted Payload Data
          </h3>

          <div className="font-mono text-sm text-gray-300
            bg-black/70 p-5 rounded-xl
            border border-gray-800 leading-relaxed">
{`{
  "status": "authenticated",
  "role": "admin_viewer",
  "encryption": "AES-256",
  "source": "deep_link_v1"
}`}
          </div>
        </div>
      </main>
    </div>
  );
}
