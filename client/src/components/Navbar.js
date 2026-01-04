import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10
      bg-gradient-to-b from-black/70 to-black/40 backdrop-blur-xl">
      
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between text-white">
        
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-wide
          bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500
          hover:opacity-90 transition"
        >
          DeepLinkSystem
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm text-gray-400">
          <Link
            href="/"
            className="relative group hover:text-white transition"
          >
            Generator
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-400 to-purple-500
              group-hover:w-full transition-all duration-300" />
          </Link>

          <Link
            href="https://github.com/adityasinghr651/DeepLinkSystem"
            target="_blank"
            className="relative group hover:text-white transition"
          >
            GitHub
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-400 to-purple-500
              group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

      </div>
    </nav>
  );
}
