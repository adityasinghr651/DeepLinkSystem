import "./globals.css"; // Imports the Tailwind styles
import { Inter } from "next/font/google"; // Google Fonts

// Load the font
const inter = Inter({ subsets: ["latin"] });

// SEO Metadata (Important for Deep Links)
export const metadata = {
  title: "Deep Link Project",
  description: "Secure Deep Linking System for FAANG Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 'children' represents the page you are currently viewing */}
        {children} 
      </body>
    </html>
  );
}