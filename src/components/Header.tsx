"use client";

import { Sun, Moon, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/useDebounce";
import Link from "next/link";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const animateLogo = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <header className="header-modern flex justify-between items-center pb-10 mb-12 relative gap-8 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-linear-to-r after:from-transparent after:via-white/10 after:to-transparent">
      <div
        className="logo font-bebas text-4xl tracking-[6px] bg-primary-gradient bg-clip-text text-transparent cursor-pointer transition-transform hover:scale-105 relative whitespace-nowrap"
        onClick={animateLogo}
        style={isAnimating ? { animation: "pulse 0.5s ease" } : {}}
      >
        DJ SURREAL
      </div>

      <div className="search-container flex-1 max-w-[500px] relative flex items-center bg-white/4 border border-white/10 rounded-full px-5 transition-all focus-within:border-primary focus-within:shadow-[0_0_20px_rgba(255,45,85,0.15)]">
        <label htmlFor="track-search" className="search-icon text-white/50 mr-3">
          <Search size={18} />
        </label>
        <input
          id="track-search"
          type="text"
          placeholder="Search tracks..."
          className="search-input w-full bg-transparent border-none py-3 text-white text-[0.95rem] focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="header-actions flex gap-3 items-center">
        <Link href="/admin" className="header-btn flex items-center gap-2" title="Admin Panel">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Admin</span>
        </Link>

        <Link
          href="/auth"
          className="header-btn primary flex items-center gap-2"
          title="Sign In / Register"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Sign In</span>
        </Link>

        <button className="header-btn flex items-center gap-2" id="themeBtn" onClick={toggleTheme}>
          {theme === "dark" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <Moon className="w-4 h-4" />
          )}
          <span>Theme</span>
        </button>
      </div>
    </header>
  );
}
