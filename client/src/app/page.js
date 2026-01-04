"use client"; 
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../lib/api';
import Navbar from '../components/Navbar';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!userId) return alert("Please enter a User ID");
    setLoading(true);
    try {
      const res = await api.post('/links/generate', {
        userId,
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
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-hidden">
      <Navbar />

      {/* Ambient background glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[180px] top-1/4 left-1/4" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[180px] bottom-1/4 right-1/4" />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative pt-32 pb-16 px-4 flex flex-col items-center">
        
        {/* Header (NOW STABLE) */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4
            bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">
            Deep Link Generator
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Generate secure, time-bound JWT magic links with QR-based access.
          </p>
        </div>

        {/* Card */}
        <div className="w-full max-w-md p-8 rounded-3xl
          bg-gradient-to-br from-gray-900/80 to-black/80
          backdrop-blur-xl border border-white/10
          shadow-[0_0_60px_-15px_rgba(59,130,246,0.35)]">

          <label className="block mb-2 text-xs uppercase tracking-widest text-gray-400">
            Target User ID
          </label>

          <input 
            type="text" 
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="e.g. user_123"
            className="w-full p-3 mb-6 rounded-lg bg-black/60
              border border-gray-700 text-white
              focus:border-blue-500 focus:ring-1 focus:ring-blue-500
              outline-none transition"
          />

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="relative w-full p-3 rounded-lg font-bold
              bg-gradient-to-r from-blue-500 to-purple-500
              hover:opacity-90 transition
              flex items-center justify-center"
          >
            {loading ? "Signing Token..." : "Generate Secure Link"}
          </button>

          {/* Result Section */}
          {generatedLink && (
            <div className="mt-10">

              <div className="p-4 mb-6 rounded-xl bg-black/60 border border-gray-700">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                  Deep Link URL
                </p>
                <div className="break-all text-blue-400 font-mono text-sm">
                  {generatedLink}
                </div>
              </div>

              <div className="flex flex-col items-center p-4 rounded-xl bg-white">
                <QRCodeCanvas value={generatedLink} size={150} />
                <p className="text-black text-xs mt-2 font-medium">
                  Scan to Verify on Mobile
                </p>
              </div>

              <a 
                href={generatedLink} 
                target="_blank"
                className="block mt-6 text-center py-2 rounded-lg text-sm
                  bg-gray-800 hover:bg-gray-700 transition"
              >
                Test Link in New Tab →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
