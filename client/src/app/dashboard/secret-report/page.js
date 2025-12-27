"use client";

export default function SecretDashboard() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-neutral-950 text-white overflow-hidden selection:bg-cyan-400 selection:text-black">

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Ambient Glows */}
      <div className="absolute w-[420px] h-[420px] bg-indigo-500/30 rounded-full blur-[160px] top-1/4 left-1/4 animate-pulse" />
      <div
        className="absolute w-[420px] h-[420px] bg-cyan-500/30 rounded-full blur-[160px] bottom-1/4 right-1/4 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Main Card */}
      <div className="relative z-10 max-w-2xl w-full mx-4 p-14 rounded-[2.5rem] border border-white/15 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_-20px_rgba(34,211,238,0.45)]">

        {/* Security Badge */}
        <div className="inline-flex mb-8 px-5 py-1.5 rounded-full text-[11px] tracking-[0.3em] font-mono uppercase
          border border-cyan-400/40 text-cyan-300 bg-cyan-400/10
          shadow-[0_0_20px_rgba(34,211,238,0.35)]">
          Secure Area
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400 bg-[length:220%_auto] animate-shimmer">
            Authorized
          </span>
        </h1>

        {/* Professional Message */}
        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
          You have successfully accessed a protected route.
          <br />
          This confirms that the <span className="text-white font-medium">deep-link authentication</span> and
          routing logic are functioning as intended.
        </p>

        {/* Divider Glow */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      </div>

      {/* Shimmer Animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }
        .animate-shimmer {
          animation: shimmer 3.2s linear infinite;
        }
      `}</style>
    </div>
  );
}
