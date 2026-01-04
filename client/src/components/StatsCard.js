const colorMap = {
  blue: {
    border: "hover:border-blue-500",
    text: "text-blue-400",
  },
  green: {
    border: "hover:border-green-500",
    text: "text-green-400",
  },
  purple: {
    border: "hover:border-purple-500",
    text: "text-purple-400",
  },
};

export default function StatsCard({ title, value, icon, color }) {
  const styles = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`relative p-6 rounded-2xl border border-gray-800 
      bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl
      ${styles.border}
      transition-all duration-300 ease-out
      hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]
      overflow-hidden`}
    >
      {/* subtle glow layer */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-300
        bg-gradient-to-br from-white/5 via-transparent to-transparent"
      />

      <div className="relative z-10 flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-xs uppercase tracking-widest font-medium">
          {title}
        </h3>
        <span className="text-3xl opacity-80">{icon}</span>
      </div>

      <p className={`relative z-10 text-4xl font-extrabold ${styles.text}`}>
        {value}
      </p>
    </div>
  );
}
