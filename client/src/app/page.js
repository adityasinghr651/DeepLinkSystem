"use client"; // Mandatory for React Hooks
import { useState } from 'react';
import api from '../lib/api';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if(!userId) return alert("Please enter a User ID");
    
    setLoading(true);
    try {
      const res = await api.post('/api/links/generate', {
        userId: userId,
        redirectUrl: '/dashboard/secret-report'
      });

      setGeneratedLink(res.data.deepLink);
    } catch (error) {
      console.error(error);
      alert("Failed to generate link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white p-4 overflow-hidden">

      {/* Soft Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400/25 rounded-full blur-[180px] top-1/3 left-1/3 animate-pulse" />

      <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400">
        Deep Link Generator
      </h1>

      <div className="relative z-10 bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_0_80px_-20px_rgba(56,189,248,0.5)] w-full max-w-md border border-white/20">

        <label className="block mb-2 text-sm uppercase tracking-wider text-neutral-300">
          Simulate User ID
        </label>

        <input 
          type="text" 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="e.g., user_123"
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20
            placeholder-neutral-400 text-white focus:outline-none focus:ring-2
            focus:ring-cyan-400/60 mb-6"
        />

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full p-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500
            hover:brightness-110 transition-all duration-200
            shadow-[0_0_25px_rgba(56,189,248,0.6)]
            disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Generating Secure Link…" : "Create Secure Magic Link"}
        </button>

        {generatedLink && (
          <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-emerald-400/30 shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)]">
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Generated Secure Link
            </p>
            <div className="break-all font-mono text-sm text-emerald-300 bg-black/60 p-3 rounded-lg">
              {generatedLink}
            </div>
            <a 
              href={generatedLink} 
              target="_blank"
              className="block mt-4 text-center text-cyan-400 hover:underline text-sm"
            >
              Test Secure Link →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
