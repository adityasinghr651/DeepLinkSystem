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
      // Call our Backend
      const res = await api.post('/api/links/generate', {
        userId: userId,
        redirectUrl: '/dashboard/secret-report' // Where we want them to go
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Deep Link Generator
      </h1>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <label className="block mb-2 text-gray-300">Simulate User ID</label>
        <input 
          type="text" 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="e.g., user_123"
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 mb-4"
        />

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded font-bold transition-all"
        >
          {loading ? "Generating..." : "Create Magic Link 🔗"}
        </button>

        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-900 rounded border border-green-500/30">
            <p className="text-sm text-gray-400 mb-2">Share this link:</p>
            <div className="break-all text-green-400 font-mono text-sm bg-black p-2 rounded">
              {generatedLink}
            </div>
            <a 
              href={generatedLink} 
              target="_blank"
              className="block mt-4 text-center text-blue-400 hover:underline text-sm"
            >
              Test Link (Open in new tab) &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
}